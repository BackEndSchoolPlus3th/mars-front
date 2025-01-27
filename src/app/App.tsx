import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// AuthProvider import
import { NavigationBar } from '../widgets/index';
import '../index';
import './ui/App.css';
import { pathItemMap } from '../shared/pathItems/pathItems';
import { MainPage, MyPage, SignUpPage, LoginPage } from '../pages';
import BoardDetail from '../pages/community/page/BoardDetail';
import EditPost from '../pages/community/page/EditPost';
import WritePost from '../pages/community/page/WritePost';
import BoardList from '../pages/community/page/BoardList';
import TopReviewers from '../pages/reviewRanking/page/TopReviewers';
import Recommendation from '../pages/todayRecommand/page/TodayRecommand';
import WheelOfFortune from '../pages/todayRecommand/page/WheelOfFortune';




const App: React.FC = () => {
    //const Ranking: React.FC = () => <div>리뷰어 순위</div>;
    const Login: React.FC = () => <div>로그인 페이지</div>;
    const SignUp: React.FC = () => <div>회원가입 페이지</div>;
    //const Community: React.FC = () => <div>커뮤니티 페이지</div>;
    // const MyPage: React.FC = () => <div>마이 페이지</div>;
    //const Recommendation: React.FC = () => <div>오늘 뭐 먹지 페이지</div>;
    // fetch(import.meta.env.VITE_CORE_FRONT_BASE_URL + 'api/v1/test')
    //     .then((res) => res.json())
    //     .then((data) => console.log(data));

    // console.log(import.meta.env.VITE_CORE_FRONT_BASE_URL);
    // console.log(import.meta.env.VITE_CORE_API_BASE_URL);

    return (
    
        <Router>
            <NavigationBar />
            <main>
                <Routes>
                    <Route
                        path={pathItemMap['home'].path}
                        element={<MainPage />}
                    />
                    <Route
                        path={pathItemMap['ranking'].path}
                        element={<TopReviewers />}
                    />
                    <Route
                        path={pathItemMap['login'].path}
                        element={<LoginPage />}
                    />
                    <Route
                        path={pathItemMap['signUp'].path}
                        element={<SignUpPage />}
                    />
                    <Route
                        path={pathItemMap['community'].path}
                        element={<BoardList />}
                    />
                    <Route path="/wheel" element={<WheelOfFortune />} />

                    <Route path="/board/:postId" element={<BoardDetail />} />
                    <Route path="/edit/:postId" element={<EditPost />} />
                    <Route path="/write" element={<WritePost />} /> {/* 글쓰기 폼 라우트 추가 */}
                    <Route path="/top-reviewers" element={<TopReviewers />} /> {/* 경로 추가 */}
                    

                    <Route
                        path={pathItemMap['myPage'].path}
                        element={<MyPage />}
                    />
                    <Route
                        path="/recommendation"
                        element={<Recommendation />}
                    />
                </Routes>
            </main>
        </Router>
    
    );
};

export default App;