import { Star } from "lucide-react";

const Sidebar = ({ selectedRestaurant }: { selectedRestaurant: any }) => {
  if (!selectedRestaurant) return null;

  return (
    <div className="w-1/4 bg-orange-200 text-gray-900 p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">{selectedRestaurant.name}</h2>
      <img
        src={selectedRestaurant.imageUrl}
        alt={selectedRestaurant.name}
        className="w-full h-48 object-cover mb-4 rounded-lg"
      />
      <p className="text-gray-700">{selectedRestaurant.details}</p>

      <div className="mt-2">
        <p className="font-semibold">📞 연락처:</p>
        <p>{selectedRestaurant.contact}</p>
      </div>

      <div className="flex items-center mt-2">
        <Star className="text-orange-400" size={16} />
        <span className="ml-1 text-sm">{selectedRestaurant.averageRate.toFixed(1)}</span>
      </div>
      <p className="mt-2 text-sm italic text-gray-600">{selectedRestaurant.summarizedReview}</p>

      <h3 className="text-lg font-semibold mt-4">🍽 카테고리</h3>
      <p>{selectedRestaurant.categoryName}</p>

      <h3 className="text-lg font-semibold mt-4">📌 메뉴</h3>
      <ul>
        {selectedRestaurant.menus.map((menu: any) => (
          <li key={menu.name} className="flex items-center mt-2">
            <img src={menu.imageUrl} alt={menu.name} className="w-10 h-10 object-cover rounded-md mr-2" />
            {menu.name} - {menu.price.toLocaleString()}원
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-4">🕒 영업 시간</h3>
      <ul>
        {selectedRestaurant.businessHours.map((hour: any) => (
          <li key={hour.dayOfWeek}>
            {`요일 ${hour.dayOfWeek}: ${hour.openTime} - ${hour.closeTime}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
