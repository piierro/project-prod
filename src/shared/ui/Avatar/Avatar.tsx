import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Avatar.module.scss';
import { CSSProperties, useMemo } from 'react';
import { AppImage } from '../AppImage';
import UserIcon from '@/shared/assets/icons/icon-user.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = ({ className, src, size = 100, alt }: AvatarProps) => {
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    }
  }, [size])

  const errorFallback = <Icon Svg={UserIcon} width={45} height={45}/>
  const fallback = <Skeleton width={45} height={45} border='50%'/>
  return (
    <AppImage 
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, {}, [className])}
      errorFallback={errorFallback}
      fallback={fallback}
    />
  )
}