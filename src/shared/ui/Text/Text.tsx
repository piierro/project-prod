import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Text.module.scss';

export enum TextTheme {
    PRIMAPY = 'primary',
    ERROR = 'error'
}

interface TextPropsProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme
}

export const Text= (props: TextPropsProps) => {
  const {
    className,
    text,
    title,
    theme = TextTheme.PRIMAPY
  } = props;

  return (
    <div className={classNames('', { [cls[theme]]: true }, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
}