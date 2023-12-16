import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async () => {
    const response = await axios.get(`http://127.0.0.1:5000/employees`);
    return response.data;
  }
);

export const fetchEmployeeDetail = createAsyncThunk(
  'employee/fetchEmployeeDetail',
  async (empid) => {
    const response = await axios.get(`http://127.0.0.1:5000/employees/${empid}`);
    return response.data;
  }
);

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    employee_detail: [],
    loading: false,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEmployees.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchEmployeeDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeDetail.fulfilled, (state, action) => {
        state.employee_detail = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployeeDetail.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const getLoading = (state) => state.employees.loading;

export default employeeSlice.reducer