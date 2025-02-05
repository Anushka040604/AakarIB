import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api.js';

export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async () => {
    const response = await api.get('/employee/fetchEmployees');
    return response.data.data.result;
})

export const addEmployee = createAsyncThunk('employee/addEmployee', async (employee) => {
    console.log(employee);
    const response = await api.post('/employee/addEmployee', employee);
    return response.data.data.result;
})

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })
    },
});

export default employeeSlice.reducer;
