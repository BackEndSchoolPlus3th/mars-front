import React from "react";
import "../ui/RankingPageStyle.css"; // 스타일 파일 경로
import { rank1Path, rank2Path, rank3Path, userPath } from "../../../shared";
interface Ranking {
  id: number;
  name: string;
  score: number;
  profileImage: string;
  medal?: string;
}

const RankingPage: React.FC = () => {
  const rankings: Ranking[] = [
    {
      id: 1,
      name: "사용자1",
      score: 100,
      profileImage: userPath,
      medal: rank1Path,
    },
    {
      id: 2,
      name: "사용자2",
      score: 90,
      profileImage: userPath,
      medal: rank2Path,
    },
    {
      id: 3,
      name: "사용자3",
      score: 80,
      profileImage: userPath,
      medal: rank3Path,
    },
    {
      id: 4,
      name: "사용자4",
      score: 70,
      profileImage: userPath,
    },
    {
      id: 5,
      name: "사용자5",
      score: 60,
      profileImage: userPath,
    },
    {
      id: 6,
      name: "사용자6",
      score: 50,
      profileImage: userPath,
    },
    {
      id: 7,
      name: "사용자7",
      score: 40,
      profileImage: userPath,
    },
    {
      id: 8,
      name: "사용자8",
      score: 30,
      profileImage: userPath,
    },
    {
      id: 9,
      name: "사용자9",
      score: 20,
      profileImage: userPath,
    },
    {
      id: 10,
      name: "사용자10",
      score: 10,
      profileImage: userPath,
    },
  ];

  return (
    <div className="ranking-container">
      <header className="ranking-header">
        <h1>이달의 베스트 리뷰어를 만나보세요!</h1>
      </header>
      <div className="ranking-content">
        <div className="review-section">
          <p>이달의 랭킹을 확인하세요!</p>
        </div>
        <div className="ranking-section">
          <div className="hall-of-fame">
            {rankings.slice(0, 3).map((ranking, index) => (
              <div key={ranking.id} className={`ranking-item top-${index + 1}`}>
                {ranking.medal && (
                  <img
                    src={ranking.medal}
                    alt={`${ranking.name} medal`}
                    className="medal-icon"
                  />
                )}
                <img src={ranking.profileImage} alt={ranking.name} />
                <span className="name">{ranking.name}</span>
                <span className="score">{ranking.score}점</span>
              </div>
            ))}
          </div>
          <ul className="ranking-list">
            {rankings.slice(3).map((ranking, index) => (
              <li key={ranking.id} className="ranking-item box">
                <span className="rank">{index + 4}위</span>
                <img src={ranking.profileImage} alt={ranking.name} />
                <span className="name">{ranking.name}</span>
                <span className="score">{ranking.score}점</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        {" "}
        아이콘 제작자{" "}
        <a href="https://www.freepik.com" title="Freepik">
          {" "}
          Freepik{" "}
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/kr/" title="Flaticon">
          www.flaticon.com'
        </a>
      </div>
    </div>
  );
};
export default RankingPage;
