import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
  text: '',
  error: undefined
};

export const AddCommentFormSlice = createSlice({
  name: 'addCommentForm',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    }
  },
})

export const { actions: addCommentFormSActions} = AddCommentFormSlice;
export const { reducer: addCommentFormSReducer} = AddCommentFormSlice;