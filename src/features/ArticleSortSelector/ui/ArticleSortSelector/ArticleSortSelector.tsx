import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleSortSelector.module.scss';
import { memo, useMemo } from 'react';
import { Select, SelectOption } from '@/shared/ui/Select';
import { SortOrder } from '@/shared/types';
import { ArticleSortField } from '@/entities/Article';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { 
    className, 
    onChangeOrder, 
    onChangeSort, 
    order, 
    sort
  } = props;

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: 'возрастанию'
    },
    {
      value: 'desc',
      content: 'убыванию'
    }
  ], [])

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: 'дате создания'
    },
    {
      value: ArticleSortField.TITLE,
      content: 'названию'
    },
    {
      value: ArticleSortField.VIEWS,
      content: 'просмотрам'
    }
  ], [])

  // const changeSortHandler = useCallback((newSort: string) => {
  //   onChangeSort(newSort as ArticleSortField)
  // }, [onChangeSort])

  // const changeOrderHandler = useCallback((newOrder: string) => {
  //   onChangeOrder(newOrder as SortOrder)
  // }, [onChangeOrder])

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        options={sortFieldOptions} 
        label={'Сортировать по'} 
        value={sort}
        onChange={onChangeSort}
      />
      <Select 
        options={orderOptions} 
        label={'по'} 
        value={order}
        onChange={onChangeOrder}
        className={cls.order}
      />
    </div>
  )
})