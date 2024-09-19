import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './CommentCard.module.scss'
import { memo } from 'react';
import { Comment } from '../../model/types/comments'
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCardSkeleton, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={50} height={50} border={'50%'} />
          <Skeleton width={100} height={15} className={cls.username} />
        </div>
        <Skeleton className={cls.text} height={50} width={'100%'}/>
      </div>
    )
  }

  if(!comment) {
    return null;
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink className={cls.header} to={`${RoutePath.profile}${comment.user.id}`}>
        {comment.user.avatar ? <Avatar size={50} src={comment.user.avatar}/> : null}
        <Text className={cls.username} text={String(comment.user.username)} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </div>
  )
})