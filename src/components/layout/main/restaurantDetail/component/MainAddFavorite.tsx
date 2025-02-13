import React, { useEffect, useState } from 'react';
import favoriteService from '../../../../../api/services/favoriteService';
import { FavoriteList } from '../../sideBarDetail/favorites/entity/prop/FavoriteProps';
import { X, Trash } from 'lucide-react'; // 🗑️ 삭제 아이콘 추가

interface MainAddFavoriteProps {
    restaurantId: number; // 선택된 식당의 ID
    showAddFavorite: (show: boolean) => void; // 찜 리스트 모달 닫기 함수
}

const MainAddFavorite: React.FC<MainAddFavoriteProps> = ({
    restaurantId,
    showAddFavorite,
}) => {
    const [favorites, setFavorites] = useState<FavoriteList[]>([]); // 찜 리스트 상태
    const [newFavoriteName, setNewFavoriteName] = useState(''); // 새로운 찜 리스트 이름
    const [isPublic, setIsPublic] = useState(true); // 공개 여부 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태

    useEffect(() => {
        fetchFavorites(); // 컴포넌트 마운트 시 찜 리스트 가져오기
    }, []);

    // 📌 찜 리스트 가져오기
    const fetchFavorites = async () => {
        try {
            setIsLoading(true);
            const data = await favoriteService.getFavorites();
            setFavorites(data || []);
        } catch (error) {
            console.error('❌ 찜 리스트 가져오기 실패:', error);
            setFavorites([]);
        } finally {
            setIsLoading(false);
        }
    };

    // 📌 새로운 찜 리스트 생성
    const createFavoriteList = async () => {
        if (!newFavoriteName.trim()) {
            alert('찜 리스트 이름을 입력해주세요.');
            return;
        }

        try {
            setIsLoading(true);
            console.log(
                '✅ 찜 리스트 생성 요청:',
                newFavoriteName,
                '공개 여부:',
                isPublic,
            );

            await favoriteService.createFavoriteList(newFavoriteName, isPublic);

            await new Promise((resolve) => setTimeout(resolve, 500)); // 서버 응답 대기
            setNewFavoriteName(''); // 입력값 초기화
            setIsPublic(true);
            await fetchFavorites(); // 찜 리스트 다시 불러오기
        } catch (error) {
            console.error('❌ 찜 리스트 생성 실패:', error);
            alert('찜 리스트 생성에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 📌 찜 리스트에 식당 추가
    const fetchAddFavorite = async (favoriteId: number) => {
        try {
            console.log(
                `✅ 찜 리스트(${favoriteId})에 식당(${restaurantId}) 추가 요청`,
            );
            await favoriteService.addRestaurantToFavorite(
                favoriteId,
                restaurantId,
            );

            await new Promise((resolve) => setTimeout(resolve, 500));
            alert('✅ 찜 리스트에 추가되었습니다!');
            console.log(
                '✅ 찜 리스트 생성 요청:',
                newFavoriteName,
                '공개 여부:',
                isPublic,
            );
            showAddFavorite(false);
            await fetchFavorites();
        } catch (error) {
            console.error('❌ 찜 리스트 추가 실패:', error);
            alert('찜 리스트 추가에 실패했습니다.');
        }
    };

    // 📌 찜 리스트 삭제
    const fetchDeleteFavorite = async (favoriteId: number) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            console.log(`🗑️ 찜 리스트(${favoriteId}) 삭제 요청`);
            await favoriteService.deleteFavorite(favoriteId);

            await new Promise((resolve) => setTimeout(resolve, 500));
            alert('🗑️ 찜 리스트가 삭제되었습니다!');
            await fetchFavorites();
        } catch (error) {
            console.error('❌ 찜 리스트 삭제 실패:', error);
            alert('찜 리스트 삭제에 실패했습니다.');
        }
    };

    // 📌 모달 닫기
    const handleClose = () => {
        showAddFavorite(false);
    };

    return (
        <div className="flex flex-col w-full p-2 ring-1 ring-orange-500 rounded-lg">
            {/* 닫기 버튼 */}
            <div className="flex justify-end">
                <button
                    onClick={handleClose}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors m-1"
                >
                    <X size={20} className="text-gray-500" />
                </button>
            </div>

            {/* 찜 리스트 목록 */}
            {isLoading ? (
                <div>로딩 중...</div>
            ) : (
                <div className="max-h-60 overflow-y-auto">
                    {favorites.length > 0 ? (
                        favorites.map((favorite) => (
                            <div
                                key={favorite.id}
                                className="p-2 border rounded-lg mb-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
                            >
                                <div
                                    onClick={() =>
                                        fetchAddFavorite(favorite.id)
                                    }
                                >
                                    <h4 className="text-lg font-semibold">
                                        {favorite.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {favorite.restaurantLists.length}개
                                        저장됨
                                    </p>
                                </div>

                                {/* 🗑️ 삭제 버튼 */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // 리스트 추가 이벤트 방지
                                        fetchDeleteFavorite(favorite.id);
                                    }}
                                    className="p-1 rounded-full hover:bg-red-100 transition"
                                >
                                    <Trash size={20} className="text-red-500" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">찜 리스트가 없습니다.</p>
                    )}
                </div>
            )}

            {/* 새로운 찜 리스트 추가 */}
            <div className="flex flex-col mt-4">
                <input
                    type="text"
                    placeholder="새로운 찜 리스트 추가"
                    value={newFavoriteName}
                    onChange={(e) => setNewFavoriteName(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                />

                {/* 공개/비공개 선택 */}
                <div className="flex items-center mt-2">
                    <input
                        type="checkbox"
                        id="isPublic"
                        checked={isPublic}
                        onChange={() => setIsPublic(!isPublic)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label
                        htmlFor="isPublic"
                        className="ml-2 text-sm text-gray-700"
                    >
                        공개 리스트로 설정
                    </label>
                </div>

                {/* 추가 버튼 */}
                <button
                    onClick={createFavoriteList}
                    className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                    disabled={isLoading}
                >
                    추가
                </button>
            </div>
        </div>
    );
};

export default MainAddFavorite;
