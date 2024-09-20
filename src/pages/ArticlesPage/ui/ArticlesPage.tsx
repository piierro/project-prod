import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { 
  DynamicModuleLoader, 
  ReducersList 
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articelPageActions, articelPageReducer, getArticles } from '../model/slices/articlePageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { 
  getArticlesPageIsLoading, 
  getArticlesPagesError, 
  getArticlesPagesView 
} from '../model/selectors/articlesPageSelectors';
import { Page } from 'shared/ui/Page/Page';
import { fetchNexrArticlePage } from '../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { Text } from 'shared/ui/Text/Text';
import { fetchInitArticlesPage } from '../model/services/fetchInitArticlesPage/fetchInitArticlesPage';

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

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articelPageActions.setView(view))
  }, [dispatch])

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNexrArticlePage())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchInitArticlesPage())
  }, [dispatch])

  if (error) {
    <Text title={'Страница не найдена'}/>
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAnMount={false}>
      <Page onScrollEnd={onLoadNextPart} className={classNames('', {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList 
          articles={articles} 
          isLoading={isLoading}
          view={view}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage);