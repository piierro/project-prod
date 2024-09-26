import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleList.module.scss'
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Article } from '../../model/types/article';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleView } from 'entities/Article';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 8 : 4)
  .fill(0)
  .map((_, index) => (
    <ArticleItemSkeleton className={cls.card} key={index} view={view} />
  ));

export const ArticleList = memo((props: ArticleListProps) => {
  const { 
    className, 
    articles, 
    isLoading, 
    view = ArticleView.SMALL,
    target,
  } = props;

  const renderArticle = (article: Article) => {
    return (
      <ArticleItem 
        article={article} 
        view={view}
        className={cls.card}
        key={article.id}
        target={target}
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