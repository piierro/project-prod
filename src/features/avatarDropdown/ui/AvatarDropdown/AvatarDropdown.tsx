import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './AvatarDropdown.module.scss'
import { memo, useCallback } from 'react';
import { Dropdown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';
import { RoutePath } from '@/shared/const/router';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  const isAdminPanel = isAdmin || isManager;

  if(!authData) {
    return null
  }

  return (
    <Dropdown
      trigger={<Avatar size={50} src={authData?.avatar} />}
      direction={'bottom left'}
      className={classNames(cls.AvatarDropdown, {}, [className])}
      items={[
        {
          content: 'Профиль',
          href: RoutePath.profile + authData?.id
        },
        ...(isAdminPanel ? [{
          content: 'Админка',
          href: RoutePath.admin_panel
        }]: []),
        {
          content: 'Выйти',
          onClick: onLogout
        }
      ]} 
    />
  )
})