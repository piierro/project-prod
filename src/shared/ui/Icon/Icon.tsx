import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Icon.module.scss'
import { memo } from 'react';
import React from 'react';

interface IconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

export const Icon = memo(({ className, Svg, ...otherprops }: IconProps) => {
  return (
    <Svg 
      className={classNames(cls.Icon, {}, [className])} 
      {...otherprops}
    />
  )
})