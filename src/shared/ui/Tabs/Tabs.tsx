import * as cls from './Tabs.module.scss'
import { ReactNode, memo, useCallback } from 'react';
import { Card, CardTheme } from '../Card/Card';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo(({ className, tabs, value, onTabClick }: TabsProps) => {
  const clickHandle = useCallback((tab: TabItem) => {
    return () => {
      onTabClick(tab)
    }
  }, [onTabClick])

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map(tab => (
        <Card 
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          key={tab.value}
          onClick={clickHandle(tab)}
          className={cls.tab}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  )
})