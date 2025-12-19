import { configureStore } from '@reduxjs/toolkit'
import TodoSlice from '../reducer/TodoSlice'

export const store = configureStore({
    reducer: {
        todo: TodoSlice
    },
})