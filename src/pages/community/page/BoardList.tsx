import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../ui/BoardList.css';


function BoardList() {
  const [posts, setPosts] = useState<{ boardId: number; title: string; tags: string[] }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    fetch('http://localhost:8080/api/posts')  // 페이지 관련 파라미터 제거
      .then((response) => {
        if (!response.ok) throw new Error('게시글을 불러오는 데 실패했습니다.');
        return response.json();
      })
      .then((data) => {
        console.log(data);  // 응답 데이터 확인
        setPosts(data.posts);  // 모든 게시글을 한 번에 설정
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="board-list">
      <h3>게시판</h3>
      
      <Link to="/write">
        <button>글쓰기</button>
      </Link>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
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
                <tr key={post.boardId}>  {/* boardId 사용 */}
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/board/${post.boardId}`}>{post.title}</Link> {/* boardId 사용 */}
                  </td>
                  <td>{post.tags && post.tags.length > 0 ? post.tags.join(', ') : '태그 없음'}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>게시물이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BoardList;
