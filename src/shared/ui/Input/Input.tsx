import { Mods, classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Input.module.scss';
import { InputHTMLAttributes, memo } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

const InputComponent = memo((props: InputProps) => {

  const {
    className,
    value,
    onChange,
    type = 'text',
    readonly,
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  }

  const mods: Mods = {
    [cls.readonly]: readonly
  }
 
  return (
    <div className={classNames('', mods, [className])}>
      <input 
        className={cls.Input}
        type={type} 
        value={value}
        onChange={onChangeHandler}
        readOnly={readonly}
        {...otherProps}
      />
    </div>
  )
})

InputComponent.displayName = 'InputComponent';

export const Input = memo(InputComponent);