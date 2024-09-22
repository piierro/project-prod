import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleSortSelect.module.scss';
import { memo, useCallback, useMemo } from 'react';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article';


interface ArticleSortSelectProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelect = memo((props: ArticleSortSelectProps) => {
  const { 
    className, 
    onChangeOrder, 
    onChangeSort, 
    order, 
    sort
  } = props;

  const orderOptions = useMemo<SelectOption[]>(() => [
    {
      value: 'asc',
      content: 'возрастанию'
    },
    {
      value: 'desc',
      content: 'убыванию'
    }
  ], [])

  const sortFieldOptions = useMemo<SelectOption[]>(() => [
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

  const changeSortHandler = useCallback((newSort: string) => {
    onChangeSort(newSort as ArticleSortField)
  }, [onChangeSort])

  const changeOrderHandler = useCallback((newOrder: string) => {
    onChangeOrder(newOrder as SortOrder)
  }, [onChangeOrder])

  return (
    <div className={classNames(cls.ArticleSortSelect, {}, [className])}>
      <Select 
        options={sortFieldOptions} 
        label={'Сортировать по'} 
        value={sort}
        onChange={changeSortHandler}
      />
      <Select 
        options={orderOptions} 
        label={'по'} 
        value={order}
        onChange={changeOrderHandler}
        className={cls.order}
      />
    </div>
  )
})