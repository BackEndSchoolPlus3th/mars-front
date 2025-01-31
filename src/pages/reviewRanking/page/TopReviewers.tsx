import React, { useState, useEffect } from "react";
import "../ui/TopReviewers.css";

interface Reviewer {
  reviewer: string;
  count: number;
}

function TopReviewers() {
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/reviewers/top10")
      .then((response) => response.json())
      .then((data) => setReviewers(data))
      .catch((error) => console.error("Error fetching reviewers:", error));
  }, []);

  return (
    <div className="top-reviewers">
      <h2 className="title">인기 리뷰어 TOP 10</h2>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>리뷰어</th>
            <th>총 리뷰수</th>
          </tr>
        </thead>
        <tbody>
          {reviewers.map((reviewer, index) => (
            <tr key={index}>
              <td className="rank">{index + 1}</td>
              <td>{reviewer.reviewer}</td>
              <td>{reviewer.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopReviewers;
