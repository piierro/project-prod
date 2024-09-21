import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticlesPageFilter.module.scss'
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  getArticlesPagesOrder, 
  getArticlesPagesSearch, 
  getArticlesPagesSort, 
  getArticlesPagesView 
} from '../../model/selectors/articlesPageSelectors';
import { ArticleSortField, ArticleSortSelect, ArticleView, ArticleViewSelector } from 'entities/Article';
import { articelPageActions } from '../../model/slices/articlePageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { SortOrder } from 'shared/types';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';

interface ArticlesPageFilterProps {
  className?: string;
}

export const ArticlesPageFilter = memo(({ className }: ArticlesPageFilterProps) => {
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesPagesView);
  const search = useSelector(getArticlesPagesSearch);
  const order = useSelector(getArticlesPagesOrder);
  const sort = useSelector(getArticlesPagesSort);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({replace: true}))
  }, [dispatch])

  const debounceFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articelPageActions.setView(view));
  }, [dispatch])

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articelPageActions.setSort(newSort));
    dispatch(articelPageActions.setPage(1));
    fetchData()
  }, [dispatch, fetchData])

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articelPageActions.setOrder(newOrder));
    dispatch(articelPageActions.setPage(1));
    fetchData()
  }, [dispatch, fetchData])

  const onChangeSearch = useCallback((newSearch: string) => {
    dispatch(articelPageActions.setSearch(newSearch));
    dispatch(articelPageActions.setPage(1))
    debounceFetchData()
  }, [dispatch, debounceFetchData])

  return (
    <div className={classNames(cls.ArticlesPageFilter, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelect 
          sort={sort}
          order={order}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input 
          placeholder={'Поиск'}
          onChange={onChangeSearch}
          value={search}
        />
      </Card>
    </div>
  )
})