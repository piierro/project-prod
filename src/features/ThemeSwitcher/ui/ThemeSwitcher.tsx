import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ThemeSwitcher.module.scss';
import DarkIcon from '@/shared/assets/icons/theme-light.svg';
import LightIcon from '@/shared/assets/icons/theme-dark.svg'
import { Button, ThemeButton } from '@/shared/ui/Button';
import { memo } from 'react';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';

interface ThemeSwitcherProps {
    className?: string 
}

export const ThemeSwitcher = memo(({className}: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      theme={ThemeButton.CLEAR}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon />} 
    </Button>
  )
})