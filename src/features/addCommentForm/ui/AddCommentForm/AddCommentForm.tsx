import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './AddCommentForm.module.scss'
import { memo, useCallback } from 'react';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { 
  DynamicModuleLoader, 
  ReducersList 
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addCommentFormSActions, addCommentFormSReducer } from '../../model/slices/addCommentFormSlice';
import { useSelector } from 'react-redux';
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from 'shared/ui/Stack';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormSReducer
}

const AddCommentForm = memo(({ className, onSendComment }: AddCommentFormProps) => {
  const text = useSelector(getAddCommentFormText);
  // const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormSActions.setText(value));
  }, [dispatch]);

  const onHandlerChange = useCallback(() => {
    onSendComment(text || '')
    onCommentTextChange('')
  }, [onCommentTextChange, onSendComment, text])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <HStack
        max 
        align='center' 
        justify="between" 
        className={classNames(cls.AddCommentForm, {}, [className])}
      >
        <Input
          placeholder="Введите текст комментария"
          value={text}
          onChange={onCommentTextChange}
          className={cls.input}
        />
        <Button
          onClick={onHandlerChange}
        >
          Отправить
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
})

export default AddCommentForm;