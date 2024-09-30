import { ReitingCard } from '@/entities/Reiting';
import { memo } from 'react';
import { useGetArticleRating, useRateArticel } from '../../api/articleRatingApi';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

export const ArticleRating = memo(({ className, articleId }: ArticleRatingProps) => {
    const userData = useSelector(getUserAuthData)
    const {data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? ''
    })
    const [rateArticleMutation] = useRateArticel()

    if(isLoading) {
        return <Skeleton width={'100%'} height={120} border={'10px'}/>
    }

    const rating = data?.[0]
  return (
    <ReitingCard
      rate={rating?.rate}
      className={className}
      title='Оцените статью'
      feedBackTitle='Оставьте свой отзыв о статье, это поможет улучшить качество'
      hasFeedBack
    />
  )
})