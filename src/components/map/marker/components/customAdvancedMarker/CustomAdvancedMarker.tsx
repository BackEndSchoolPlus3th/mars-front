import React, { FunctionComponent, useState } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import classNames from 'classnames';

import { RealEstateListingDetails } from '../realEstateListingDetails/RealEstateListingDetails';
import { RealEstateGallery } from '../realEstateGallery/RealEstateGallery';
import { Heart } from 'lucide-react';

import './CustomAdvancedMarker.css';
import { RestaurantDetail } from '../../../../../api/types';

interface Props {
    restaurant: RestaurantDetail;
}

export const CustomAdvancedMarker: FunctionComponent<Props> = ({
    restaurant,
}) => {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const position = {
        lat: restaurant.lat,
        lng: restaurant.lng,
    };

    const renderCustomPin = () => {
        return (
            <>
                <div className="custom-pin">
                    <button className="close-button">
                        <span className="material-symbols-outlined">
                            {' '}
                            close{' '}
                        </span>
                    </button>

                    <div className="image-container">
                        <RealEstateGallery
                            images={[restaurant.imageUrl]}
                            isExtended={clicked}
                        />
                        <span className="icon">
                            <Heart />
                        </span>
                    </div>

                    <RealEstateListingDetails restaurant={restaurant} />
                </div>

                <div className="tip" />
            </>
        );
    };

    return (
        <>
            <AdvancedMarker
                position={position}
                title={'AdvancedMarker with custom html content.'}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={classNames('real-estate-marker', {
                    clicked,
                    hovered,
                })}
                onClick={() => setClicked(!clicked)}
            >
                {renderCustomPin()}
            </AdvancedMarker>
        </>
    );
};
