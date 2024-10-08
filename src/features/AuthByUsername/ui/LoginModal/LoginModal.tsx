import { Modal } from '@/shared/ui/Modal';
import { Suspense } from 'react';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { Loader } from '@/shared/ui/Loader';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({isOpen, onClose}: LoginModalProps) => {
 
  return (
    <Modal isOpen={isOpen} onClose={onClose} lazy>
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccsess={onClose}/>
      </Suspense>
    </Modal>
  )
}