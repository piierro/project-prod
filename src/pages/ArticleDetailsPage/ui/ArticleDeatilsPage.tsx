import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleDetailsPage.module.scss';
import { memo, useCallback, useEffect } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comments';
import { 
  DynamicModuleLoader, ReducersList 
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { 
  getArticleComments 
} from '../model/slices/ArticleDetailsCommentSlice';
import { 
  getArticlesCommentsIsLoading 
} from '../model/selectors/comments';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { 
  fetchCommentsByArticleId 
} from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { AddCommentForm } from 'features/addCommentForm';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import { Page } from 'widgetes/Page/Page';
import { getArticleReccomendation } from '../model/slices/ArticleDetailsRecomendation';
import { getArticlesReccomendationIsLoading } from '../model/selectors/recommendation';
import { 
  fetchArticleRecommendation
} from '../model/services/fetchArticleRecommendation/fetchArticleRecommendation';
import { articleDetailsPageReducer } from '../model/slices';
import { ArticleDetailsPgeHeader } from './ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDeatilsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDeatilsPage = ({ className }: ArticleDeatilsPageProps) => {
  const { id } = useParams<{id: string}>();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsloading = useSelector(getArticlesCommentsIsLoading);
  // const commentsError = useSelector(getArticlesCommentsError);
  const reccomendation = useSelector(getArticleReccomendation.selectAll);
  const reccomendationIsloading = useSelector(getArticlesReccomendationIsLoading);
  // const reccomendationsError = useSelector(getArticlesReccomendationsError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
    dispatch(fetchArticleRecommendation())
  },[dispatch, id])

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  if(!id) {
    return (
      <Page className={classNames('', {}, [className])}>
        Статья не найдена
      </Page>
    )
  }
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAnMount>
      <Page className={classNames('', {}, [className])}>
        <ArticleDetailsPgeHeader />
        <ArticleDetails id={id} />
        <Text size={TextSize.L} title={'Рекомендации'} className={cls.TexrComment} />
        <ArticleList 
          articles={reccomendation} 
          isLoading={reccomendationIsloading} 
          className={cls.reccomendation}
          target="_blank"
        />
        <Text size={TextSize.L} title={'Комментарии'} className={cls.TexrComment} />
        <AddCommentForm onSendComment={onSendComment}/>
        <CommentList isLoading={commentsIsloading} comments={comments}/>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDeatilsPage);