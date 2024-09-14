import { classNames } from 'shared/lib/classNames/classNames';
// import * as cls from './ArticleDetailsPage.module.scss';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';

interface ArticleDeatilsPageProps {
  className?: string
}
const ArticleDeatilsPage = ({ className }: ArticleDeatilsPageProps) => {
  const { id } = useParams<{id: string}>();

  if(!id) {
    return (
      <div className={classNames('', {}, [className])}>
        Статья не найдена
      </div>
    )
  }
  return (
    <div className={classNames('', {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  )
}

export default memo(ArticleDeatilsPage);