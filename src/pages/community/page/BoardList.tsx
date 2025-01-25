import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../ui/BoardList.css';

function BoardList() {
    const [posts, setPosts] = useState<{ id: number; title: string; tags: string[] }[]>([]);
  
    useEffect(() => {
      // 게시물 데이터를 API에서 가져오는 코드 (예시)
      setPosts([
        { id: 1, title: "첫 번째 게시물", tags: ["React", "JavaScript", "웹개발"] },
        { id: 2, title: "두 번째 게시물", tags: ["CSS", "디자인"] },
        { id: 3, title: "세 번째 게시물", tags: ["Node.js", "서버"] },
      ]);
    }, []);

    return (
      <div className="board-list">
        <h3>게시판</h3>
        
        {/* 글쓰기 버튼 추가 */}
        <Link to="/write">
          <button>글쓰기</button>
        </Link>

        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>태그</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <tr key={post.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/board/${post.id}`}>{post.title}</Link>
                  </td>
                  <td>
                    {/* 태그들을 쉼표로 구분해서 표시 */}
                    {post.tags.join(', ')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>게시물이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
}

export default BoardList;
