import React, { useEffect, useState } from 'react';
import { logoPath } from '../../../shared';
import '../ui/MyPageStyle.css';
import { useAuth } from '../../../widgets/navigationBar/component/AuthContext';

const MyPage: React.FC = () => {
    const { isLoggedIn, email } = useAuth();
    const [favoritesCount, setFavoritesCount] = useState(0);
    const [userPostsCount, setUserPostsCount] = useState(0);
    const [mypageData, setMypageData] = useState([]);
    const [showReviews, setShowReviews] = useState(false);
    const [reviewScore, setReviewScore] = useState(0);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:8080/api/restaurants/mypage/favorites/count?email=${email}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("찜한 개수 데이터:", data);
                    setFavoritesCount(data.count);
                })
                .catch((error) => console.error('찜한 식당 개수 불러오기 실패:', error));

            fetch(`http://localhost:8080/api/posts/count?email=${email}`)
                .then((response) => response.json())
                .then((data) => setUserPostsCount(data.count))
                .catch((error) => console.error('사용자 게시글 개수 불러오기 실패:', error));

            fetch(`http://localhost:8080/api/reviews/score?email=${email}`)
                .then((response) => response.json())
                .then((data) => setReviewScore(data.score))
                .catch((error) => console.error('리뷰 점수 불러오기 실패:', error));
        }
    }, [email]);

    const handleShowReviews = () => {
        if (!showReviews) {
            fetch(`http://localhost:8080/api/reviews/mypage?email=${email}`)
                .then((response) => response.json())
                .then((data) => setMypageData(data))
                .catch((error) => console.error('나의 리뷰 불러오기 실패:', error));
        }
        setShowReviews(!showReviews);
    };

    return (
        <div className="mypage-container">
            <header className="mypage-header">
                <img src={logoPath} alt="ComMars Logo" className="logo" />
                <h1>ComMars</h1>
            </header>
            <div className="mypage-content">
                <div className="review-section">
                    <p>나의 리뷰 총점 ⭐ {reviewScore}/5.0</p>
                    <button className="review-button" onClick={handleShowReviews}>
                        나의 리뷰 내역 보기
                    </button>
                    {showReviews && (
                        <ul className="review-list">
                            {mypageData.map((review: any, index) => (
                                <li key={index}>
                                    <p><strong>식당:</strong> {review.restaurant?.name || "정보 없음"}</p>
                                    <p><strong>리뷰어:</strong> {review.reviewer}</p>
                                    <p><strong>평점:</strong> ⭐ {review.score}/5.0</p>
                                    <p><strong>리뷰 내용:</strong> {review.review.length > 50 ? review.review.substring(0, 50) + "..." : review.review}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="profile-section">
                    <div className="profile-header">
                        <img src="/path/to/profile.png" alt="프로필" className="profile-picture" />
                        <p className="username">{email},</p>
                        <button className="profile-edit-button">프로필 변경</button>
                    </div>
                    <div className="favorites">
                        <p>나의 찜</p>
                        <p>{favoritesCount}</p>
                    </div>
                    <div className="monthly-benefits">
                        <p>이번 달의 혜택 보러가기</p>
                    </div>
                    <div className="stats">
                        <div className="stat-item">
                            <p>보관함</p>
                            <p>0</p>
                        </div>
                        <div className="stat-item">
                            <p>가입 라운지</p>
                            <p>0</p>
                        </div>
                        <div className="stat-item">
                            <p>저장한 글</p>
                            <p>{userPostsCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
