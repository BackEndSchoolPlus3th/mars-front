import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import CommunityPage from './components/pages/community/CommunityPage';
import WriteForm from './components/pages/community/WriteForm';
import PostDetail from './components/pages/community/PostDetail';
import { store } from './utils/store/Store';
import { Provider } from 'react-redux';
import React from 'react';

import {
    MainPage,
    PopularReviewersPage,
    RecommendedRestaurantsPage,
    AuthNaverCallback,
    AuthKakaoCallback,
} from './components/pages';

function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <div className="h-full bg-gray-100 flex flex-col">
                        <Header />
                        <div className="h-full page-container">
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route
                                    path="/recommendations"
                                    element={<RecommendedRestaurantsPage />}
                                />
                                <Route
                                    path="/community"
                                    element={<CommunityPage />}
                                />
                                <Route
                                    path="/community/writeForm"
                                    element={<WriteForm />}
                                />
                                <Route
                                    path="/community/:id"
                                    element={<PostDetail />}
                                />
                                <Route
                                    path="/reviewers"
                                    element={<PopularReviewersPage />}
                                />
                                <Route
                                    path="/auth/naver/callback"
                                    element={<AuthNaverCallback />}
                                />
                                <Route
                                    path="/auth/kakao/login"
                                    element={<AuthKakaoCallback />}
                                />
                            </Routes>
                        </div>
                    </div>
                </Router>
            </Provider>
        </React.StrictMode>
    );
}

export default App;
