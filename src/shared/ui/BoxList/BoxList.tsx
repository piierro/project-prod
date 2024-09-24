import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import * as cls from './BoxList.module.scss'
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from '../Button/Button';
import { HStack } from '../Stack';

export interface BoxListItem {
  value: string;
  content: ReactNode;
  disabled?: boolean
}

type DropDownDirection = 'top'| 'bottom';

interface BoxListProps {
  items?: BoxListItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  label?: string;
  onChange: <T extends string>(value: T) => void;
  readonly?: boolean;
  direction?: DropDownDirection;
}

const mapDirectionClass: Record<DropDownDirection, string> = {
  bottom: cls.optionsBottom,
  top: cls.optiosnTop
}

export function BoxList(props: BoxListProps) {
  const { 
    items,
    className,
    value,
    defaultValue,
    label,
    onChange,
    readonly,
    direction = 'bottom',
  } = props;

  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap="16" align='center'>
      {label && <label>{`${label} >`}</label>}
      <Listbox 
        as={'div'} 
        value={value} 
        onChange={onChange}
        disabled={readonly}
        className={classNames(cls.BoxList, {}, [className])}
      >
        <ListboxButton disabled={readonly} className={cls.trigger}>
          <Button disabled={readonly} theme={ThemeButton.SELECT_BTN}>
            {value ?? defaultValue}
          </Button>
        </ListboxButton>
        <ListboxOptions className={classNames(cls.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <ListboxOption 
              key={item.value} 
              value={item.value} 
              disabled={item.disabled}
              as={Fragment}
            >
              {({ focus, selected }) => (
                <li
                  className={classNames(cls.item, { [cls.focus]: focus, [cls.disabled]: item.disabled })}
                >
                  {selected && '>'}
                  {item.content}
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </HStack>
  );

}