import { validateProfileData } from './validateProgileData';
import { ValidateProfileError } from '../../types/profile';

const data = {
  first: "Kuros",
  lastName: "M",
  age: 23,
  city: "Moscow",
  username: "admin",
}

describe('validateProfileData.test', () => {
//   test('sucsess', async () => {
//     const result = validateProfileData(data);

//     expect(result).toEqual([]);
//   })

//   test('without firstnamr and lastname', () => {
//     const result = validateProfileData({...data, lastName: '', first: ''});

//     expect(result).toEqual([
//         ValidateProfileError.INCORRECT_USER_DATA
//     ]);
//   })

//  test('incorrect age', async () => {
//     const result = validateProfileData({...data, age: undefined});

//     expect(result).toEqual([
//         ValidateProfileError.INCORRECT_AGE
//     ]);
  })

  test('incorrect country', async () => {
    const result = validateProfileData({...data, country: undefined});

    expect(result).toEqual([
        ValidateProfileError.INCORRECT_COUNTRY
    ]);
  })

//   test('incorrect all', async () => {
//     const result = validateProfileData({});

//     expect(result).toEqual([
//         ValidateProfileError.INCORRECT_COUNTRY,
//         ValidateProfileError.INCORRECT_AGE,
//         ValidateProfileError.INCORRECT_USER_DATA
//     ]);
//   })
// })