import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'logged',
    initialState: localStorage.getItem('user') !== null ? true : false,
    reducers: {
        setIsLogged: (currentValue, {payload}) => payload,
    }
})

export const { setIsLogged } = loginSlice.actions;

export default loginSlice.reducer;