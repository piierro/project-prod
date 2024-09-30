import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './NotificationButton.module.scss'
import { memo, useCallback, useState } from 'react';
import { MyPopover } from '@/shared/ui/Popups';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(()  => {
    setIsOpen(true)
  }, [])

  const onCloseDrawer = useCallback(()  => {
    setIsOpen(false)
  }, [])

  const trigger = (
    <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
      <Icon Svg={NotificationIcon} className={cls.icon}/>
    </Button>
  )
  return (
    <div>
      <BrowserView>
        <MyPopover
          className={classNames('', {}, [className])} 
          direction="bottom left" 
          trigger={trigger}
        >
          <NotificationList className={cls.notifications}/>
        </MyPopover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  )
})