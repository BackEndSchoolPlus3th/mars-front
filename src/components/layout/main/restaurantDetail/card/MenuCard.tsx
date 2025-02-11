import { Menu } from "../../../../../api/types";

interface MenuCardProps {
  menu: Menu;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu }) => {
  return (
    <div key={menu.id} className="flex justify-between">
      <img
        src={menu.imageUrl}
        alt={menu.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <span>{menu.name}</span>
      <span className="text-orange-500">₩{menu.price.toLocaleString()}</span>
    </div>
  );
};

export default MenuCard;
