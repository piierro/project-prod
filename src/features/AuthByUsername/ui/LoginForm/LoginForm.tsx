import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './LoginForm.module.scss';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

interface LoginFormProps {
    className?: string 
}

export const LoginForm = ({className}: LoginFormProps) => {
 
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}
    >
      <h3 className={cls.entrance}>Login to your acc</h3>
      <Input type="text" placeholder="Username" />
      <Input type="text" />
      <Button className={cls.loginBtn} >
        Войти
      </Button>
    </div>
  )
}