import { ProfileSchema } from '../types/profile';
import { profileActions, profileReducer } from './ProfileSlice';

const data = {
  first: "Kuros",
  lastName: "M",
  age: 23,
  city: "Moscow",
  username: "admin",
}

describe('ProfileSlice', () => {
  test('should set readonly state', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false}
    expect(profileReducer(
        state as ProfileSchema,
        profileActions.setReadonly(true)
    )).toEqual({ readonly: true })
  });

//     test('should cancel edit and reset errors', () => {
//     const state: DeepPartial<ProfileSchema> = {data, form: {username: ''}}
//     expect(profileReducer(
//         state as ProfileSchema,
//         profileActions.cancelEdit()
//     )).toEqual({ 
//         readonly: true,
//         validateErrors: undefined,
//         data,
//         from: data
//      })
//   });
});
