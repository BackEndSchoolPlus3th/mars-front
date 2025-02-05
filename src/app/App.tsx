import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationBar } from '../widgets/index';
import '../index';
import './ui/App.css';
import { pathItemMap } from '../shared/pathItems/pathItems';
import {
    MainPage,
    MyPage,
    SignUpPage,
    LoginPage,
    RankingPage,
    BoardList,
    TodayRecommand,
    NaverCallback,
} from '../pages';
import { store } from '../shared/store/Store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <div className="custom-app-container flex flex-col">
                    <Router>
                        <div className="custom-nav-container">
                            <NavigationBar />
                        </div>
                        <div className="flex flex-1">
                            <div className="custom-main-container flex-1">
                                <Routes>
                                    <Route
                                        path={pathItemMap['home'].path}
                                        element={<MainPage />}
                                    />
                                    <Route
                                        path={pathItemMap['ranking'].path}
                                        element={<RankingPage />}
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
                                    <Route
                                        path={pathItemMap['myPage'].path}
                                        element={<MyPage />}
                                    />
                                    <Route
                                        path="/recommendation"
                                        element={<TodayRecommand />}
                                    />
                                    <Route
                                        path="/auth/naver/callback"
                                        element={<NaverCallback />}
                                    />
                                </Routes>
                            </div>
                        </div>
                    </Router>
                </div>
            </Provider>
        </React.StrictMode>
    );
};

export default App;
