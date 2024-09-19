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
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginByUsername.pending, (state) => {
//         state.isLoading = true;
//         state.error = undefined;
//       })
//       .addCase(loginByUsername.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(loginByUsername.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//   }
})

export const { actions: addCommentFormSActions} = AddCommentFormSlice;
export const { reducer: addCommentFormSReducer} = AddCommentFormSlice;