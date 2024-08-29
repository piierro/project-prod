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

interface TextPropsProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}

export const Text = memo((props: TextPropsProps) => {
  const {
    className,
    text,
    title,
    theme = TextTheme.PRIMAPY,
    align = TextAlign.LIGHT
  } = props;

  const mods: Mods = {
    [cls[theme]]: true,
    [cls[align]]: true
  }

  return (
    <div className={classNames('', mods, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
})