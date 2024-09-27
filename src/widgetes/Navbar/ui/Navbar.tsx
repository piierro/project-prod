import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Navbar.module.scss';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { HStack } from 'shared/ui/Stack';
import { NotificationButton } from 'features/notificationButton';
import { AvatarDropdown } from 'features/avatarDropdown';

interface NavbarProps {
  className?: string 
}

export const Navbar = memo(({className}: NavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authDta = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  if(authDta) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <HStack className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    )
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button 
        theme={ThemeButton.CLEAR_INVERTED} 
        className={cls.links}
        onClick={onShowModal}
      >
        Войти
      </Button>
      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal}/>}
    </header>
  )
})