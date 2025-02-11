import React, { useEffect } from 'react';
import { useRestaurantMenu } from '../../../../../api/services/menuService';
import MenuCard from '../card/MenuCard';
import { apiClient } from '../../../../../api';

interface MainRestaurantDetailMenuProps {
    restaurantId: number;
}

const MainRestaurantDetailMenu: React.FC<MainRestaurantDetailMenuProps> = ({
    restaurantId,
}) => {
    const [menuList, setMenuList] = React.useState([]);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await apiClient.get(
                    `/api/v1/menu/showAllMenus`,
                    {
                        params: { restaurant_id: restaurantId },
                    },
                );
                console.log('api menus', response.data.data.menus);
                setMenuList(response.data.data.menus);
                console.log('menuList: ', menuList);
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        };

        fetchMenus();
    }, [restaurantId]);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                {menuList && menuList.length > 0 ? (
                    menuList.map((menu) => (
                        <MenuCard key={menu.id} menu={menu} />
                    ))
                ) : (
                    <div>메뉴 정보가 없습니다.</div>
                )}
            </div>
        </div>
    );
};

export default MainRestaurantDetailMenu;
