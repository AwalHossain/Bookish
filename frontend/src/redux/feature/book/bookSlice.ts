import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../api/types";




interface IWishlistState {
    wishlist: IBook[] | null;
    readingList: IBook[] | null;
    finishedList: IBook[] | null;
  } 

 const initialState: IWishlistState = {
    wishlist: [],
    readingList: [],
    finishedList: []
  }
  
  export const bookSlice = createSlice({
    initialState,
    name: 'bookSlice',
    reducers: {
        setFinishedList: (state, action) => {
            state.finishedList = action.payload
        },
        setWishList : (state, action) => {
            state.wishlist = action.payload
        },
        setReadingList: (state, action) => {
            state.readingList = action.payload
        },

    }

})

export const {setWishList, setReadingList, setFinishedList} = bookSlice.actions

export default bookSlice.reducer