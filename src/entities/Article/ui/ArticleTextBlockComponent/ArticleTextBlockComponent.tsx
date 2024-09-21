import { ArticleTextBlock } from '../../model/types/article';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import * as cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(({className, block}: ArticleTextBlockComponentProps) => {
  return (
    <div className={classNames('', {}, [className])}>
      {block.title && (
        <Text 
          title={block.title}
          className={cls.title}
        />
      )}
      {block.paragpaphs.map((paragraph) => (
        <Text 
          key={paragraph}
          text={paragraph}
          className={cls.paragraph}
        />
      ))}
      {block.img && (
        <img src={block.img} className={cls.img} alt={block.title} />
      )}
    </div>
  )
})