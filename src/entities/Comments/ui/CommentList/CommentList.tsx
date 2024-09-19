import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './CommentList.module.scss'
import { memo } from 'react';
import { CommentCard } from '../CommentCard/CommentCard';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comments'

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo(({ className, isLoading, comments }: CommentListProps) => {
  if (isLoading) {
    return (
      <div className={classNames(cls.isLoading, {}, [className])}>
        <CommentCard isLoading/>
        <CommentCard isLoading/>
        <CommentCard isLoading/>
      </div>
    )
  }
  return (
    <div className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments.map(comment => (
          <CommentCard 
            key={comment.id}
            className={cls.comment} 
            comment={comment} 
            isLoading={isLoading} 
          />
        ))
      ) : (
        <Text text={'Комментарии отсутствуют'} className={cls.text}/>
      )}
    </div>
  );
});