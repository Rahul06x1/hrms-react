import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchVcard = createAsyncThunk(
    'vcard/fetchVcard',
    async (empid) => {
        const response = await axios.get(`http://127.0.0.1:5000/vcard/${empid}`);
        return response.data;
    }
);

export const vcardSlice = createSlice({
    name: 'vcard',
    initialState: {
        vcard: [],
        loading: false,
    },
    extraReducers(builder) {
        builder
            .addCase(fetchVcard.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchVcard.fulfilled, (state, action) => {
                state.vcard = action.payload;
                state.loading = false;
            })
            .addCase(fetchVcard.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const getLoading = (state) => state.vcard.loading;

export default vcardSlice.reducer