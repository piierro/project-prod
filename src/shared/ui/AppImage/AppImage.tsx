import { ImgHTMLAttributes, ReactElement, memo, useLayoutEffect, useState } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement>{
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
  const { 
    className,
    src,
    alt = 'image',
    fallback,
    errorFallback,
    ...otherProps
  }  = props;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // отрабатывает синхронно перед монтированием,
  // подгрузга изображения начнется до того как у нас
  // отредендерился компонент
  useLayoutEffect(() => {
    const img = new Image();
    img.src = src ?? '';
    img.onload = () => {
      setIsLoading(false);
    }
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    }
  }, [src])

  if(isLoading && fallback) {
    return fallback;
  }

  if(hasError && errorFallback) {
    return errorFallback;
  }
    
  return (
    <img 
      className={className} 
      alt={alt} 
      src={src} 
      {...otherProps} 
    />
  )
  
})