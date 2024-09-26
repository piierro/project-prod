import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Navbar.module.scss';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from 'entities/User';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface NavbarProps {
  className?: string 
}

export const Navbar = memo(({className}: NavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authDta = useSelector(getUserAuthData);
  const dispatch = useDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  const isAdminPanel = isAdmin || isManager;

  if(authDta) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Dropdown
          trigger={<Avatar size={50} src={authDta.avatar} />}
          direction={'bottom left'}
          className={cls.dropdown}
          items={[
            {
              content: 'Профиль',
              href: RoutePath.profile + authDta.id
            },
            ...(isAdminPanel ? [{
              content: 'Админка',
              href: RoutePath.admin_panel
            }]: []),
            {
              content: 'Выйти',
              onClick: onLogout
            }
          ]} 
        />
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