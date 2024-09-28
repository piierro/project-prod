import { classNames } from '@/shared/lib/classNames/classNames';

import * as cls from './NotFound.module.scss';
import { Page } from '@/widgetes/Page/Page';

interface NotFoundProps {
    className?: string 
}

export const NotFound = ({className}: NotFoundProps) => {
  return (
    <Page className={classNames(cls.NotFound, {}, [className])}>
      Страница не найдена
    </Page>
  )
}