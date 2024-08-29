import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ProfileHeader.module.scss';
import { memo, useCallback } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { getProfileRedonly, profileActions } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';


interface ProfileHeaderProps {
  className?: string;
}

export const ProfileHeader = memo(({className}: ProfileHeaderProps) => {
  const readonly = useSelector(getProfileRedonly);
  const dispatch = useAppDispatch()

  const onEdit = useCallback(() => {
     dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
     dispatch(profileActions.cancelEdit())
  }, [dispatch])

  return (
    <div className={classNames(cls.ProfileHeader, {}, [className])}>
      <Text title={'Профиль'}/>
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
          </>
        )
      }
    </div>
  )
})