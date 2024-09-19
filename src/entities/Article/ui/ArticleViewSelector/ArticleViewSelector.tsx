import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleViewSelector.module.scss';
import { memo } from 'react';
import { ArticleView } from '../../model/types/article';
import ListIcon from 'shared/assets/icons/list.svg';
import TilesIcon from 'shared/assets/icons/plitka.svg';
import { Button } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (article: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: ListIcon
  },
  {
    view: ArticleView.BIG,
    icon: TilesIcon
  }
]

export const ArticleViewSelector = memo(({ className, view, onViewClick }: ArticleViewSelectorProps) => {

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  }
  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button 
          onClick={onClick(viewType.view)}
          key={viewType.view}
        >
          <Icon 
            Svg={viewType.icon}
            className={classNames('', {[cls.notSelected]: viewType.view !== view})} 
          />
        </Button>
      ))}
    </div>
  )
})