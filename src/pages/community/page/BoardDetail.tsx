import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../ui/BoardDetail.css';
interface Comment {
  id: number;
  author: string;
  content: string;
}

interface Post {
  id: number;
  title: string;
  author: string;
  views: number;
  createdAt: string;
  content: string;
  comments: Comment[];
}

const BoardDetail = () => {
  const { postId } = useParams<{ postId: string }>(); // URL에서 게시물 ID 가져오기
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>(''); // 새 댓글 내용

  useEffect(() => {
    // 게시물과 댓글 데이터 불러오기
    if (postId) {
      fetch(`/api/posts/${postId}`)
        .then((response) => response.json())
        .then((data) => {
          setPost(data);
          setComments(data.comments || []); // 댓글이 있을 경우에만 설정
        });
    }
  }, [postId]);

  const handleDelete = () => {
    // 게시물 삭제 처리
    if (postId) {
      fetch(`/api/posts/${postId}`, { method: 'DELETE' })
        .then(() => {
          alert('게시물이 삭제되었습니다.');
          window.location.href = '/'; // 삭제 후 목록 페이지로 이동
        })
        .catch((error) => alert('삭제 실패'));
    }
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value); // 댓글 내용 변경
  };

  const handleCommentSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert('댓글을 작성해주세요!');
      return;
    }

    // 댓글 추가 요청
    fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]); // 새로운 댓글을 기존 댓글 목록에 추가
        setNewComment(''); // 댓글 입력란 초기화
      })
      .catch((error) => alert('댓글 작성 실패'));
  };

  return post ? (
    <div className="board-detail">
      <h1>{post.title}</h1>
      <div>글쓴이: {post.author}</div>
      <div>조회수: {post.views}</div>
      <div>작성일: {new Date(post.createdAt).toLocaleString()}</div>
      <div>내용: {post.content}</div>

      {/* Edit/Delete buttons */}
      <div>
        <Link to={`/edit/${post.id}`}>수정하기</Link>
        <button onClick={handleDelete}>삭제하기</button>
      </div>

      {/* 댓글 목록 */}
      <div className="comments-section">
        <h2>댓글</h2>
        {comments.length === 0 ? (
          <p>댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <strong>{comment.author}</strong>: {comment.content}
            </div>
          ))
        )}
      </div>

      {/* 댓글 쓰기 폼 */}
      <div className="comment-form">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="댓글을 작성하세요"
        />
        <button onClick={handleCommentSubmit}>댓글 작성</button>
      </div>

      {/* 게시물 목록으로 돌아가기 */}
      <div>
        <Link to="/community">목록보기</Link>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default BoardDetail;