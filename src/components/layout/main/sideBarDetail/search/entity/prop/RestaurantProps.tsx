export default interface RestaurantProps {
    id: number;
    name: string;
    details: string;
    averageRate: number;
    setSelectedRestaurant: (id: number) => void;
    showRestaurantDetail: (show: boolean) => void;
}
