import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
// import * as cls from './ArticleImageBlockComponent.module.scss'

interface ArticleImageBlockComponentProps {
    className?: string;
}

export const ArticleImageBlockComponent = memo(({className}: ArticleImageBlockComponentProps) => {
  return (
   <div className={classNames('', {}, [className])}>
    ArticleImageBlockComponent
   </div>
  )
})