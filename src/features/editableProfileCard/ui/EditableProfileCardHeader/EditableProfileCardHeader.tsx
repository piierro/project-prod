import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './EditableProfileCardHeader.module.scss';
import { memo, useCallback } from 'react';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { getUserAuthData } from '@/entities/User';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileRedonly } from '../..//model/selectors/getProfileReadonly/getProfileReadonly';
import { upDateProfileData } from '../..//model/services/upDateProfileData/upDateProfileData';
import { profileActions } from '../../model/slice/ProfileSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(({ className }: EditableProfileCardHeaderProps) => {
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
              className={cls.editBtn}
              theme={ThemeButton.BACKGGROUND_INVERTED}
              onClick={onEdit}
          
            >
              Редактировать
            </Button>
            )
            : (
              <>
                <Button 
                  theme={ThemeButton.BACKGGROUND_INVERTED}
                  onClick={onCancelEdit}
                  className={cls.editBtn}
                  data-testid={'EditableProfileCardHeader.CancelBtn'}
                >
                  Отменить
                </Button>
                <Button 
                  theme={ThemeButton.BACKGGROUND_INVERTED}
                  onClick={onSave}
                  data-testid={'EditableProfileCardHeader.SaveBtn'}
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