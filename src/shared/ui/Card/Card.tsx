import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Card.module.scss'
import { HTMLAttributes, ReactNode, memo } from 'react';


export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
    CLEAR = 'clear'
}

interface CardProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  max?: boolean;
}

export const Card = memo((
  { className, children, theme = CardTheme.NORMAL, max, ...otherProps }
  : CardProps) => {
  return (
    <div 
      className={classNames(cls.Card, {[cls.max]: max}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  )
})