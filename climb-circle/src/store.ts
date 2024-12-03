import {configureStore} from "@reduxjs/toolkit";
import accountReducer from "./Login/reducer";
import postsReducer from "./Home/reducer";

const store = configureStore({
    reducer: {
        accountReducer,
        postsReducer
    }
});

export default store;