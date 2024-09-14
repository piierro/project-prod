import { memo, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleDetails.module.scss';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { useSelector } from 'react-redux';
import { 
  getArticleDetailsData, 
  getArticleDetailsError, 
  getArticleDetailsIsLoading 
} from '../../model/selectors/articleDetails';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
   articleDetails: articleDetailsReducer
}

export const ArticleDetails = memo(({className, id}: ArticleDetailsProps) => {
  const dispatch = useAppDispatch();
  // const isLoading = useSelector(getArticleDetailsIsLoading);
  const isLoading = true;
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    dispatch(fetchArticleById(id))
  }, [dispatch, id])

  let content;

  if(isLoading) {
    content = (
      <div>
        <Skeleton className={cls.avatar} width={200} height={200} border={'50%'} />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width='100%' height={200} />
        <Skeleton className={cls.skeleton} width='100%' height={200} />
      </div>
    )
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title={'Произошла ошибка при загрузке статьи.'}
      />
    )
  } else {
    content = (
      <div>ArticleDetails</div>
    )
  }
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAnMount={true}>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  )
})