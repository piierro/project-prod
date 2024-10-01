import { ReitingCard } from '@/entities/Reiting';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useGetProfileRating, useRateProfile } from '../../api/profileRatingApi';

export interface ProfileRatingProps {
  className?: string;
  profileId: string;
}

const ProfileRating = memo(({ className, profileId }: ProfileRatingProps) => {
  const userData = useSelector(getUserAuthData)
  const {data, isLoading } = useGetProfileRating({
    profileId,
    userId: userData?.id ?? ''
  })
  const [rateProfileMutation] = useRateProfile()

  const handleRateArticle = useCallback((starCount: number, feedBack?: string) => {
    try {
      rateProfileMutation({
        userId: userData?.id ?? '',
        profileId,
        rate: starCount,
        feedback: feedBack
      }) 
    } catch(e) {
      console.log(e)
    }
  }, [profileId, rateProfileMutation, userData?.id])

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
      title='Оцените профиль'
    />
  )
})

export default ProfileRating;