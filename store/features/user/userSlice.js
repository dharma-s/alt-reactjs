import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupSuccess: false
};

const userSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        signupSuccess: (state) => {
            state.signupSuccess = true
        },
    },
});

const { reducer, actions } = userSlice;

// export const { signupSuccess } = actions;
export default reducer;