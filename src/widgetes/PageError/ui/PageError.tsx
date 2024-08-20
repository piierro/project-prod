import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './PageError.module.scss';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

interface PageErrorProps {
    className?: string 
}

export const PageError = ({className}: PageErrorProps) => {

  const reloadPage = () => {
    location.reload()
  }
 
  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <p>Произошла непредвиденная ошибка :(</p>
      <Button 
        onClick={reloadPage}
        theme={ThemeButton.ERROR}
      >
        Обновить страницу
      </Button>
    </div>
  )
}