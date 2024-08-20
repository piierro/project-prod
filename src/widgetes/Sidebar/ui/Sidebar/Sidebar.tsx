import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Sidebar.module.scss';
import { useState } from 'react';
import { ThemeSwitcher } from 'widgetes/ThemeSwitcher';

interface SidebarProps {
    className?: string 
}

export const Sidebar = ({className}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed(prev => !prev)
  }
  
  return (
    <div 
      data-testid="sidebar"
      className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>
      <button 
        data-testid="sidebar-toggle"
        onClick={onToggle}>Click</button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
      </div>
    </div>
  )
}