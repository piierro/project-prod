import { classNames } from '@/shared/lib/classNames/classNames';
// import * as cls from './ReitingCard.module.scss'
import { memo, useCallback, useState } from 'react';
import { Card } from '@/shared/ui/Card/Card';
import { HStack, WStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { StarsRating } from '@/shared/ui/StarsRating/StarsRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, SizeButton, ThemeButton } from '@/shared/ui/Button/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface ReitingCardProps {
  className?: string;
  title?: string;
  feedBackTitle?: string;
  hasFeedBack?: boolean;
  onCancel?: (starCount: number) => void;
  onAccept?: (starCount: number, feedBack?: string) => void;
  rate?: number;
}

export const ReitingCard = memo((props: ReitingCardProps) => {
  const {
    className,
    title,
    feedBackTitle,
    hasFeedBack,
    onAccept,
    onCancel,
    rate = 0
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedBack] = useState('');

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount)
    if(hasFeedBack) {
      setIsModalOpen(true)
    } else {
      onAccept?.(selectedStarsCount)
    }
  }, [hasFeedBack, onAccept])

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback)
  }, [feedback, starsCount, onAccept])

  const cancelHandler = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount)
  }, [starsCount, onCancel])

  const modalContent = (
    <>
      <Text title={feedBackTitle} size={TextSize.M}/>
      <Input 
        value={feedback} 
        onChange={setFeedBack} 
        placeholder='Ваш отзыв' 
      />
    </>
  )

  return (
    <Card className={className} max>
      <WStack align='center' gap='16'>
        <Text title={starsCount ? 'Спасибо за оценку!' : title} />
        <StarsRating selectedStars={starsCount} size={40} onSelect={onSelectStars}/>
      </WStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          {modalContent}
          <WStack max gap='32'>
            <HStack max gap='16' justify='end'>
              <Button 
                theme={ThemeButton.ERROR}
                onClick={cancelHandler}
              >
                Закрыть
              </Button>
              <Button onClick={acceptHandler}>
                Отправить
              </Button>
            </HStack>
          </WStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
          <WStack gap='32'>
            {modalContent}
            <Button 
              onClick={acceptHandler}
              size={SizeButton.L}
              fullWidth
            >
              Отправить
            </Button>
          </WStack>
        </Drawer>
      </MobileView>
    </Card>
  )
})