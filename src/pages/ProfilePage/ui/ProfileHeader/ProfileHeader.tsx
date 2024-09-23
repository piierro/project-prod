import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ProfileHeader.module.scss';
import { memo, useCallback } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { 
  getProfileData, 
  getProfileRedonly, 
  profileActions, 
  upDateProfileData 
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import { HStack } from 'shared/ui/Stack';

interface ProfileHeaderProps {
  className?: string;
}

export const ProfileHeader = memo(({className}: ProfileHeaderProps) => {
  const readonly = useSelector(getProfileRedonly);
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const cancelEdit = authData?.id === profileData?.id;
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(upDateProfileData())
  }, [dispatch])

  return (
    <HStack justify={'between'} className={classNames(cls.ProfileHeader, {}, [className])}>
      <Text title={'Профиль'}/>
      {cancelEdit && 
        <div className={cls.btnWrapper}>
          {readonly 
            ? 
            (<Button 
              theme={ThemeButton.BACKGGROUND_INVERTED}
              className={cls.editBtn}
              onClick={onEdit}
          
            >
              Редактировать
            </Button>
            )
            : (
              <>
                <Button 
                  theme={ThemeButton.BACKGGROUND_INVERTED}
                  className={cls.editBtn}
                  onClick={onCancelEdit}
                >
                  Отменить
                </Button>
                <Button 
                  theme={ThemeButton.BACKGGROUND_INVERTED}
                  onClick={onSave}
                >
                  Сохранить
                </Button>
              </>
            )
          }
        </div>
      }
    </HStack>
  )
})