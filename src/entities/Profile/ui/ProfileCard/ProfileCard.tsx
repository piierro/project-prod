import { Mods, classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ProfileCard.module.scss';
import { Input } from 'shared/ui/Input/Input';
import { Profile } from 'entities/Profile/model/types/profile';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Avatar } from 'shared/ui/Avatar/Avatar';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeFirstName?: (value?: string) => void;
    onChangeLastName?: (value?: string) => void;
    onChangeCity: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUserName?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className, 
    data,
    error,
    readonly,
    isLoading,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeCity,
    onChangeUserName,
    onChangeAvatar
  } = props;

  if(isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {[cls.loading]: true}, [className])}>
        <Loader />
      </div>
    )
  }

  if(error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={'Произошла ошибка при загрузке профиля'}
          text={'Попробуйте обновить страницу'}
          align={TextAlign.CENTER}
        />
      </div>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly
  }

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={data.avatar} />
          </div>
        )}
        <Input
          value={data?.avatar} 
          placeholder='Ссылка на аватарку'
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={readonly}
          key="webpages:Enabled"
        />
        <Input
          value={data?.username} 
          placeholder='Имя пользователя'
          className={cls.input}
          onChange={onChangeUserName}
          readonly={readonly}
        />
        <Input
          value={data?.first} 
          placeholder='Имя'
          className={cls.input}
          onChange={onChangeFirstName}
          readonly={readonly}
        />
        <Input
          value={data?.lastName} 
          placeholder='Фамилия'
          className={cls.input}
          onChange={onChangeLastName}
          readonly={readonly}
        />
        <Input
          type="text" 
          value={data?.age} 
          placeholder='Возраст'
          className={cls.input}
          onChange={onChangeAge}
          readonly={readonly}
        />
        <Input
          value={data?.city} 
          placeholder='Город'
          className={cls.input}
          onChange={onChangeCity}
          readonly={readonly}
        />
      </div>
    </div>
  )
}