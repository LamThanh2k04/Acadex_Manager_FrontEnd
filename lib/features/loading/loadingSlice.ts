import { createSlice } from '@reduxjs/toolkit'

interface LoadingState {
    isGlobalLoading: boolean;
}

const initialState: LoadingState = {
    isGlobalLoading: false,
}

const loadingSlice = createSlice({
    name: "loadingSlice",
    initialState,
    reducers: {
        setGlobalLoading: (state, action) => {
            state.isGlobalLoading = action.payload;
        }
    }
});

export const { setGlobalLoading } = loadingSlice.actions
export default loadingSlice.reducer