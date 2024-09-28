import { classNames } from '@/shared/lib/classNames/classNames';

import * as cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';
import { ReactNode, forwardRef, memo } from 'react';

export enum AppLinkTheme {
    PRIPARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
    className?: string;
    children: ReactNode;
    theme?: AppLinkTheme;
}

export const AppLink = memo(forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
  const { 
    to,
    className,
    children,
    theme = AppLinkTheme.PRIPARY,
    ...otherProps
  } 
    = props;
    
  return (
    <Link 
      to={to}
      ref={ref}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  )
}))