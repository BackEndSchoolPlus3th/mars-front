import React, { useEffect } from 'react';
import MenuCard from '../card/MenuCard';

interface MainRestaurantDetailMenuProps {
    restaurantMenus: { imageUrl: string; name: string; price: number }[];
}

const MainRestaurantDetailMenu: React.FC<MainRestaurantDetailMenuProps> = ({
    restaurantMenus,
}) => {
    const [menuList, setMenuList] = React.useState<
        { imageUrl: string; name: string; price: number }[]
    >([]);

    useEffect(() => {
        setMenuList(restaurantMenus);
    }, [restaurantMenus]);

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
