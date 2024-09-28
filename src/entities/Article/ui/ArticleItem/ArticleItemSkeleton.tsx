import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Card } from '@/shared/ui/Card/Card';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import * as cls from './ArticleItem.module.scss'
import { ArticleView } from '../../model/consts/articleConsts';


interface ArticleItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleItemSkeleton = memo(({ className, view}: ArticleItemSkeletonProps) => {

  if (view === ArticleView.BIG) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <Skeleton width={40} height={40} border={'50%'} />
            <Skeleton width={150} height={16}  className={cls.username}/>
            <Skeleton width={150} height={16} className={cls.data}/>
          </div>
          <Skeleton width={250} height={24} className={cls.title}  />
          <Skeleton height={200} className={cls.img}/>
          <div className={cls.footer}>
            <Skeleton  height={36} width={200} />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={classNames('', {}, [className, cls[view]])}>
      <Card>
        <div className={cls.imageWrapper}>
          <Skeleton width={200} height={200}  className={cls.img}/>
        </div>
        <div className={cls.infoWrapper}>
          <Skeleton width={130} height={16} className={cls.types} />
        </div>
        <Skeleton width={150} height={16} className={cls.title}/>
      </Card>
    </div>
  )
})