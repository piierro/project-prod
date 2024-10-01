import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Select.module.scss';
import { ChangeEvent, useMemo } from 'react';

export interface SelectOption <T extends string>{
    value: T;
    content: string;
}

interface SelectProps <T extends string>{
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
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
    onChange?.(e.target.value as T);
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
}