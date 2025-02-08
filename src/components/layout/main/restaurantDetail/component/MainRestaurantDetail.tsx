import React, { useState, useEffect } from 'react';
import { apiClient } from '../../../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../utils';
import { useRestaurantDetail } from '../../../../../api/services/restaurantService';

const MainResaturantDetail: React.FC = () => {
    const restaurantId = useSelector(
        (state: RootState) => state.restaurant.restaurantId,
    );
    const {
        data: restaurant,
        isLoading,
        error,
    } = useRestaurantDetail(restaurantId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!restaurant) {
        return <div>No restaurant data available</div>;
    }

    return (
        <div className="flex flex-col">
            <img src={restaurant.imageUrl} alt={restaurant.name} />
            <h1>{restaurant.name}</h1>'
        </div>
    );
};

export default MainResaturantDetail;
