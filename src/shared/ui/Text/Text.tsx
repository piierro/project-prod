import { Mods, classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Text.module.scss';
import { memo } from 'react';

export enum TextTheme {
  PRIMAPY = 'primary',
  ERROR = 'error'
}

export enum TextAlign {
   RIGHT = 'right',
   LIGHT = 'light',
   CENTER = 'center'
}

export enum TextSize {
   M = 'size_m',
   L = 'size_l',
}

interface TextPropsProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

export const Text = memo((props: TextPropsProps) => {
  const {
    className,
    text,
    title,
    theme = TextTheme.PRIMAPY,
    align = TextAlign.LIGHT,
    size = TextSize.M
  } = props;

  const mods: Mods = {
    [cls[theme]]: true,
    [cls[align]]: true,
    [cls[size]]: true
  }

  return (
    <div className={classNames('', mods, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
})