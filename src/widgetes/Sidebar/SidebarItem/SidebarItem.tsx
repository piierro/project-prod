import * as cls from './SidebarItem.module.scss';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../model/types/sidebar';

interface SidebarItemProps {
    item?: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({item, collapsed}: SidebarItemProps) => {
  const isAuth = useSelector(getUserAuthData);
  if (!item) {
    return null;
  }

  if(item.authOnly && !isAuth) {
    return null;
  }
 
  return (
    <AppLink 
      theme={AppLinkTheme.SECONDARY} 
      to={item.path}
      className={classNames(cls.item, {[cls.collapsed]: collapsed}, [])}
    >
      <item.Icon className={cls.icon}/>
      <span className={cls.link}>{item.text}</span>
    </AppLink>
  )
})