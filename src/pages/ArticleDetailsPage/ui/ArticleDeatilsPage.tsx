import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleDetailsPage.module.scss';
import { memo, useEffect } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
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
import { getArticlesCommentsError, 
  getArticlesCommentsIsLoading 
} from '../model/selectors/comments';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { 
  fetchCommentsByArticleId 
} from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

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
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  },[dispatch, id])

  if(!id) {
    return (
      <div className={classNames('', {}, [className])}>
        Статья не найдена
      </div>
    )
  }
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAnMount>
      <div className={classNames('', {}, [className])}>
        <ArticleDetails id={id} />
        <Text title={'Комментарии'} className={cls.TexrComment} />
        <CommentList isLoading={commentsIsloading} comments={comments}/>
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDeatilsPage);