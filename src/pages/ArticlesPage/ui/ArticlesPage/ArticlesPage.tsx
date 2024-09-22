import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticlesPage.module.scss'
import { memo, useCallback, useEffect } from 'react';
import { ArticleList } from 'entities/Article';
import { 
  DynamicModuleLoader, 
  ReducersList 
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articelPageReducer, getArticles } from '../../model/slices/articlePageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { 
  getArticlesPageIsLoading, 
  getArticlesPagesError, 
  getArticlesPagesView 
} from '../../model/selectors/articlesPageSelectors';
import { Page } from 'widgetes/Page/Page';
import { fetchNexrArticlePage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { Text } from 'shared/ui/Text/Text';
import { fetchInitArticlesPage } from '../../model/services/fetchInitArticlesPage/fetchInitArticlesPage';
import { ArticlesPageFilter } from '../ArticlesPageFiters/ArticlesPageFiters';
import { useSearchParams } from 'react-router-dom';

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articelPageReducer
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPagesError);
  const view = useSelector(getArticlesPagesView);
  const [searchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNexrArticlePage())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchInitArticlesPage(searchParams))
  }, [dispatch, searchParams])

  if (error) {
    <Text title={'Страница не найдена'}/>
  }
  
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAnMount={false}>
      <Page onScrollEnd={onLoadNextPart} className={classNames('', {}, [className])}>
        <ArticlesPageFilter />
        <ArticleList 
          articles={articles} 
          isLoading={isLoading}
          view={view}
          className={cls.list}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage);