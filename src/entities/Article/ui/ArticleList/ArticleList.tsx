import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleList.module.scss'
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { FixedSizeList as List } from 'react-window';
import { PAGE_ID } from 'widgetes/Page/Page';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
}

const getSkeletons = (view: ArticleView) => 
  new Array(view === ArticleView.SMALL ? 9 : 3)
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
    virtualized = true,
  } = props;

  const isBig = view === ArticleView.BIG;
  const itemsPerRow = isBig ? 1 : 4;
  const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);
  const itemHeight = isBig ? 700 : 330;

  const rowRenderer = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    for (let i = fromIndex; i < toIndex; i++) {
      items.push(
        <ArticleItem 
          article={articles[i]} 
          view={view}
          className={cls.card}
          target={target}
          key={`str${i}`}
        />
      );
    }

    return (
      <div style={style} className={cls.row}>
        {items}
      </div>
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        <Text title={'Статьи не найдены'} size={TextSize.L}/>
      </div>
    );
  }

  const listHeight = 700;

  return (
    <div className={classNames('', {}, [className, cls[view]])}>
      {virtualized ? (
        <List
          height={listHeight}
          itemCount={rowCount}
          itemSize={itemHeight}
          width="100%"
        >
          {rowRenderer}
        </List>
      ) : (
        articles.map((item) => (
          <ArticleItem
            article={item}
            view={view}
            target={target}
            key={item.id}
            className={cls.card}
          />
        ))
      )}
      {isLoading && getSkeletons(view)}
    </div>
  );
});