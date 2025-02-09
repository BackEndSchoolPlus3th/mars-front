import { useRestaurantMenu } from "../../../../../api/services/menuService";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../utils";
import MenuCard from "../card/MenuCard";

const MainRestaurantDetailMenu = () => {
  const restaurantId = useSelector(
    (state: RootState) => state.restaurant.restaurantId
  );

  const { data: menus, isLoading, error } = useRestaurantMenu(restaurantId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;
  if (!menus) return <div>menu not found</div>;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">메뉴</h3>
      <div className="space-y-2">
        {menus && menus.length > 0 ? (
          menus.map((menu) => <MenuCard menu={menu} />)
        ) : (
          <div>메뉴 정보가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MainRestaurantDetailMenu;
