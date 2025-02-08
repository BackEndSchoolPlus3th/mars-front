import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState {
    restaurantId: number;
}

const initialState: RestaurantState = {
    restaurantId: 0,
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurantId(state, action: PayloadAction<number>) {
            state.restaurantId = action.payload;
        },
    },
});

export const { setRestaurantId } = restaurantSlice.actions;
export default restaurantSlice.reducer;
