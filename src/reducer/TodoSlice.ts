import { createSlice } from '@reduxjs/toolkit'
import { GetTodo, InfoUser } from './api'

interface IImg {
    id: number
    imageName: string
}

interface ITodo {
    id: number
    name: string
    description: string
    isCompleted: boolean
    images: IImg[]
}

interface TodoState {
    data: ITodo[]
    info: null
}

const initialState: TodoState = {
    data: [],
    info: null,
}

export const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetTodo.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(InfoUser.fulfilled, (state, action) => {
            state.info = action.payload
        })
    }
})

export default TodoSlice.reducer
