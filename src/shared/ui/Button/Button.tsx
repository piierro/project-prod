import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Button.module.scss';
import { ButtonHTMLAttributes, FC } from 'react';

export enum ThemeButton {
  CLEAR = 'clear',
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
    size?: SizeButton
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme,
    square,
    size = SizeButton.M,
    ...otherProps
  } = props;

  const mods = {
    [cls.square]: square,
    [cls[size]]: true
  }

  return (
    <button 
      type='button'
      className={classNames(cls.Button, mods, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}