import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { ProfileRatingProps } from './ProfileRating';
import { Suspense, lazy, } from 'react';

const ProfileRatingLazy = lazy(() => import('./ProfileRating'));

export const ProfileRatingAsync = (props: ProfileRatingProps) => {
  return (
    <Suspense fallback={<Skeleton width={'100%'} height={120} border={'10px'} />}>
      <ProfileRatingLazy {...props} />
    </Suspense>
  )
}