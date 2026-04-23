import { UserInfo } from '@/types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    userInfo: UserInfo | null
}
const initialState: UserState = {
    userInfo: null
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        },
        removeUser: (state) => {
            state.userInfo = null;
        }
    }
});

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer