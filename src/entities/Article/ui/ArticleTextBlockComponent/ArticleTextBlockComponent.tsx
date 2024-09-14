import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
// import * as cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
    className?: string;
}

export const ArticleTextBlockComponent = memo(({className}: ArticleTextBlockComponentProps) => {
  return (
    <div className={classNames('', {}, [className])}>
      ArticleTextBlockComponent
    </div>
  )
})