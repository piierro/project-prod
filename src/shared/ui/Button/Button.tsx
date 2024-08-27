import { Mods, classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Button.module.scss';
import { ButtonHTMLAttributes, ReactNode, memo } from 'react';

export enum ThemeButton {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  ERROR = 'error',
  BACKGGROUND = 'background',
  BACKGGROUND_INVERTED = 'backgroundInverted',
}

export enum SizeButton {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl' 
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    square?: boolean;
    size?: SizeButton;
    disabled?: boolean;
    children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = ThemeButton.BACKGGROUND,
    square,
    disabled,
    size = SizeButton.M,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled
  }

  return (
    <button 
      type='button'
      className={classNames(cls.Button, mods, [className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
})