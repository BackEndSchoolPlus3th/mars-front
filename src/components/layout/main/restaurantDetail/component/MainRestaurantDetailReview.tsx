import React, { useState, useEffect } from 'react';
import { Review } from '../../../../../api/types';
import ReviewSearch from './ReviewSearch';
import { searchReviews } from '../../../../../api/services/reviewService';

interface MainRestaurantDetailReviewProps {
  restaurantReviews: Review[];
  showAddReview: (show: boolean) => void;
  restaurantId: number;
}

const MainRestaurantDetailReview: React.FC<MainRestaurantDetailReviewProps> = ({
  restaurantReviews,
  showAddReview,
  restaurantId
}) => {
  const [reviews, setReviews] = useState<Review[]>(restaurantReviews);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (keyword: string) => {
    setSearchTerm(keyword);
    
    if (!keyword.trim()) {
      setReviews(restaurantReviews);
      setIsSearching(false);
      return;
    }
  
    setIsSearching(true);
    try {
      const searchResults = await searchReviews(keyword);
      console.log('Search results:', searchResults); // 결과 확인용 로깅
      
      // 백엔드에서 필터링된 결과를 직접 사용
      setReviews(searchResults);
    } catch (error) {
      console.error('Error searching reviews:', error);
      setReviews([]);
    } finally {
      setIsSearching(false);
    }
  };

  // restaurantReviews가 변경될 때 검색어가 없는 경우에만 리뷰 목록 업데이트
  useEffect(() => {
    if (!searchTerm) {
      setReviews(restaurantReviews);
    }
  }, [restaurantReviews, searchTerm]);

  return (
    <div className="space-y-4">
      <ReviewSearch onSearch={handleSearch} />
      
      {isSearching ? (
        <div className="text-center py-4">검색 중...</div>
      ) : (
        <>
          {reviews.length === 0 ? (
            <div className="text-center text-gray-500">
              {searchTerm ? '검색 결과가 없습니다.' : '등록된 리뷰가 없습니다.'}
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{review.name}</span>
                    <span className="text-orange-500">★ {review.rate}</span>
                  </div>
                  <p className="text-gray-600">{review.body}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      <button
        onClick={() => showAddReview(true)}
        className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        리뷰 작성하기
      </button>
    </div>
  );
};

export default MainRestaurantDetailReview;