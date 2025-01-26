import React, { useState } from 'react';
import { logoPath } from '../../../shared';
import '../ui/SideBarStyle.css';

const Sidebar: React.FC = () => {
    const [activePanel, setActivePanel] = useState<string>(''); // Tracks active left sidebar panel
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false); // Left sidebar toggle state
    const [detailPanelData, setDetailPanelData] = useState<{ title: string; content: React.ReactNode } | null>(null); // Detail sidebar data

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

    // Opens the detail sidebar with specific data
const handleOpenDetailSidebar = (title: string, content: string) => {
    // 줄바꿈(\n)을 <p> 태그로 변환
    const formattedContent = content.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
    ));
    setDetailPanelData({ title, content: formattedContent });
};

    // Closes the detail sidebar
    const handleCloseDetailSidebar = () => {
        setDetailPanelData(null);
    };

    return (
        <div className="container-fluid">
            <div className="row d-flex position-relative">
                {/* Left Sidebar */}
                <div className="bg-dark col-auto col-md-2 min-vh-20 d-flex flex-column left-sidebar" style={{ marginTop: '56px' }}>
                    <div>

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

                {/* Right Sidebar Panels */}
                <div className={`side-panel-container ${isSidebarActive ? 'active' : ''}`}>
                    <div className={`side-panel ${activePanel === 'search' ? 'd-block' : 'd-none'}`}>
                        <h3>맛집 검색</h3>
                        <input type="text" placeholder="맛집 이름 입력" className="form-control" />
                        <button className="btn btn-primary mt-3">검색하기</button>
                        <div className="mt-4">
                            <h5>추천 맛집</h5>
                            <ul>
                            <li>
                              <a href="#" onClick={() => handleOpenDetailSidebar('서울 강남의 맛집',`식당 A\n리뷰: 좋음\n별점: 4.5`)
                               }
                              >서울 강남의 맛집
                              </a>
                            </li>

                            <li>
                              <a href="#" onClick={() => handleOpenDetailSidebar('부산 해운대의 맛집',`식당 b\n리뷰: 좋음\n별점: 4.8`)
                               }
                              >부산 해운대의 맛집
                              </a>
                            </li>

                            <li>
                              <a href="#" onClick={() => handleOpenDetailSidebar('대구 동성로의 맛집',`식당 c\n리뷰: 만족스러움\n별점: 4.2`)
                               }
                              >대구 동성로의 맛집
                              </a>
                            </li>
                                
                            
                            </ul>
                        </div>
                    </div>

                    <div className={`side-panel ${activePanel === 'favorites' ? 'd-block' : 'd-none'}`}>
                    <h3>찜한 맛집</h3>
                    <p>찜 목록에 등록된 맛집이 표시됩니다.</p>
                    <ul>
                <li>
                  <a
                    href="#"
                    onClick={() =>
                    handleOpenDetailSidebar(
                        '서울 강남의 맛집',
                        `식당 A\n리뷰: 좋음\n별점: 4.5`
                    )
                }
            >
                서울 강남의 맛집 - 찜
            </a>
        </li>
        <li>
            <a
                href="#"
                onClick={() =>
                    handleOpenDetailSidebar(
                        '부산 해운대의 맛집',
                        `식당 B\n리뷰: 좋음\n별점: 4.8`)}>
                부산 해운대의 맛집 - 찜
            </a>
        </li>
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

                

                {/* Detail Sidebar */}
                {detailPanelData && (
                    <div className="detail-panel">
                        <div className="detail-header">
                            <h3>{detailPanelData.title}</h3>
                            <button className="close-button" onClick={handleCloseDetailSidebar}>
                                &times;
                            </button>
                        </div>
                        <div className="detail-content">
                            <p>{detailPanelData.content}</p>
                        </div>
                    </div>
                )}

                {/* Main Content */}
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
