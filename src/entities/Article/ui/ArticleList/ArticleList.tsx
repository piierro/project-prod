import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleList.module.scss'
import { memo } from 'react';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleItemSkeleton className={cls.card} key={index} view={view} />
  ));

export const ArticleList = memo((props: ArticleListProps) => {
  const { 
    className, 
    articles, 
    isLoading, 
    view = ArticleView.SMALL 
  } = props;

  const renderArticle = (article: Article) => {
    return (
      <ArticleItem 
        article={article} 
        view={view}
        className={cls.card}
        key={article.id}
      />
    )
  }


  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        <Text title={'Статьи не найдены'} size={TextSize.L}/>
      </div>
    )
  }


  return (
    <div className={classNames('', {}, [className, cls[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null
      }
      {isLoading && getSkeletons(view)}
    </div>
  )
})