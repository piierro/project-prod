import { Mods, classNames } from 'shared/lib/classNames/classNames';
import * as cls from'./Drawer.module.scss'
import { ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = (props: DrawerProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
  } = props

  const  { theme } = useTheme();
  const mods: Mods = {
    [cls.opened]: isOpen
  }

  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className, theme, 'App_drawer'])}>
        <Overlay onClick={onClose} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}