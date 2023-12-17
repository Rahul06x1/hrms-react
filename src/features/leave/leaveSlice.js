import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const saveLeave = createAsyncThunk(
    'leave/saveLeave',
    async (props) => {
        const { empid, reason, date } = props
        const response = await axios.post(`http://127.0.0.1:5000//leave/${empid}`,
            {
                reason: reason,
                date: date
            }
        );
        return response.data;
    }
);


export const leaveSlice = createSlice({
    name: 'leave',
    initialState: {
        leave_status: [],
        loading: false,
    },
    extraReducers(builder) {
        builder
            .addCase(saveLeave.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(saveLeave.fulfilled, (state, action) => {
                state.leave_status = action.payload;
                state.loading = false;
            })
            .addCase(saveLeave.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

// export const getLoading = (state) => state.leave.loading;

export default leaveSlice.reducer