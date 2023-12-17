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
        leaves_taken: null,
        leaves_remaining: null,

    },
    reducers: {
        incrementLeavesTaken(state) {
            state.leaves_taken++
        },
        decrementLeavesRemaining(state) {
            state.leaves_remaining--
        },
        setInitialLeavesTaken: (state, action) => {
            state.leaves_taken = action.payload;
        },
        setInitialLeavesRemaining: (state, action) => {
            state.leaves_remaining = action.payload;
        },
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
export const { incrementLeavesTaken, decrementLeavesRemaining, setInitialLeavesRemaining, setInitialLeavesTaken } = leaveSlice.actions
export default leaveSlice.reducer