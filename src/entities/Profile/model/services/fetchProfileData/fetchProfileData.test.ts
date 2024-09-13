import { fetchProfileData } from './fetchProfileData';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

const data = {
  first: "Kuros",
  lastName: "M",
  age: 23,
  city: "Moscow",
  username: "admin",
}

describe('fetchProfileData.test', () => {
  test('sucsess profile', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({data: data}));

    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data)
  })

  test('error profile', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({status: 403}))
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
  })
})