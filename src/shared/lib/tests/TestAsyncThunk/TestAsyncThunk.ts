import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';

// ДЛЯ ТЕСТИРОВАНИЯ АСИНХРОННЫХ ФАНКОВ

type ActionCreatorType<Return, Arg, RejectValue> 
= (arg: Arg) => AsyncThunkAction<Return, Arg, {rejectValue: RejectValue}>

jest.mock('axios');

const mockedAxios = jest.mocked(axios)

export class TestAsyncThunk<Return, Arg, ThunkConfig> {
  dispatch: jest.MockedFn<any>;
  getState: () => StateSchema;
  actionCreator: ActionCreatorType<Return, Arg, ThunkConfig>;

  api: jest.MockedFunctionDeep<AxiosStatic>;
  navigate: jest.MockedFn<any>;

  constructor(actionCreator: ActionCreatorType<Return, Arg, ThunkConfig>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();

    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(
      this.dispatch,
      this.getState,
      {api: this.api, navigate: this.navigate} 
    );

    return result;
  }
}