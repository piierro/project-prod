import { classNames } from 'shared/lib/classNames/classNames';
// import * as cls from './ArticlesPage.module.scss';
import { memo, useCallback, useEffect } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { 
  DynamicModuleLoader, 
  ReducersList 
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articelPageActions, articelPageReducer, getArticles } from '../model/slices/articlePageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';
import { useSelector } from 'react-redux';
import { 
  getArticlesPageIsLoading, 
  getArticlesPagesError, 
  getArticlesPagesHasMore, 
  getArticlesPagesNum, 
  getArticlesPagesView 
} from '../model/selectors/articlesPageSelectors';
import { Page } from 'shared/ui/Page/Page';
import { fetchNexrArticlePage } from '../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { Text } from 'shared/ui/Text/Text';

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
  const page = useSelector(getArticlesPagesNum);
  const hasMore = useSelector(getArticlesPagesHasMore)

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articelPageActions.setView(view))
  }, [dispatch])

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNexrArticlePage())
  }, [dispatch])

  useEffect(() => {
    dispatch(articelPageActions.initState())
    dispatch(fetchArticlesList({
      page: 1
    }))
  }, [dispatch])

  if (error) {
    <Text title={'Страница не найдена'}/>
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAnMount>
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