import { createSlice } from '@reduxjs/toolkit';
import { ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    readonly: true,
    error: undefined,
    isLoading: false,
    data: undefined
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  }
})

export const { actions: profileActions} = ProfileSlice;
export const { reducer: profileReducer} = ProfileSlice;