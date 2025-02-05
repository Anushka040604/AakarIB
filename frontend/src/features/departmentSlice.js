import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api.js';

export const fetchDepartments = createAsyncThunk('department/fetchDepartments' , async () => {
    
    const response = await api.get('/department/fetchDepartments');
    return response.data.data.result;
})

export const addDepartment = createAsyncThunk('department/addDepartment', async () => {
    const response = await api.get('/department/addDepartment');
    return response.data.data.result;
})

const departmentSlice = createSlice({
    name: 'department',
    initialState: {
        departments: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.departments = action.payload;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addDepartment.fulfilled, (state, action) => {
                state.departments.push(action.payload);
            })
    },
});

export default departmentSlice.reducer;
