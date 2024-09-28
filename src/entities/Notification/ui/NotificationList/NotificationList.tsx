import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './NotificationList.module.scss'
import { memo } from 'react';
import { useNotifications } from '../../api/notidicationApi';
import { HStack, WStack } from '@/shared/ui/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 10000
  });

  if(isLoading) {
    return (
      <HStack gap="16" className={classNames(cls.NotificationList, {}, [className])}>
        <Skeleton width={'100%'} border={'15px'} height={'50px'}/>
        <Skeleton width={'100%'} border={'15px'} height={'50px'}/>
        <Skeleton width={'100%'} border={'15px'} height={'50px'}/>
      </HStack>
    )
  }

  return (
    <WStack gap="16" className={classNames(cls.NotificationList, {}, [className])}>
      {data?.map(item => (
        <NotificationItem 
          key={item.id}
          item={item}
        />
      ))}
    </WStack>
  )
})