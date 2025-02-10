import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState {
    restaurantId: number;
    showDetail: boolean;
}

const initialState: RestaurantState = {
    restaurantId: 0,
    showDetail: false,
};

interface RestaurantPayload {
    restaurantId: number;
    showDetail: boolean;
}

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurantId(state, action: PayloadAction<number>) {
            state.restaurantId = action.payload;
        },
        setShowDetail(state, action: PayloadAction<boolean>) {
            state.showDetail = action.payload;
        },
        resetRestaurantState(state) {
            state.restaurantId = initialState.restaurantId;
            state.showDetail = initialState.showDetail;
        },
    },
});

export const { setRestaurantId, setShowDetail, resetRestaurantState } =
    restaurantSlice.actions;
export default restaurantSlice.reducer;
