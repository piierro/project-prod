import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './StarsRating.module.scss'
import { memo, useState } from 'react';
import { Icon } from '../Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';

interface StarsRatingProps {
  className?: string;
  onSelect?: (starCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5]

export const StarsRating = memo((
  { className, size =  40, onSelect, selectedStars = 0 }
    : StarsRatingProps) => 
{
  const [currentStarCount, setCurrentStarCount] = useState(selectedStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (starCount: number) => () => {
    if(!isSelected) {
      setCurrentStarCount(starCount)
    }
  }

  const onLeave = () => {
    if(!isSelected) {
      setCurrentStarCount(0)
    }
  }
     
  // механизм замыкания(стрелочная функция которая возвращает стрелочную функцию)
  const onClick = (starCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starCount);
      setCurrentStarCount(starCount);
      setIsSelected(true);
    }
  }

  return (
    <div className={classNames('', {}, [className])}>
      {stars.map((star) => (
        <Icon 
          Svg={StarIcon} 
          key={star}
          className={
            classNames(
              cls.starIcon, 
              {[cls.selected]: isSelected}, 
              [currentStarCount >= star ? cls.hovered : cls.normal]
            )}
          width={size}
          height={size}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(star)}
          onClick={onClick(star)}
        />
      ))}
    </div>
  )
})