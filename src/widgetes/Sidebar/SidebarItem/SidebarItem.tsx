import * as cls from './SidebarItem.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from '../model/items';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

interface SidebarItemProps {
    item?: SidebarItemType;
    collapsed: boolean; 
}

export const SidebarItem = memo(({item, collapsed}: SidebarItemProps) => {
  if (!item) {
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