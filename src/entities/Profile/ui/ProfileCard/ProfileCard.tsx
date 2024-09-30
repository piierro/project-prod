import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ProfileCard.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Loader } from '@/shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { HStack, WStack } from '@/shared/ui/Stack';
import { Profile } from '../../model/types/profile';
import { Country, CountrySelect } from '@/entities/Country';

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
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
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
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry
  } = props;

  if(isLoading) {
    return (
      <HStack justify={"center"} className={classNames(cls.ProfileCard, {[cls.loading]: true}, [className])}>
        <Loader />
      </HStack>
    )
  }

  if(error) {
    return (
      <HStack justify={"center"} className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={'Произошла ошибка при загрузке профиля'}
          text={'Попробуйте обновить страницу'}
          align={TextAlign.CENTER}
        />
      </HStack>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly
  }

  return (
    <WStack gap="16" max className={classNames(cls.ProfileCard, mods, [className])}>
      {data?.avatar && (
        <HStack max justify={"center"} >
          <Avatar src={data.avatar} />
        </HStack>
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
        data-testid={'ProfileCard.firstname'}
      />
      <Input
        value={data?.lastName} 
        placeholder='Фамилия'
        className={cls.input}
        onChange={onChangeLastName}
        readonly={readonly}
        data-testid={'ProfileCard.lastname'}
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
      <CurrencySelect 
        className={cls.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </WStack>
  )
}