import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ScrollSaveUISchema } from '../types/scrollSaveUI';

const initialState: ScrollSaveUISchema = {
  scroll: {}
};

export const scrollSaveSlice = createSlice({
  name: 'scrollSave',
  initialState,
  reducers: {
    setScrollPosition: (state, { payload }: PayloadAction<{path: string, position: number}>) => {
      state.scroll[payload.path] = payload.position
    }
  }
})

export const { actions: scrollSaveActions} = scrollSaveSlice;
export const { reducer: scrollSaveReducer} = scrollSaveSlice;