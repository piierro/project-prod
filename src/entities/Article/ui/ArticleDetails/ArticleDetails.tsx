import { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleDetails.module.scss';
import { 
  DynamicModuleLoader, ReducersList 
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { useSelector } from 'react-redux';
import { 
  getArticleDetailsData, 
  getArticleDetailsError, 
  getArticleDetailsIsLoading 
} from '../../model/selectors/articleDetails';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import DataIcon from 'shared/assets/icons/data.svg';
import PreviewIcon from 'shared/assets/icons/preview.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { HStack, WStack } from 'shared/ui/Stack';
import { ArticleBlockType } from 'entities/Article/model/consts/articleConsts';

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
}

export const ArticleDetails = memo(({className, id}: ArticleDetailsProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    dispatch(fetchArticleById(id))
  }, [dispatch, id])

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch(block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlockComponent 
        key={block.id} 
        // className={cls.block} 
        block={block} 
      />
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlockComponent 
        key={block.id} 
        // className={cls.block} 
        block={block}
      />
    case ArticleBlockType.TEXT:
      return <ArticleTextBlockComponent 
        key={block.id} 
        // className={cls.block} 
        block={block}
      />
    default:
      return null;
    }
  }, [])

  let content;

  if(isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} border={'50%'} />
        <Skeleton width={300} height={32} />
        <Skeleton width={600} height={24} />
        <Skeleton width='100%' height={200} />
        <Skeleton  width='100%' height={200} />
      </>
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
      <>
        <HStack justify="center" max>
          <Avatar 
            size={200} 
            src={article?.img} 
            className={cls.avatar} 
          />
        </HStack>
        <WStack gap='4' max> 
          <Text 
            title={article?.title} 
            text={article?.subtitle}
            size={TextSize.L}
          />
          <HStack gap='8'>
            <Icon Svg={PreviewIcon} />
            <Text text={String(article?.views)} />
          </HStack>
          <HStack gap='8'>
            <Icon Svg={DataIcon} />
            <Text text={article?.createdAt} />
          </HStack>
        </WStack>
        {article?.blocks.map(renderBlock)}
      </>
    )
  }
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAnMount={true}>
      <WStack gap="16" max className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </WStack>
    </DynamicModuleLoader>
  )
})