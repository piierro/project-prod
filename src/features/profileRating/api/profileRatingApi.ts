import { Rating } from '@/entities/Reiting';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetProfileRatingArg {
  userId: string;
  profileId: string
}

interface RateProfileArg {
  userId: string;
  profileId: string;
  rate: number;
  feedback?: string;
}


const profileRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileRating: build.query<Rating[], GetProfileRatingArg>({
      query: ({profileId, userId}) => ({
        url: '/profile-ratings',
        params: {
          profileId,
          userId
        }
      }),
    }),
    rateprofile: build.mutation<void, RateProfileArg>({
      query: (arg) => ({
        url: '/profile-ratings',
        method: 'POST',
        body: arg
      }),
    }),
  }),
  overrideExisting: false,
})

export const useGetProfileRating = profileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = profileRatingApi.useRateprofileMutation;