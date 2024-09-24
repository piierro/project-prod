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
   S = 'size_s',
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

type HeaderTegType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTeg: Record<string, HeaderTegType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
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

  const HeaderTeg = mapSizeToHeaderTeg[size];

  return (
    <div className={classNames('', mods, [className])}>
      {title && <HeaderTeg className={cls.title}>{title}</HeaderTeg>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
})