import React, { useState } from 'react';
import { logoPath } from '../../../shared';
import '../ui/SideBarStyle.css';

const Sidebar: React.FC = () => {
    const [activePanel, setActivePanel] = useState<string>(''); // 현재 활성화된 패널을 추적
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false); // 사이드바 활성화 상태

    // 패널 토글 함수
    const handleToggleSidebar = (panelName: string) => {
        if (activePanel === panelName) {
            // 이미 활성화된 패널을 클릭하면 비활성화
            setActivePanel('');
            setIsSidebarActive(false);
        } else {
            // 새로운 패널을 클릭하면 해당 패널을 활성화
            setActivePanel(panelName);
            setIsSidebarActive(true);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row d-flex position-relative">
                {/* 기존 사이드바 */}
                <div className="bg-dark col-auto col-md-2 min-vh-100 d-flex flex-column left-sidebar">
                    <div>
                        <a className="text-decoration-none text-white d-none d-sm-inline d-flex align-items-center">
                            <img
                                src={logoPath}
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                        </a>
                        <hr className="text-secondary d-none d-sm-block" />
                        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <button className="nav-link text-white fs-5" onClick={() => handleToggleSidebar('search')}>
                                    검색
                                </button>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <button className="nav-link text-white fs-5" onClick={() => handleToggleSidebar('favorites')}>
                                    찜
                                </button>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <button className="nav-link text-white fs-5" onClick={() => handleToggleSidebar('navigation')}>
                                    길찾기
                                </button>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <button className="nav-link text-white fs-5" onClick={() => handleToggleSidebar('keywords')}>
                                    인기키워드
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 오른쪽 슬라이드 패널 */}
                <div className={`side-panel-container ${isSidebarActive ? 'active' : ''}`}>
                    <div className={`side-panel ${activePanel === 'search' ? 'd-block' : 'd-none'}`}>
                        <h3>맛집 검색</h3>
                        <input type="text" placeholder="맛집 이름 입력" className="form-control" />
                        <button className="btn btn-primary mt-3">검색하기</button>
                        <div className="mt-4">
                            <h5>추천 맛집</h5>
                            <ul>
                                <li>서울 강남의 맛집</li>
                                <li>부산 해운대의 맛집</li>
                                <li>대구 동성로의 맛집</li>
                            </ul>
                        </div>
                    </div>

                    <div className={`side-panel ${activePanel === 'favorites' ? 'd-block' : 'd-none'}`}>
                        <h3>찜한 맛집</h3>
                        <p>찜 목록에 등록된 맛집이 표시됩니다.</p>
                        <ul>
                            <li>서울 강남의 맛집 - 찜</li>
                            <li>부산 해운대의 맛집 - 찜</li>
                        </ul>
                    </div>

                    <div className={`side-panel ${activePanel === 'navigation' ? 'd-block' : 'd-none'}`}>
                        <h3>길찾기</h3>
                        <p>맛집으로 가는 길을 안내합니다.</p>
                        <button className="btn btn-secondary">길찾기 시작</button>
                    </div>

                    <div className={`side-panel ${activePanel === 'keywords' ? 'd-block' : 'd-none'}`}>
                        <h3>인기키워드</h3>
                        <ul>
                            <li>서울 강남 맛집</li>
                            <li>부산 해운대 맛집</li>
                            <li>대구 동성로 맛집</li>
                        </ul>
                    </div>
                </div>

                {/* 메인 컨텐츠 영역 */}
                <div className="col-12 col-md-8 p-4 main-content">
                    <h3>홈 화면</h3>
                    <p>버튼을 눌러서 해당 화면을 보세요.</p>

                    {/* 지도와 다른 정보가 들어갈 부분 */}
                    <div className="map-section">
                        <p>지도 및 맛집 정보를 여기에 표시하세요.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
