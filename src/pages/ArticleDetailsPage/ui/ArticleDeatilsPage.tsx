import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleDetailsPage.module.scss';
import { memo } from 'react';

interface ArticleDeatilsPageProps {
  className?: string
}
const ArticleDeatilsPage = ({ className }: ArticleDeatilsPageProps) => {
  return (
    <div className={classNames(cls.ArticleDeatilsPage, {}, [className])}>
      ARTICLE DETAILS PAGE
    </div>
  )
}

export default memo(ArticleDeatilsPage);