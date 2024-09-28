import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comments';
import { useSelector } from 'react-redux';
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentSlice';
import { getArticlesCommentsIsLoading } from '../../model/selectors/comments';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { 
  fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { WStack } from '@/shared/ui/Stack';

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = memo(({ className, id }: ArticleDetailsCommentsProps) => {
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsloading = useSelector(getArticlesCommentsIsLoading);
  const dispatch = useAppDispatch();
    
  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  },[dispatch, id])

  return (
    <WStack max gap="16" className={classNames('', {}, [className])}>
      <Text 
        size={TextSize.L} 
        title={'Комментарии'}  
      />
      <AddCommentForm 
        onSendComment={onSendComment}
      />
      <CommentList 
        isLoading={commentsIsloading} 
        comments={comments}
      />
    </WStack>
  )
})