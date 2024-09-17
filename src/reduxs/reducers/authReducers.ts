import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    id: string,
    email: string,
    fullname: string,
}

const initialState: AuthState = {
    id: '',
    email: '',
    fullname: '',
   
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action) => {
            state.authData = action.payload;
        },
        removeAuth: (state) => {
            state.authData = initialState;
        },
        
    }
});
export const { addAuth, removeAuth} = authSlice.actions;
export const authReducer = authSlice.reducer;
// export const authSelector = (state: any) => state.authReducer.auth;
