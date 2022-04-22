import { createSlice } from "@reduxjs/toolkit";

interface TypeState {
    accessToken: string;
    isAuthorized: boolean;
    user: any;
}
const initialState: TypeState = {
        accessToken: "",
        isAuthorized: false,
        user: {},
};
export const authSlice= createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthorized = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
    },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;



