import { classNames } from 'shared/lib/classNames/classNames';

import * as cls from './NotFound.module.scss';

interface NotFoundProps {
    className?: string 
}

export const NotFound = ({className}: NotFoundProps) => {
  return (
    <div className={classNames(cls.NotFound, {}, [className])}>
      Страница не найдена
    </div>
  )
}