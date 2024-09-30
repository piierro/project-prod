import { useState, useRef, useEffect, useCallback } from 'react';

interface UseModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    animationDelay: number;
}

export function useModal(props: UseModalProps) {
  const {
    isOpen,
    onClose,
    animationDelay
  } = props;
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setisMounted] = useState(false);
  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if(isOpen) {
      setisMounted(true)
    }
  }, [isOpen])

  const close = useCallback(() => {
    if(onClose) {
      setIsClosing(true);
      timeRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, animationDelay)
    }
  }, [onClose, animationDelay])

  const onKeyDown = useCallback((e: KeyboardEvent) =>{
    if(e.key === 'Escape') {
      close()
    }
  }, [close])

  useEffect(() => {
    if(isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])


  return {
    isClosing,
    isMounted,
    close
  }
}