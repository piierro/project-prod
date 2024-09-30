import { classNames } from '../../lib/classNames/classNames';
import * as cls from './Code.module.scss'
import { memo, useCallback } from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import CopyIcon from '@/shared/assets/icons/copy.svg';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo(({ className, text }: CodeProps) => {

  const onCopyCode = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button onClick={onCopyCode} className={cls.copy}>
        <Icon Svg={CopyIcon}/>
      </Button>
      <code>
        {text}
      </code>
    </pre>
  )
})