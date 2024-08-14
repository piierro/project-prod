import { classNames } from 'shared/lib/classNames/classNames';

import * as cls from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { ThemeSwitcher } from 'widgetes/ThemeSwitcher';

interface NavbarProps {
    className?: string 
}

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <ThemeSwitcher />
        <div className={cls.links}>
            <AppLink 
             theme={AppLinkTheme.SECONDARY} 
             to={'/'}  
             className={cls.mainAppLink}
             >
                Главная
             </AppLink>
            <AppLink 
             theme={AppLinkTheme.SECONDARY} 
             to={'/about'}
             >
                О сайте
            </AppLink>
        </div>
    </div>
  )
}