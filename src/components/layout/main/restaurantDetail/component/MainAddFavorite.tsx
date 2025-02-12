import React, { useEffect, useState } from 'react';
import favoriteService from '../../../../../api/services/favoriteService';
import { FavoriteList } from '../../sideBarDetail/favorites/entity/prop/FavoriteProps';
import { X } from 'lucide-react';

interface MainAddFavoriteProps {
    restaurantId: number;  // 선택된 식당의 ID
    showAddFavorite: (show: boolean) => void;  // 찜 리스트 추가 모달을 열거나 닫는 함수
}

const MainAddFavorite: React.FC<MainAddFavoriteProps> = ({
    restaurantId,
    showAddFavorite,
}) => {
    const [favorites, setFavorites] = useState<FavoriteList[]>([]);  // 찜 리스트 상태
    const [newFavoriteName, setNewFavoriteName] = useState("");  // 새로운 찜 리스트 이름 입력
    const [isLoading, setIsLoading] = useState(false);  // 로딩 상태

    useEffect(() => {
        fetchFavorites();  // 컴포넌트가 마운트될 때 찜 리스트 가져오기
    }, []);

    // 📌 찜 리스트 가져오기
    const fetchFavorites = async () => {
        try {
            setIsLoading(true);
            const data = await favoriteService.getFavorites();  // 찜 리스트 API 호출
            setFavorites(data || []);
        } catch (error) {
            console.error("❌ 찜 리스트 가져오기 실패:", error);
            setFavorites([]);
        } finally {
            setIsLoading(false);
        }
    };

    // 📌 새로운 찜 리스트 생성
    const createFavoriteList = async () => {
        if (!newFavoriteName.trim()) {
            alert("찜 리스트 이름을 입력해주세요.");
            return;
        }
    
        try {
            setIsLoading(true);
            console.log("✅ 찜 리스트 생성 요청:", newFavoriteName);
    
            const payload = { 
                name: newFavoriteName,
                isPublic: true  // 공개 여부 설정
            };
    
            await favoriteService.createFavoriteList(payload.name, payload.isPublic);
    
            await new Promise((resolve) => setTimeout(resolve, 500));
            setNewFavoriteName("");  // 입력값 초기화
            await fetchFavorites();  // 찜 리스트 다시 불러오기
        } catch (error) {
            console.error("❌ 찜 리스트 생성 실패:", error);
            alert("찜 리스트 생성에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    // 📌 찜 리스트에 식당 추가
    const fetchAddFavorite = async (favoriteId: number) => {
        try {
            console.log(`✅ 찜 리스트(${favoriteId})에 식당(${restaurantId}) 추가 요청`);
            await favoriteService.addRestaurantToFavorite(favoriteId, restaurantId);  // 찜 리스트에 식당 추가 API 호출

            await new Promise((resolve) => setTimeout(resolve, 500));  // 지연 처리
            alert("✅ 찜 리스트에 추가되었습니다!");
            await fetchFavorites();  // 찜 리스트 새로 고침
        } catch (error) {
            console.error("❌ 찜 리스트 추가 실패:", error);
            alert("찜 리스트 추가에 실패했습니다.");
        }
    };

    // 📌 모달 닫기
    const handleClose = () => {
        showAddFavorite(false);  // 부모 컴포넌트에게 모달을 닫도록 알림
    };

    return (
        <div className="flex flex-col w-full p-2 ring-1 ring-orange-500 rounded-lg">
            <div className="flex justify-end">
                <button
                    onClick={handleClose}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors m-1"
                >
                    <X size={20} className="text-gray-500" />
                </button>
            </div>
            {isLoading ? (
                <div>로딩 중...</div>  // 로딩 중일 때 메시지
            ) : (
                <>
                    {favorites.length > 0 ? (
                        favorites.map((favorite) => (
                            <div
                                key={favorite.id}
                                className="p-2 border rounded-lg mb-4 cursor-pointer"
                                onClick={() => fetchAddFavorite(favorite.id)}  // 찜 리스트 클릭 시 식당 추가
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-lg font-semibold">{favorite.name}</h4>
                                    <p>{favorite.restaurantLists.length}개 저장됨</p>  // 찜 리스트에 저장된 식당 개수
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">찜 리스트가 없습니다.</p>  // 찜 리스트가 없을 경우 메시지
                    )}
                </>
            )}
            <div className="flex items-center mt-4">
                <input
                    type="text"
                    placeholder="새로운 찜 리스트 추가"
                    value={newFavoriteName}
                    onChange={(e) => setNewFavoriteName(e.target.value)}  // 찜 리스트 이름 입력 처리
                    className="w-full pl-3 pr-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                />
                <button
                    onClick={createFavoriteList}  // 새로운 찜 리스트 생성
                    className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                    disabled={isLoading}
                >
                    추가
                </button>
            </div>
        </div>
    );
};

export default MainAddFavorite;
