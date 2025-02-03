import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationBar } from "../widgets/index";
import "../index";
import "./ui/App.css";
import { pathItemMap } from "../shared/pathItems/pathItems";
import { MainPage, MyPage, SignUpPage, LoginPage, RankingPage } from "../pages";

const App: React.FC = () => {
  const Ranking: React.FC = () => <div>리뷰어 순위</div>;
  const Login: React.FC = () => <div>로그인 페이지</div>;
  const SignUp: React.FC = () => <div>회원가입 페이지</div>;
  const Community: React.FC = () => <div>커뮤니티 페이지</div>;
  const Recommendation: React.FC = () => <div>오늘 뭐 먹지 페이지</div>;

  return (
    <div className="custom-app-container flex flex-col">
      <Router>
        <div className="custom-nav-container">
          <NavigationBar />
        </div>
        <div className="flex flex-1">
          <div className="custom-main-container flex-1">
            <Routes>
              <Route path={pathItemMap["home"].path} element={<MainPage />} />
              <Route
                path={pathItemMap["ranking"].path}
                element={<RankingPage />}
              />
              <Route path={pathItemMap["login"].path} element={<LoginPage />} />
              <Route
                path={pathItemMap["signUp"].path}
                element={<SignUpPage />}
              />
              <Route
                path={pathItemMap["community"].path}
                element={<Community />}
              />
              <Route path={pathItemMap["myPage"].path} element={<MyPage />} />
              <Route path="/recommendation" element={<Recommendation />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
