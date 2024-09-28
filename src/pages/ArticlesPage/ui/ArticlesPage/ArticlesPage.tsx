import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { 
  DynamicModuleLoader, 
  ReducersList 
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articelPageReducer } from '../../model/slices/articlePageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgetes/Page/Page';
import { fetchNexrArticlePage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { ArticlesPageFilter } from '../ArticlesPageFiters/ArticlesPageFiters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { 
  fetchInitArticlesPage
} from '@/pages/ArticlesPage/model/services/fetchInitArticlesPage/fetchInitArticlesPage';
import { useSearchParams } from 'react-router-dom';
import * as cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articelPageReducer
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNexrArticlePage())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchInitArticlesPage(searchParams))
  }, [dispatch, searchParams])
  
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAnMount={false}>
      <Page onScrollEnd={onLoadNextPart} className={classNames('', {}, [className])}>
        <ArticlesPageFilter />
        <ArticleInfiniteList className={cls.list}/>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage);