import {createSlice} from "@reduxjs/toolkit";
import {DEFAULT_USER_ACCOUNT_SLICE} from "../../config/config";

export const accountDetailsSlice = createSlice({
    name: 'accountDetailsSlice',
    initialState: DEFAULT_USER_ACCOUNT_SLICE,
    reducers:{
        loginUser: (state,action) =>  {
            state.isLogged = true;
            state.userDetails = action.payload;
        },
        logout: (state) => {
            state.isLogged = false;
            state.userDetails = DEFAULT_USER_ACCOUNT_SLICE.userDetails;
        }
    }
});


export const accountActions = accountDetailsSlice.actions;