import {configureStore} from '@reduxjs/toolkit'
import authrReducer from "./authSlice"

const store = configureStore({
    reducer: {
        auth: authrReducer
    }
})

export default store;