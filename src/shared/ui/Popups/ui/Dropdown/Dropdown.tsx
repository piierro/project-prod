import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import * as cls from './Dropdown.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment } from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { DropDownDirection } from '../../../../types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';
import * as popupCls from '../../styles/popup.module.scss'

export interface DropdownItem {
   disabled?: boolean;
   content: ReactNode;
   onClick?: () => void;
   href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropDownDirection;
}

export function Dropdown(props: DropdownProps) {
  const { 
    className,
    items,
    trigger,
    direction = 'bottom left',
  } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu as="div" className={classNames('', {}, [className, popupCls.popup])}>
      <MenuButton className={popupCls.trigger}>
        {trigger}
      </MenuButton>
      <MenuItems className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ focus }: {focus: boolean}) => (
            <button 
              type='button'
              disabled={item.disabled}
              onClick={item.onClick}
              className={classNames(cls.item, {[popupCls.focus]: focus})}
            >
              {item.content}
            </button>
          )
          if(item.href) {
            return (
              <MenuItem as={AppLink} to={item.href} key={index}>
                {content}
              </MenuItem>
            )
          }
          return (
            <MenuItem as={Fragment} key={index}>
              {content}
            </MenuItem>
          )
        })}
      </MenuItems>
    </Menu>
  )
}