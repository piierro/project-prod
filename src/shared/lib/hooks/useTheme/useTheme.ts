import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../../const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '../../../const/localSrorage';

export interface useThemeResult {
    toggleTheme: () => void;
    theme: Theme
}

export function useTheme(): useThemeResult {
  const {theme, setTheme} = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme?.(newTheme)

    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }
   
  return {
    theme: theme || Theme.LIGHT,
    toggleTheme
  }
}