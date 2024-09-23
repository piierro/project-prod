import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleList.module.scss'
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { AutoSizer, List, ListRowProps, WindowScroller } from 'react-virtualized';
import { PAGE_ID } from 'widgetes/Page/Page';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => 
  new Array(view === ArticleView.SMALL ? 8 : 4)
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
    target
  } = props;

  const isBig = view === ArticleView.BIG;
  const itemsPerRow = isBig ? 1 : 5;
  const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);

  const rowRenderer = ({ index, isScrolling, key, style }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    for(let i = fromIndex; i < toIndex; i++) {
       items.push(
        <ArticleItem 
          article={articles[i]} 
          view={view}
          className={cls.card}
          target={target}
          key={`str${i}`}
        />
       )
    }
    return (
      <div 
        key={key} 
        style={style}
        className={cls.row}
        >
       {items}
      </div>
    );
  }

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        <Text title={'Статьи не найдены'} size={TextSize.L}/>
      </div>
    );
  }

  return (
    <WindowScroller
      scrollElement={document.getElementById(PAGE_ID) as Element}
    >
      {({ width, height, registerChild, onChildScroll, isScrolling, scrollTop }) => (
        <div 
          // ref={registerChild}
          className={classNames('', {}, [className, cls[view]])}
        >
          <List
            height={height ?? 700} // Убедитесь, что по умолчанию указан height
            rowCount={rowCount}
            rowRenderer={rowRenderer}
            rowHeight={isBig ? 700 : 330}
            width={width ? width - 80 : 700} // Измените ширину на ваше усмотрение
            autoHeight
            onScroll={onChildScroll}
            isScrolling={isScrolling}
            scrollTop={scrollTop}
          />
          {isLoading && getSkeletons(view)}
        </div>
      )}
    </WindowScroller>
  );
});
