import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './CommentCard.module.scss'
import { memo } from 'react';
import { Comment } from '../../model/types/comments'
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { WStack } from '@/shared/ui/Stack';
import { getRouteProfile } from '@/shared/const/router';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {

  if (isLoading) {
    return (
      <WStack max gap="8" className={classNames('', {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={50} height={50} border={'50%'} />
          <Skeleton width={100} height={15} className={cls.username} />
        </div>
        <Skeleton height={50} width={'100%'} border='50px'/>
      </WStack>
    )
  }

  if(!comment) {
    return null;
  }

  return (
    <WStack gap='8' max className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink className={cls.header} to={getRouteProfile(comment.user.id)}>
        {comment.user.avatar ? <Avatar size={50} src={comment.user.avatar}/> : null}
        <Text className={cls.username} text={String(comment.user.username)} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </WStack>
  )
})