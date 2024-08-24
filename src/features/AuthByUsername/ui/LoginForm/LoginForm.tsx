import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './LoginForm.module.scss';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions } from '../../model/slice/LoginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUserName/loginByUserName';
import { AppDispatch } from 'app/providers/StoreProvider/config/store';

interface LoginFormProps {
    className?: string 
}

export const LoginComponent = memo(({className}: LoginFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { username, password, error, isLoading } = useSelector(getLoginState)
  
  const onChangeUserName =  useCallback((value: string) => {
    dispatch(loginActions.setUserName(value))
  }, [dispatch])

  const onChangePassword =  useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }))
  }, [dispatch, username, password ])
 
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <h2 className={cls.entrance}>Форма авторизации</h2>
      {error && <Text text={error} theme={TextTheme.ERROR} />}
      <Input 
        type="text" 
        placeholder="Введите username"
        onChange={onChangeUserName}
        value={username}
      />
      <Input 
        type="text" 
        placeholder="Введите пароль"
        onChange={onChangePassword}
        value={password}
      />
      <Button 
        className={cls.loginBtn} 
        onClick={onLoginClick}
        disabled={isLoading}
      >
        Войти
      </Button>
    </div>
  )
})

LoginComponent.displayName = 'LoginComponent';

export const LoginForm = memo(LoginComponent);