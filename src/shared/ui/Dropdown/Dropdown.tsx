import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import * as cls from './Dropdown.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment } from 'react/jsx-runtime';
import { Component, ReactNode } from 'react';
import { DropDownDirection } from 'shared/types/ui';
import { AppLink } from '../AppLink/AppLink';

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

const mapDirectionClass: Record<DropDownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top left': cls.optionsTopLeft,
  'top right': cls.optionsTopRight
}


class Dropdown extends Component<DropdownProps>  {
  render() {
    const { 
      className,
      items,
      trigger,
      direction = 'bottom left',
    } = this.props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
      <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
        <MenuButton className={cls.menuBth}>
          {trigger}
        </MenuButton>
        <MenuItems className={classNames(cls.menu, {}, menuClasses)}>
          {items.map((item, index) => {
            const content = ({ focus }: {focus: boolean}) => (
              <button 
                type='button'
                disabled={item.disabled}
                onClick={item.onClick}
                className={classNames(cls.item, {[cls.focus]: focus})}
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
}

export default Dropdown;