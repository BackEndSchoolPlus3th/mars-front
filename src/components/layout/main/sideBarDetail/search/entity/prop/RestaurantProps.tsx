export default interface RestaurantProps {
  id: number;
  name: string;
  details: string;
  averageRate: number;
  onClick: (id: number) => void;
}
