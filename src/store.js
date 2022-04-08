import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./utils/authSlice";
import searchReducer from "./searchSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
    },
});
