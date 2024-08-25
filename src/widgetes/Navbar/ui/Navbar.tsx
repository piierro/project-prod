import { classNames } from 'shared/lib/classNames/classNames';

import * as cls from './Navbar.module.scss';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';

interface NavbarProps {
  className?: string 
}

export const Navbar = ({className}: NavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authDta = useSelector(getUserAuthData);
  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if(authDta) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Button 
          theme={ThemeButton.CLEAR_INVERTED} 
          className={cls.links}
          onClick={onLogout}
        >
          Выйти
        </Button>
      </div>
    )
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button 
        theme={ThemeButton.CLEAR_INVERTED} 
        className={cls.links}
        onClick={onShowModal}
      >
        Войти
      </Button>
      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal}/>}
    </div>
  )
}