import React, { useState, useEffect } from 'react';
import '../ui/TopReviewers.css';

function TopReviewers() {
  interface Reviewer {
    rank: number;
    nickname: string;
    score: number;
    reviews: number;
  }

  const [reviewers, setReviewers] = useState<Reviewer[]>([]);

  useEffect(() => {
    // 예시 데이터를 사용하여 인기 리뷰어를 가져옵니다.
    // 실제 API 호출로 데이터를 받아올 수 있습니다.
    setReviewers([
      { rank: 1, nickname: "JohnDoe", score: 1200, reviews: 50 },
      { rank: 2, nickname: "JaneDoe", score: 1100, reviews: 48 },
      { rank: 3, nickname: "SuperMan", score: 1000, reviews: 45 },
      { rank: 4, nickname: "IronMan", score: 900, reviews: 42 },
      { rank: 5, nickname: "BatMan", score: 850, reviews: 40 },
      { rank: 6, nickname: "Flash", score: 800, reviews: 38 },
      { rank: 7, nickname: "WonderWoman", score: 750, reviews: 35 },
      { rank: 8, nickname: "GreenLantern", score: 700, reviews: 30 },
      { rank: 9, nickname: "HawkEye", score: 650, reviews: 28 },
      { rank: 10, nickname: "BlackWidow", score: 600, reviews: 25 }
    ]);
  }, []);

  return (
    <div className="top-reviewers">
      <h2 className="title">인기 리뷰어 TOP 10</h2>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>닉네임</th>
            <th>리뷰어 점수</th>
            <th>총 리뷰수</th>
          </tr>
        </thead>
        <tbody>
          {reviewers.map((reviewer) => (
            <tr key={reviewer.rank}>
              <td className="rank">{reviewer.rank}</td>
              <td>{reviewer.nickname}</td>
              <td className="score">{reviewer.score}</td>
              <td>{reviewer.reviews}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopReviewers;
