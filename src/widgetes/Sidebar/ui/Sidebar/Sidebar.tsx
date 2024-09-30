import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Sidebar.module.scss';
import { memo, useMemo, useState } from 'react';
import { Button, SizeButton, ThemeButton } from '@/shared/ui/Button/Button';
import BurgerMenu from '@/shared/assets/icons/menu.svg'
import { SidebarItem } from '../../SidebarItem/SidebarItem';
import { useSelector } from 'react-redux';
import { WStack } from '@/shared/ui/Stack/WStack/WStack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { ThemeSwitcher } from './../../../ThemeSwitcher';

interface SidebarProps {
  className?: string 
}

export const Sidebar = memo(({className}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems)

  const onToggle = () => {
    setCollapsed(prev => !prev)
  }

  const itemList = useMemo(() => sidebarItemsList?.map((item) => (
    <SidebarItem
      item={item}
      collapsed={collapsed}
      key={item.path}
    />
  )), [collapsed, sidebarItemsList]);
  
  return (
    <aside 
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
      <WStack role='navigation' gap="8" className={cls.items}>
        <span className={cls.hr}></span>
        {itemList}
      </WStack>
      <div className={cls.switchers}>
        <ThemeSwitcher />
      </div>
    </aside>
  )
})