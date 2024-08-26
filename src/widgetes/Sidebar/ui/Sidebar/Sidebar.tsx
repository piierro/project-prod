import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Sidebar.module.scss';
import { memo, useMemo, useState } from 'react';
import { ThemeSwitcher } from 'widgetes/ThemeSwitcher';
import { Button, SizeButton, ThemeButton } from 'shared/ui/Button/Button';
import BurgerMenu from 'shared/assets/icons/menu.svg'
import { SidebarItemsList } from '../../model/items';
import { SidebarItem } from '../../SidebarItem/SidebarItem';

interface SidebarProps {
  className?: string 
}

export const Sidebar = memo(({className}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed(prev => !prev)
  }

  const itemList = useMemo(() => SidebarItemsList.map((item) => (
     <SidebarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
          />
  )), [collapsed]);
  
  return (
    <div 
      data-testid="sidebar"
      className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>
      <Button 
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapsedBtn}
        theme={ThemeButton.BACKGGROUND_INVERTED}
        size={SizeButton.L}
        square
      >
        {collapsed ? <BurgerMenu /> : '<'}
      </Button>
      <div className={cls.items}>
        <span className={cls.hr}></span>
        {itemList}
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
      </div>
    </div>
  )
})