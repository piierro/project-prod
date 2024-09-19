import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Card.module.scss'
import { HTMLAttributes, ReactNode, memo } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
  children: ReactNode;
}

export const Card = memo(({ className, children, ...otherProps }: CardProps) => {
  return (
    <div 
      className={classNames(cls.Card, {}, [className])}
      {...otherProps}
    >
      {children}
    </div>
  )
})