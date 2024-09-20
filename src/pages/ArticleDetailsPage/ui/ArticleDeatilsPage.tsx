import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleDetailsPage.module.scss';
import { memo, useCallback, useEffect } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comments';
import { 
  DynamicModuleLoader, ReducersList 
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { 
  articleDetailsCommentsReducer, 
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
import { Button } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgetes/Page/Page';

interface ArticleDeatilsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer
}

const ArticleDeatilsPage = ({ className }: ArticleDeatilsPageProps) => {
  const { id } = useParams<{id: string}>();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsloading = useSelector(getArticlesCommentsIsLoading);
  // const commentsError = useSelector(getArticlesCommentsError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  },[dispatch, id])

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

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
        <Button 
          onClick={onBackToList}
          className={cls.btn}
        >
          Назад к списку
        </Button>
        <ArticleDetails id={id} />
        <Text title={'Комментарии'} className={cls.TexrComment} />
        <AddCommentForm onSendComment={onSendComment}/>
        <CommentList isLoading={commentsIsloading} comments={comments}/>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDeatilsPage);