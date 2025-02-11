import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RestaurantSliceProps {
    id: number;
    showRestaurant: boolean;
}

const initialState: RestaurantSliceProps = {
    id: -1,
    showRestaurant: false,
};

const RestaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        selectRestaurant: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
            state.showRestaurant = true;
        },
        closeRestaurant: (state) => {
            state.id = -1;
            state.showRestaurant = false;
        },
    },
});

export const { selectRestaurant, closeRestaurant } = RestaurantSlice.actions;
export default RestaurantSlice.reducer;
