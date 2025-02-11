import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from '../slice/restaurantSlice';
import userReducer from '../slice/UserSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        restaurant: restaurantReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
