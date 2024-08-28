import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ProfileCard.module.scss';
import { useSelector } from 'react-redux';
import { 
  getProfileData
} from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { Text } from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

interface ProfileCardProps {
    className?: string 
}

export const ProfileCard = ({className}: ProfileCardProps) => {
  const data = useSelector(getProfileData);
  // const error = useSelector(getProfileError);
  // const isLoading = useSelector(getProfileIsLoading);

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={'Профиль'}/>
        <Button 
          theme={ThemeButton.CLEAR}
          className={cls.editBtn}
        >
          Редактировать
        </Button>
      </div>
      <div className={cls.data}>
        <Input
          value={data?.first} 
          placeholder='Имя'
          className={cls.input}
        />
        <Input
          value={data?.lastName} 
          placeholder='Фамилия'
          className={cls.input}
        />
      </div>
    </div>
  )
}