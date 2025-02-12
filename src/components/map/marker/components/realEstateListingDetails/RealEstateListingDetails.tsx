import React, { FunctionComponent } from 'react';

import './RealEstateListingDetails.css';
import { RestaurantDetail } from '../../../../../api/types';
import { Star, Phone, Clock } from 'lucide-react';

interface Props {
    restaurant: RestaurantDetail;
}

export const RealEstateListingDetails: FunctionComponent<Props> = ({
    restaurant,
}) => {
    return (
        <div className="details-container">
            <div className="listing-content">
                <h2>{restaurant.name}</h2>
                <p>{restaurant.address}</p>
                <div className="details">
                    <div className="detail_item">
                        <span className="flex items-center text-orange-500">
                            <Star size={16} className="mr-1" />
                            {restaurant.averageRate.toFixed(1)}
                        </span>
                    </div>
                    <div className="detail_item">
                        <Phone
                            size={16}
                            className="mr-2 mt-0.5 text-gray-400"
                        />
                        <span>{restaurant.contact}</span>
                    </div>
                    <div className="detail_item">
                        <Clock
                            size={16}
                            className="mr-2 mt-0.5 text-gray-400"
                        />
                        <div>
                            <p>
                                {restaurant.businessHours[0].open} -{' '}
                                {restaurant.businessHours[0].close}
                            </p>
                        </div>
                    </div>
                </div>

                <p className="description">{restaurant.details}</p>
            </div>
        </div>
    );
};
