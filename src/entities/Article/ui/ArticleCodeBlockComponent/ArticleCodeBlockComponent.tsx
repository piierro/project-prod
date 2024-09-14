import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
// import * as cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
    className?: string;
}

export const ArticleCodeBlockComponent = memo(({className}: ArticleCodeBlockComponentProps) => {
  return (
    <div className={classNames('', {}, [className])}>
      ArticleCodeBlockComponent
    </div>
  )
})