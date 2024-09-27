import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './NotificationButton.module.scss'
import { memo } from 'react';
import { MyPopover } from 'shared/ui/Popups';
import { Button } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { NotificationList } from 'entities/Notification';
import NotificationIcon from 'shared/assets/icons/notification.svg';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => {
  return (
    <MyPopover
      className={classNames('', {}, [className])} 
      direction="bottom left" 
      trigger={(
        <Button>
          <Icon Svg={NotificationIcon} className={cls.icon}/>
        </Button>
      )}
    >
      <NotificationList className={cls.notifications}/>
    </MyPopover>
  )
})