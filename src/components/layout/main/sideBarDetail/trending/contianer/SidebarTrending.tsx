import React, { useEffect, useState } from 'react';
import RestaurantCard from '../../search/entity/card/RestaurantCard';

const SidebarTrending: React.FC = () => {
    const [restaurantCards, setRestaurantCards] = useState([
        {
            id: 0,
            name: 'test',
            image: 'https://via.placeholder.com/300',
            address: '서울시 강남구',
            rating: 4.5,
            reviewCount: 10,
            price: 2000,
        },
    ]);

    useEffect(() => {
        setRestaurantCards([
            {
                id: 1,
                name: '맛집1',
                image: 'https://via.placeholder.com/300',
                address: '서울시 강남구',
                rating: 4.5,
                reviewCount: 10,
                price: 2000,
            },
            {
                id: 2,
                name: '맛집2',
                image: 'https://via.placeholder.com/300',
                address: '서울시 강남구',
                rating: 4.3,
                reviewCount: 15,
                price: 3000,
            },
            {
                id: 3,
                name: '맛집3',
                image: 'https://via.placeholder.com/300',
                address: '서울시 강남구',
                rating: 4.1,
                reviewCount: 20,
                price: 4000,
            },
            {
                id: 4,
                name: '맛집4',
                image: 'https://via.placeholder.com/300',
                address: '서울시 강남구',
                rating: 3.9,
                reviewCount: 25,
                price: 4000,
            },
            {
                id: 5,
                name: '맛집5',
                image: 'https://via.placeholder.com/300',
                address: '서울시 강남구',
                rating: 4.7,
                reviewCount: 30,
                price: 4000,
            },
            {
                id: 5,
                name: '맛집5',
                image: 'https://via.placeholder.com/300',
                address: '서울시 강남구',
                rating: 4.7,
                reviewCount: 30,
                price: 4000,
            },
            {
                id: 5,
                name: '맛집5',
                image: 'https://via.placeholder.com/300',
                address: '서울시 강남구',
                rating: 4.7,
                reviewCount: 30,
                price: 4000,
            },
            {
                id: 5,
                name: '맛집5',
                image: 'https://via.placeholder.com/300',
                address: '서울시 강남구',
                rating: 4.7,
                reviewCount: 30,
                price: 4000,
            },
            {
                id: 5,
                name: '맛집5',
                image: 'https://via.placeholder.com/300',
                address: '서울시 강남구',
                rating: 4.7,
                reviewCount: 30,
                price: 4000,
            },
            {
                id: 5,
                name: '맛집5',
                image: 'https://via.placeholder.com/300',
                address: '서울시 강남구',
                rating: 4.7,
                reviewCount: 30,
                price: 4000,
            },
        ]);
    }, []);

    return (
        <div className="flex flex-col w-full h-full max-h-full">
            <div className="divide-y divide-gray-100 overflow-y-auto max-h-190">
                {restaurantCards?.map((restaurantCard) => (
                    <RestaurantCard
                        key={restaurantCard.id}
                        image={restaurantCard.image}
                        name={restaurantCard.name}
                        address={restaurantCard.address}
                        rating={restaurantCard.rating}
                        reviewCount={restaurantCard.reviewCount}
                        price={restaurantCard.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default SidebarTrending;
