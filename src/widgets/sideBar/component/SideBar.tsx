/* global kakao */
import React, { useState, useEffect } from 'react';

import { useAuth } from '../../../widgets/navigationBar/component/AuthContext';
import { logoPath } from '../../../shared';
import '../ui/SideBarStyle.css';

const Sidebar: React.FC = () => {
  const { email } = useAuth(); // Fetch the email using useAuth hook
  const [keywords, setKeywords] = useState('');
  const [activePanel, setActivePanel] = useState<string>(''); // Tracks active left sidebar panel
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false); // Left sidebar toggle state
  const [detailPanelData, setDetailPanelData] = useState<{ title: string; content: React.ReactNode } | null>(null); // Detail sidebar data
  const [nearbyRestaurants, setNearbyRestaurants] = useState<any[]>([]); // Stores nearby restaurant data
  const [selectedPlace, setSelectedPlace] = useState<any>(null); // Selected restaurant details
  const [isDetailSidebarOpen, setIsDetailSidebarOpen] = useState<boolean>(false); // Open/close detail sidebar
  const [favorites, setFavorites] = useState<any[]>([]); // Stores favorites
  const [reviewer, setReviewer] = useState('');
  
  const [review, setReview] = useState('');
  const [score, setScore] = useState(0); // 리뷰 점수를 상태로 관리
  const [popularKeywords, setPopularKeywords] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState<string>(""); // 검색 키워드 상태
  const [isFavoriteSidebarOpen, setIsFavoriteSidebarOpen] = useState<boolean>(false); // Open/close favorite sidebar
  const [selectedKeyword, setSelectedKeyword] = useState<string>(""); // 선택된 키워드
  const [relatedRestaurants, setRelatedRestaurants] = useState<any[]>([]); // 키워드와 관련된 식당
  const [map, setMap] = useState<any>(null); // 카카오 지도 객체
  const [markers, setMarkers] = useState<any[]>([]); // 지도에 표시된 마커들
  const [userLocation, setUserLocation] = useState<any>(null);
  
  

  // 지도 초기화 및 사용자 현재 위치 가져오기
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=카카오api키&libraries=services`;
    script.async = true;
    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById('map-container');
        const options = {
          center: new kakao.maps.LatLng(37.563522165046, 126.99917408401), // 초기 위치
          level: 3,
        };
        const kakaoMap = new kakao.maps.Map(container, options);
        setMap(kakaoMap);

        // 사용자 현재 위치 가져오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              const userLatLng = new kakao.maps.LatLng(lat, lng);
              setUserLocation(userLatLng);

              // 현재 위치에 마커 표시
              const userMarker = new kakao.maps.Marker({
                position: userLatLng,
                title: '내 위치',
              });
              userMarker.setMap(kakaoMap);
              kakaoMap.setCenter(userLatLng);
            },
            (error) => {
              console.error('위치 정보를 가져오는 데 실패했습니다:', error);
              alert('현재 위치를 가져올 수 없습니다.');
            }
          );
        } else {
          alert('브라우저가 위치 정보를 지원하지 않습니다.');
        }
      });
    };
    document.head.appendChild(script);
  }, []);

  // 지도에 마커 표시
  useEffect(() => {
    if (!map || nearbyRestaurants.length === 0) return;

    // 기존 마커 제거
    markers.forEach((marker) => marker.setMap(null));

    // 새로운 마커 추가
    const newMarkers = nearbyRestaurants.map((restaurant) => {
      const position = new kakao.maps.LatLng(restaurant.latitude, restaurant.longitude);
      const marker = new kakao.maps.Marker({ position });
      marker.setMap(map);

      // 마커 클릭 이벤트
      kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedPlace(restaurant); // 선택된 장소 업데이트
        map.setCenter(position); // 지도 중심 이동
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [map, nearbyRestaurants]);


  // Handles toggling left sidebar panels
  const handleToggleSidebar = (panelName: string) => {
    if (activePanel === panelName) {
      setActivePanel('');
      setIsSidebarActive(false);
    } else {
      setActivePanel(panelName);
      setIsSidebarActive(true);
    }
  };

  // Fetch nearby restaurants
  const fetchNearbyRestaurants = async () => {
    try {
        const lat = 37.5665; // Your latitude
        const lng = 126.9780; // Your longitude
        const response = await fetch(`http://localhost:8080/api/restaurants/nearby?lat=${lat}&lng=${lng}`);
        const data = await response.json();
        console.log("Nearby restaurants:", data); // 응답 데이터 확인
        setNearbyRestaurants(data); // 상태 업데이트
      } catch (error) {
        console.error("Error fetching nearby restaurants:", error);
        alert("주변 식당 정보를 가져오지 못했습니다.");
      }
  };

  // Fetch favorite restaurants
  const fetchFavorites = async () => {
    const response = await fetch(`http://localhost:8080/api/restaurants/mypage/favorites?email=${email}`);
    const data = await response.json();
    setFavorites(data);
  };

  // Open the detail sidebar
  const handleOpenDetailSidebar = async (name: string) => {
    
if (!map) return;

try {
  const response = await fetch(`http://localhost:8080/api/restaurants/detail?name=${name}`);
  const data = await response.json();
  setSelectedPlace(data); // 상세 정보 표시
  setIsDetailSidebarOpen(true);

  // 지도에 마커 찍기
  const position = new kakao.maps.LatLng(data.latitude, data.longitude);
  const marker = new kakao.maps.Marker({
    position,
    title: name,
  });

  // 기존 마커 제거 후 새로운 마커 추가
  markers.forEach((marker) => marker.setMap(null));
  marker.setMap(map);
  setMarkers([marker]);
  map.setCenter(position);
} catch (error) {
  console.error('식당 정보를 가져오는 데 실패했습니다:', error);
  alert('식당 정보를 가져오지 못했습니다.');
}
  };

  // Close the detail sidebar
  const handleCloseDetailSidebar = () => {
    setSelectedPlace(null);
    setIsDetailSidebarOpen(false);
  };

  // 리뷰 저장 함수
  const handleSaveReview = async () => {
    // 디버깅을 위한 로그 출력
    console.log('reviewer:', reviewer);
    console.log('keywords:', keywords);
    console.log('review:', review);
    console.log('score:', score);
    console.log('selectedPlace:', selectedPlace);
  
    if (!reviewer || !keywords || !review || !selectedPlace || !score) {
      alert('모든 항목을 작성해주세요!');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/restaurants/mypage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: { email }, // user 객체에 email을 포함시켜서 전달
          restaurantId: selectedPlace.id,
          reviewer,
          keywords,
          review,
          score,
        }),
      });
  
      if (!response.ok) {
        throw new Error('리뷰 저장 실패');
      }
  
      alert('리뷰가 저장되었습니다!');
      setReviewer('');  // 초기화
      setKeywords('');  // 초기화
      setReview('');    // 초기화
      setScore(5);      // 기본값으로 초기화
    } catch (error) {
      console.error('Error saving review:', error);
      alert('리뷰 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };
  

  

  // Add to favorites
  const handleAddToFavorites = async (restaurantId: string) => {
    const response = await fetch('http://localhost:8080/api/restaurants/mypage/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, restaurantId }),
    });
    const data = await response.json();
    alert(data.message);
  };

  // Fetch top 10 popular keywords
  const fetchKeywords = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/restaurants/keywordtop10');
      const data = await response.json();
      setPopularKeywords(data);  // 상태 업데이트
    } catch (error) {
      console.error('Error fetching keywords:', error);
    }
  };

  // Search for restaurants by keyword
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleKeywordClick = async (keyword: string) => {
    try {
      console.log(`Searching for keyword: ${keyword.trim()}`); // 공백 제거 후 출력
      const response = await fetch(`http://localhost:8080/api/restaurants/search?keyword=${encodeURIComponent(keyword.trim())}`);
      const data = await response.json();
      console.log('Response data:', data); 
  
      if (Array.isArray(data) && data.length > 0) {
        console.log('First restaurant:', data[0]); 
        handleOpenDetailSidebar(data[0].name);
      } else {
        console.warn('No restaurants found for keyword:', keyword);
        alert('해당 키워드와 관련된 맛집이 없습니다.');
      }
    } catch (error) {
      console.error('Error searching restaurants by keyword:', error);
    }
  };
  
  // 검색 API 호출
  const fetchSearchResults = async () => {
    try {
      if (!searchKeyword.trim()) {
        alert("키워드를 입력해주세요!");
        return;
      }
      const response = await fetch(
        `http://localhost:8080/api/restaurants/search?keyword=${encodeURIComponent(
          searchKeyword.trim()
        )}`
      );
      const data = await response.json();
      console.log("Search results:", data); // 검색 결과 로그
      setSearchResults(data); // 검색 결과 상태 업데이트
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("검색 중 오류가 발생했습니다.");
    }
  };

   // 특정 키워드와 관련된 식당 가져오기
   const handleKeywordClicks = async (keyword: string) => {
    try {
      console.log(`Fetching restaurants for keyword: ${keyword}`);
      setSelectedKeyword(keyword); // 선택된 키워드 저장
      const response = await fetch(
        `http://localhost:8080/api/restaurants/search?keyword=${encodeURIComponent(
          keyword.trim()
        )}`
      );
      const data = await response.json();
      console.log("Restaurants related to keyword:", data);
      setRelatedRestaurants(data); // 관련 식당 상태 업데이트
    } catch (error) {
      console.error("Error fetching restaurants by keyword:", error);
      alert("관련 식당 정보를 가져오는 데 실패했습니다.");
    }
  };

  

  // Open favorite sidebar
  const handleOpenFavoriteSidebar = () => {
    setIsFavoriteSidebarOpen(true);
    fetchFavorites();
  };

  // Handle closing favorite sidebar
  const handleCloseFavoriteSidebar = () => {
    setIsFavoriteSidebarOpen(false);
  };

  useEffect(() => {
    fetchNearbyRestaurants(); // Fetch nearby restaurants on mount
    fetchKeywords(); // Fetch popular keywords on mount
  }, []);

  return (
    <div className="container-fluid">
        {/* 카카오 지도 */}
      <div id="map-container" style={{ width: '100%', height: '100%', position: 'absolute', top: 57, left: 0, zIndex: 1 }}></div>
      <div className="row d-flex position-relative">
        {/* Left Sidebar */}
        <div className="bg-dark col-auto col-md-2 min-vh-20 d-flex flex-column left-sidebar" style={{ marginTop: '56px' }}>
          <div>
            <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <button className="nav-link text-white fs-5" onClick={() => handleToggleSidebar('search')}>검색</button>
              </li>
              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <button className="nav-link text-white fs-5" onClick={() => handleToggleSidebar('favorites')}>찜</button>
              </li>
              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <button className="nav-link text-white fs-5" onClick={() => handleToggleSidebar('navigation')}>길찾기</button>
              </li>
              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <button className="nav-link text-white fs-5" onClick={() => handleToggleSidebar('keywords')}>인기키워드</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Sidebar Panels */}
        <div className={`side-panel-container ${isSidebarActive ? 'active' : ''}`}>
          <div className={`side-panel ${activePanel === 'search' ? 'd-block' : 'd-none'}`}>
          <input
              type="text"
              placeholder="키워드를 입력하세요"
              className="form-control"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={fetchSearchResults}>
              검색하기
            </button>
            <div className="mt-4">
              <h5>추천 맛집</h5>
              <ul>
                {searchResults.length > 0 ? (
                  searchResults.map((restaurant, index) => (
                    <li key={restaurant.id}>
                      <a href="#" onClick={() => handleOpenDetailSidebar(restaurant.name)}>
                        {restaurant.name}
                      </a>
                    </li>
                  ))
                ) : (
                  <p>검색 결과가 없습니다.</p>
                )}
              </ul>
            </div>
          </div>

          <div className={`side-panel ${activePanel === 'favorites' ? 'd-block' : 'd-none'}`}>
            <h3>찜한 맛집</h3>
            <p>찜 목록에 등록된 맛집이 표시됩니다.</p>
            <button onClick={handleOpenFavoriteSidebar}>내 찜 목록</button>
            <ul>
              {favorites.map((fav) => (
                <li key={fav.id}>
                  <a href="#" onClick={() => handleOpenDetailSidebar(fav.name)}>
                    {fav.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={`side-panel ${activePanel === 'navigation' ? 'd-block' : 'd-none'}`}>
  <h3>길찾기</h3>
  <p>맛집으로 가는 길을 안내합니다.</p>
  <button className="btn btn-secondary" onClick={fetchNearbyRestaurants}>
    현재 위치 주변 검색
  </button>
  <ul className="mt-4">
    {nearbyRestaurants.length > 0 ? (
      nearbyRestaurants.map((restaurant, index) => (
        <li key={index}>
          <a
            href="#"
            onClick={() => handleOpenDetailSidebar(restaurant)} // 상세 정보 열기
          >
            {restaurant}
          </a>
        </li>
      ))
    ) : (
      <p>주변에 검색된 식당이 없습니다.</p>
    )}
  </ul>
</div>


          <div className={`side-panel ${activePanel === 'keywords' ? 'd-block' : 'd-none'}`}>
  <h3>인기키워드</h3>
  <ul>
    {Array.isArray(popularKeywords) && popularKeywords.map((keyword, index) => (
      <li key={index}>
        <a href="#" onClick={() => handleKeywordClicks(keyword)}>{keyword}</a>
      </li>
    ))}
  </ul>
  {/* 키워드 관련 식당 패널 */}
{selectedKeyword && relatedRestaurants.length > 0 && (
            <div className="related-restaurants-panel">
              <h4>{`"${selectedKeyword}"와 관련된 식당`}</h4>
              <ul>
                {relatedRestaurants.map((restaurant, index) => (
                  <li key={restaurant.id}>
                    <a href="#" onClick={() => handleOpenDetailSidebar(restaurant.name)}>
                      {restaurant.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

</div>

        

        </div>

        {/* Detail Sidebar */}
{isDetailSidebarOpen && selectedPlace && (
  <div className="detail-sidebar">
    <h3>{selectedPlace.name} <button onClick={handleCloseDetailSidebar} className="close-button" style={{ float: 'right' }}>
      {/* 아무런 텍스트 없이 X 문자만 표시 */}
    </button></h3>
    <p>카테고리: {selectedPlace.category}</p>
    <p>별점: {selectedPlace.rating}</p>
    <p>리뷰: {selectedPlace.review}</p>

    <button onClick={() => handleAddToFavorites(selectedPlace.id)}>찜하기</button>

    <div className="review-form">
      <h4>리뷰 작성하기</h4>
      {/* 리뷰어 이름 입력 */}
      <input
        type="text"
        placeholder="리뷰어 이름"
        value={reviewer}  // 상태 값 연결
        onChange={(e) => setReviewer(e.target.value)}  // 상태 업데이트
      />
      {/* 키워드 입력 */}
      <input
        type="text"
        placeholder="키워드"
        value={keywords}  // 상태 값 연결
        onChange={(e) => setKeywords(e.target.value)}  // 상태 업데이트
      />
      {/* 리뷰 내용 입력 */}
      <textarea
        placeholder="리뷰 내용"
        value={review}  // 상태 값 연결
        onChange={(e) => setReview(e.target.value)}  // 상태 업데이트
      />
      {/* 점수 입력 */}
      <input
        type="number"
        placeholder="점수 (0.0 ~ 5.0)"
        value={score}  // 상태 값 연결
        onChange={(e) => setScore(parseFloat(e.target.value))}  // 점수 업데이트
      />
      <button onClick={handleSaveReview}>리뷰 작성</button>
    </div>
  </div>
)}


        {/* Main Content */}
        <div className="col-12 col-md-8 p-4 main-content">
          <h3>홈 화면</h3>
          <p>버튼을 눌러서 해당 화면을 보세요.</p>

          {/* 지도와 다른 정보가 들어갈 부분 */}
          <div className="map-section">
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
