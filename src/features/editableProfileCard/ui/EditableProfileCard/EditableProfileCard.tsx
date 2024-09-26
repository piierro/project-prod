import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { 
  ProfileCard
} from 'entities/Profile';
import { 
  DynamicModuleLoader, 
  ReducersList 
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { profileActions, profileReducer } from '../..//model/slice/ProfileSlice';
import { getProfileError } from '../..//model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../..//model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileRedonly } from '../..//model/selectors/getProfileReadonly/getProfileReadonly';
import {
  getValidateProfileErrors 
} from '../..//model/selectors/getValidateProfileErrors/getValidateProfileErrors';
import { fetchProfileData } from '../..//model/services/fetchProfileData/fetchProfileData';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { WStack } from 'shared/ui/Stack';

interface EditableProfileCardProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  profile: profileReducer
}

export const EditableProfileCard = memo(({ className, id }: EditableProfileCardProps) => {
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const readonly = useSelector(getProfileRedonly);
  const validateErrors = useSelector(getValidateProfileErrors);

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
    <DynamicModuleLoader reducers={reducers} removeAfterAnMount>
      <WStack gap="16" max className={classNames('', {}, [className])}>
        <EditableProfileCardHeader />
        {validateErrors?.length && validateErrors.map((err: string) => (
          <Text 
            key={err}
            theme={TextTheme.ERROR} 
            text={err}
            data-testid={'EditableProfileCard.Error'}
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
      </WStack>
    </DynamicModuleLoader>
  )
})