import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text, TextSize } from '@/shared/ui/Text';
import { ArticleList } from '@/entities/Article';
import { WStack } from '@/shared/ui/Stack';
import { useArticleReccomendationsList } from '../../api/articleReccomendationsApi';

interface ArticleReccomendationsListProps {
  className?: string;
}

export const ArticleReccomendationsList = memo(({ className }: ArticleReccomendationsListProps) => {
  const {data: articles, isLoading, error} = useArticleReccomendationsList(5);

  if(isLoading || error || !articles) {
    return null
  }

  return (
    <WStack gap="16" className={classNames('', {}, [className])}>
      <Text 
        size={TextSize.L} 
        title={'Рекомендуем для прочтения'} 
      />
      <ArticleList 
        articles={articles} 
        target="_blank"
      />
    </WStack>
  )
})