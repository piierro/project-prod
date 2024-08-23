import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Input.module.scss';
import { InputHTMLAttributes, memo } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

const InputComponent = memo((props: InputProps) => {

  const {
    className,
    value,
    onChange,
    type = 'text',
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  }
 
  return (
    <div className={classNames('', {}, [className])}>
      <input 
        className={cls.Input}
        type={type} 
        value={value}
        onChange={onChangeHandler}
        {...otherProps}
      />
    </div>
  )
})

InputComponent.displayName = 'InputComponent';

export const Input = memo(InputComponent);