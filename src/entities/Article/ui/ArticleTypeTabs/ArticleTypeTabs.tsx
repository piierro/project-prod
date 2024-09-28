import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleTypeTabs.module.scss';
import { memo, useCallback, useMemo } from 'react';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { ArticleType } from '../../model/consts/articleConsts';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo(({ className, value, onChangeType }: ArticleTypeTabsProps) => {
    
  const typeTabs = useMemo<TabItem[]>(() => [
    {
      value: ArticleType.ALL,
      content: 'Все статьи'
    },
    {
      value: ArticleType.IT,
      content: 'Айти'
    },
    {
      value: ArticleType.MEME,
      content: 'Мемы'
    },
    {
      value: ArticleType.SCIENCE,
      content: 'Наука'
    }
  ], [])

  const onTabClick= useCallback((tab: TabItem) => {
    onChangeType(tab.value as ArticleType)
  }, [onChangeType])

  return (
    <div className={cls.ArticleTypeTabs}>
      <Tabs 
        tabs={typeTabs}
        value={value}
        onTabClick={onTabClick}
        className={classNames('', {}, [className])} 
      />
      <AppLink 
        to={RoutePath.article_create}
        className={cls.createArticle}
      >
        Создать статью
      </AppLink>
    </div>

  )
})
