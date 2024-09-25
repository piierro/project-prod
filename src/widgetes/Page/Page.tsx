import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Page.module.scss'
import { MutableRefObject, ReactNode, memo, useRef, UIEvent, useEffect } from 'react';
import { useInfinitScroll } from 'shared/lib/hooks/useInfinitScroll/useInfinitScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getScrollByPath, scrollSaveActions } from 'features/ScrollSaveUI';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThtrottle/useThrottle';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector(
    (state: StateSchema) => getScrollByPath(state, pathname)
  );

  useInfinitScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEnd
  });

  useEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  }, [scrollPosition])

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(scrollSaveActions.setScrollPosition({
      position: e.currentTarget.scrollTop,
      path: pathname
    }))
  }, 500)

  return (
    <main 
      ref={wrapperRef} 
      className={classNames(cls.Page, {}, [className])}
      onScroll={onScroll}
    >
      {children}
      {onScrollEnd ? <div className={cls.trigger} ref={triggerRef}/> : null}
    </main>
  )
})