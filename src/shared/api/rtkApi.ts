import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localSrorage';

export const rtkApi = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: __API__,
    prepareHeaders: headers => {
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
      if(token) {
        headers.set('Authorization', token)
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({})
})

// export const { } = rtkApi