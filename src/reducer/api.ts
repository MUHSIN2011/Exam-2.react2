import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = import.meta.env.VITE_URL_API;
export const imageApi = import.meta.env.VITE_URL_API_IMAGE;


export const GetTodo = createAsyncThunk('todo/GetTodo', async () => {
    try {
        const { data } = await axios.get(api)
        return data.data
    } catch (error) {
        console.error(error);
    }
})


export const DeleteUser = createAsyncThunk('todo/DeleteUser', async (id, { dispatch }) => {
    try {
        await axios.delete(`${api}?id=${id}`)
        dispatch(GetTodo())
    } catch (error) {
        console.error(error);
    }
})

export const DeleteUserImg = createAsyncThunk('todo/DeleteUserImg', async (id, { dispatch }) => {
    try {
        await axios.delete(`${api}/images/${id}`)
        dispatch(GetTodo())
    } catch (error) {
        console.error(error);
    }
})

export const addNewUser = createAsyncThunk('todo/addNewUser', async (newUser, { dispatch }) => {
    try {
        await axios.post(api, newUser)
        dispatch(GetTodo())
    } catch (error) {
        console.error(error);
    }
})

export const EditUser = createAsyncThunk('todo/EditUser', async (EditUs, { dispatch }) => {
    try {
        await axios.put(api, EditUs)
        dispatch(GetTodo())
    } catch (error) {
        console.error(error);
    }
})

export const EditCheck = createAsyncThunk('todo/EditCheck', async (id, { dispatch }) => {
    try {
        await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`)
        dispatch(GetTodo())
    } catch (error) {
        console.error(error);
    }
})

export const AddNewUserImg = createAsyncThunk('todo/AddNewUserImg', async ({ id, formdata }: { id: number; formdata: FormData }, { dispatch }) => {
    try {
        await axios.post(`${api}/${id}/images`, formdata);
        dispatch(GetTodo());
    } catch (error) {
        console.error(error);
    }
}
);



export const InfoUser = createAsyncThunk('todo/InfoUser', async (id) => {
    try {
        const { data } = await axios.get(`${api}/${id}`)
        return data
    } catch (error) {
        console.error(error)
    }
}
)

