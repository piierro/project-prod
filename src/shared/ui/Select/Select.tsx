import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Select.module.scss';
import { ChangeEvent, memo, useMemo } from 'react';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const { 
    className,
    label,
    options,
    onChange,
    value,
    readonly
  } = props;
  const mods: Mods = {};

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  }

  const optionList = useMemo(() => {
    return options?.map(opt => (
      <option
        className={cls.option}
        value={opt.value}
        key={opt.value}
      >
        {opt.content}
      </option>
    ))
  }, [options])
  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && (
        <span className={cls.label}>
          {label}
        </span>
      )}
      <select 
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionList}
      </select>
    </div>
  )
})