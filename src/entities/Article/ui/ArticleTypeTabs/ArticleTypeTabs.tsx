import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleTypeTabs.module.scss';
import { memo, useCallback, useMemo } from 'react';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { AppLink } from '@/shared/ui/AppLink';
import { ArticleType } from '../../model/consts/articleConsts';
import { getRouteArticleCreate } from '@/shared/const/router';

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
        to={getRouteArticleCreate()}
        className={cls.createArticle}
      >
        Создать статью
      </AppLink>
    </div>

  )
})
