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
  getArticlesPagesView 
} from '../model/selectors/articlesPageSelectors';

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

  useEffect(() => {
    dispatch(fetchArticlesList())
    dispatch(articelPageActions.initState())
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAnMount>
      <div className={classNames('', {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList 
          articles={articles} 
          isLoading={isLoading}
          view={view}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage);