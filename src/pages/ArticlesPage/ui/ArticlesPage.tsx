import { classNames } from 'shared/lib/classNames/classNames';
// import * as cls from './ArticlesPage.module.scss';
import { memo } from 'react';

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  return (
    <div className={classNames('', {}, [className])}>
      ARTICLES PAGE
    </div>
  )
}

export default memo(ArticlesPage);