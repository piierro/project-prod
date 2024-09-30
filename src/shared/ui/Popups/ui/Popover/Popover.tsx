import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import * as cls from './Popover.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import { DropDownDirection } from '../../../../types/ui';
import { mapDirectionClass } from '../../styles/consts';
import * as popupCls from '../../styles/popup.module.scss'

interface PopoverProps {
    className?: string;
    trigger: ReactNode;
    direction?: DropDownDirection;
    children: ReactNode;
}

export function MyPopover(props: PopoverProps) {
  const { 
    className,
    trigger,
    direction = 'bottom right',
    children
  } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Popover as="div" className={classNames('', {}, [className, popupCls.popup])}>
      <PopoverButton as="div" className={popupCls.trigger}>
        {trigger}
      </PopoverButton>
      <PopoverPanel className={classNames(cls.panel, {}, menuClasses)}>
        {children}
      </PopoverPanel>
    </Popover>
  )
}