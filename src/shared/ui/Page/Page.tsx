import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Page.module.scss'
import { MutableRefObject, ReactNode, memo, useRef } from 'react';
import { useInfinitScroll } from 'shared/lib/hooks/useInfinitScroll/useInfinitScroll';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfinitScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEnd
  });

  return (
    <section 
      ref={wrapperRef} 
      className={classNames(cls.Page, {}, [className])}
    >
      {children}
      <div ref={triggerRef}/>
    </section>
  )
})