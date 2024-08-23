import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Sidebar.module.scss';
import { useCallback, useState } from 'react';
import { ThemeSwitcher } from 'widgetes/ThemeSwitcher';
import { Button, SizeButton, ThemeButton } from 'shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/home.svg';
import InfoIcon from 'shared/assets/icons/info.svg';
import BurgerMenu from 'shared/assets/icons/menu.svg'
import { LoginModal } from 'features/AuthByUsername';

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
        <div>
          <AppLink 
            theme={AppLinkTheme.SECONDARY} 
            to={RoutePath.main}
            className={cls.item}
          >
            <HomeIcon className={cls.icon}/>
            <span  className={cls.link}>Главная</span>
          </AppLink>
        </div>
        <div>
          <AppLink 
            theme={AppLinkTheme.SECONDARY} 
            to={RoutePath.about}
            className={cls.item}
          >
            <InfoIcon className={cls.icon}/>
            <span className={cls.link}>О сайте</span>
          </AppLink>
        </div>
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
      </div>
    </div>
  )
}