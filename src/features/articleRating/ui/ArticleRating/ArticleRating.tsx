import { ReitingCard } from '@/entities/Reiting';
import { memo, useCallback } from 'react';
import { useGetArticleRating, useRateArticel } from '../../api/articleRatingApi';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo(({ className, articleId }: ArticleRatingProps) => {
    const userData = useSelector(getUserAuthData)
    const {data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? ''
    })
    const [rateArticleMutation] = useRateArticel()

    const handleRateArticle = useCallback((starCount: number, feedBack?: string) => {
        try {
        rateArticleMutation({
            userId: userData?.id ?? '',
            articleId,
            rate: starCount,
            feedback: feedBack
        }) 
        } catch(e) {
           console.log(e)
        }
    }, [articleId, rateArticleMutation, userData?.id])

    const onCancel = useCallback((starCount: number) => {
      handleRateArticle(starCount)
    }, [handleRateArticle])

    const onAccept = useCallback((starCount: number, feedBack?: string) => {
        handleRateArticle(starCount, feedBack)
    }, [handleRateArticle])

    if(isLoading) {
        return <Skeleton width={'100%'} height={120} border={'10px'} />
    }

    const rating = data?.[0]

  return (
    <ReitingCard
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      className={className}
      title='Оцените статью'
      feedBackTitle='Оставьте свой отзыв о статье, это поможет улучшить качество'
      hasFeedBack
    />
  )
})

export default ArticleRating;