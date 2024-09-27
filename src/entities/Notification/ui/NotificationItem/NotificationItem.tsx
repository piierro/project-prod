import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './NotificationItem.module.scss'
import { memo } from 'react';
import { Notification } from '../../model/types/notification';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { Text, TextSize } from 'shared/ui/Text/Text';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo(({ className, item }: NotificationItemProps) => {
  const content = (
    <Card 
      className={classNames(cls.NotificationItem, {}, [className])}
      theme={CardTheme.CLEAR}
    >
      <Text title={item.title} text={item.desctiption} size={TextSize.S}/>
    </Card>
  )

  if(item.href) {
    return (
      <a 
        className={cls.link}
        target={'_blank'} 
        href={item.href}
        rel='noreferrer'
      >
        {content}
      </a>
    )
  }
  return content;
})