import { classNames } from 'shared/lib/classNames/classNames';
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
}

export const Card = memo(({ className, children, theme = CardTheme.NORMAL, ...otherProps }: CardProps) => {
  return (
    <div 
      className={classNames(cls.Card, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  )
})