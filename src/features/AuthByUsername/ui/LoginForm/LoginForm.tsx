import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './LoginForm.module.scss';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions, loginReducer } from '../../model/slice/LoginSlice';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginByUsername } from '../../model/services/loginByUserName/loginByUserName';
import { getLoginUserName } from '../../model/selectors/getLoginUserName/getLoginUserName';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { 
  DynamicModuleLoader, ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

export interface LoginFormProps {
  className?: string;
  onSuccsess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
}

const LoginComponent = memo(({className, onSuccsess}: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUserName);
  const password = useSelector(getLoginPassword);
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);

  const onChangeUserName =  useCallback((value: string) => {
    dispatch(loginActions.setUserName(value))
  }, [dispatch])

  const onChangePassword =  useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback( async() => {
    const result = await dispatch(loginByUsername({ username, password }));
    if(result.meta.requestStatus === 'fulfilled') {
      onSuccsess();
    }
  }, [ onSuccsess,dispatch, username, password ])
 
  return (
    <DynamicModuleLoader reducers={initialReducers}>
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
    </DynamicModuleLoader>
  )
})

LoginComponent.displayName = 'LoginComponent';

const LoginForm = memo(LoginComponent);

export default LoginForm;