import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import MapArea from "./components/map/MapArea";

import CommunityPage from "./components/pages/community/CommunityPage";
import PostDetail from "./components/pages/community/PostDetail";
import WriteForm from "./components/pages/community/WriteForm";
import { store } from "./utils/store/Store";
import { Provider } from "react-redux";
import React from "react";

import {
  MainPage,
  PopularReviewersPage,
  RecommendedRestaurantsPage,
  AuthNaverCallback,
} from "./components/pages";

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
                {/* <Route
                                    path="/map"
                                    element={
                                        <div className="relative flex">
                                            <Sidebar />
                                            <MapArea />
                                        </div>
                                    }
                                /> */}
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/community/:id" element={<PostDetail />} />
                <Route path="/community/writeForm" element={<WriteForm />} />
                <Route path="/reviewers" element={<PopularReviewersPage />} />
                <Route
                  path="/auth/naver/callback"
                  element={<AuthNaverCallback />}
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
