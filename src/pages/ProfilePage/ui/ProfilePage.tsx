import { 
  ProfileCard, 
  fetchProfileData, 
  getProfileError, 
  getProfileForm, 
  getProfileIsLoading, 
  getProfileRedonly, 
  getValidateProfileErrors, 
  profileActions, 
  profileReducer
} from 'entities/Profile';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { 
  DynamicModuleLoader, ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useParams } from 'react-router-dom';
// import * as cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
  profile: profileReducer
}

interface PageLoaderProps {
    className?: string 
}

const ProfilePage = ({className}: PageLoaderProps) => {
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const readonly = useSelector(getProfileRedonly);
  const validateErrors = useSelector(getValidateProfileErrors);
  const { id } = useParams<{id: string}>();

  useEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id))
    }
  }, [dispatch, id])

  const onChangeFirstName = useCallback((value?: string) => {
    dispatch(profileActions.upDateProfile({first: value || ''}))
  }, [dispatch])

  const onChangeLastName = useCallback((value?: string) => {
    dispatch(profileActions.upDateProfile({lastName: value || ''}))
  }, [dispatch])

  const onChangeAge = useCallback((value?: string) => {
    const age = value ? parseInt(value, 10) : 0;
    if (!isNaN(age)) {
      dispatch(profileActions.upDateProfile({ age }));
    } else {
      dispatch(profileActions.upDateProfile({ age: 0 }));
    }
  }, [dispatch]);

  const onChangeCity = useCallback((value?: string) => {
    dispatch(profileActions.upDateProfile({city: value || ''}))
  }, [dispatch])

  const onChangeUserName = useCallback((value?: string) => {
    dispatch(profileActions.upDateProfile({username: value || ''}))
  }, [dispatch])

  const onChangeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.upDateProfile({avatar: value || ''}))
  }, [dispatch])

  const onChangeCurrency = useCallback((currency: Currency) => {
    dispatch(profileActions.upDateProfile({currency}))
  }, [dispatch])

  const onChangeCountry = useCallback((country: Country) => {
    dispatch(profileActions.upDateProfile({country}))
  }, [dispatch])
 
  return (
    <DynamicModuleLoader reducers={reducers}  removeAfterAnMount>
      <div className={classNames('', {}, [className])}>
        <ProfileHeader />
        {validateErrors?.length && validateErrors.map(err => (
          <Text 
            key={err}
            theme={TextTheme.ERROR} 
            text={err} 
          />
        ))}
        <ProfileCard 
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUserName={onChangeUserName}
          onChangeAvatar={onChangeAvatar}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage;