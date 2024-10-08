import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProfileSchema } from '../types/editableProfileCardSchema';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { upDateProfileData } from '../services/upDateProfileData/upDateProfileData';
import { Profile } from '@/entities/Profile';

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
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload
    },
    cancelEdit: (state) => {
      state.readonly = true;
      state.form = state.data;
      state.validateErrors = undefined;
    },
    upDateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.data,
        ...action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.form = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(upDateProfileData.pending, (state) => {
        state.isLoading = true;
        state.validateErrors = undefined;
      })
      .addCase(upDateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.form = action.payload;
        state.readonly = true;
        state.validateErrors = undefined;
      })
      .addCase(upDateProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload;
      })
  }
})

export const { actions: profileActions} = ProfileSlice;
export const { reducer: profileReducer} = ProfileSlice;