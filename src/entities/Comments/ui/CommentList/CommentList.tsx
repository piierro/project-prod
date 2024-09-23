import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { CommentCard } from '../CommentCard/CommentCard';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comments'
import { WStack } from 'shared/ui/Stack';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo(({ className, isLoading, comments }: CommentListProps) => {
  if (isLoading) {
    return (
      <WStack gap='8' max className={classNames('', {}, [className])}>
        <CommentCard isLoading/>
        <CommentCard isLoading/>
        <CommentCard isLoading/>
      </WStack>
    )
  }
  return (
    <WStack gap="16" max align='center' className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments.map(comment => (
          <CommentCard 
            key={comment.id}
            comment={comment} 
            isLoading={isLoading} 
          />
        ))
      ) : (
        <Text text={'Комментарии отсутствуют'} />
      )}
    </WStack>
  );
});