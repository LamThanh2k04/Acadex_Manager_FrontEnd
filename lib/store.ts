import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import loadingSlice from './features/loading/loadingSlice'
export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userSlice,
            loading: loadingSlice,
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']