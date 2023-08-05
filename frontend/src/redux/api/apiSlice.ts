
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';



const cookie = Cookies.get('refreshToken')

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://bookish-liard.vercel.app/api/v1/",
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
          // const token = cookie
          if (cookie) {
           // include token in req header
            headers.set('authorization', `${cookie}`)  
            return headers
          }
        }
      }),
     tagTypes: ["Books", "Book", "Reviews", "Wishlist", "finishedList","readingList"],
    endpoints:()=>({})
});