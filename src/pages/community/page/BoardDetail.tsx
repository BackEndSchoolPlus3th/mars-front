import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../ui/BoardDetail.css';
import { useAuth } from '../../../widgets/navigationBar/component/AuthContext';

interface Comment {
  id: number;
  author: string;
  content: string;
}

interface Post {
  boardId: number;
  title: string;
  content: string;
  regdate: string;
  viewCnt: number;
  likes: number;
  user: {
    userId: number;
    email: string;
    name: string;
  };
  hashTags: string[];
}

const BoardDetail = () => {
  
  const { isLoggedIn, email } = useAuth();
  const { postId } = useParams<{ postId: string }>();  // postId로 수정
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const navigate = useNavigate();
  const [likes, setLikes] = useState<number>(post?.likes || 0);

  useEffect(() => {
    if (postId) {
      fetch(`http://localhost:8080/api/posts/${postId}`)
        .then((response) => response.json())
        .then((data) => {
          setPost({
            boardId: data.board.boardId,
            title: data.board.title,
            content: data.board.content,
            regdate: data.board.regdate,
            viewCnt: data.board.viewCnt,
            likes: data.board.likes,
            user: {
              userId: data.board.user.userId,
              email: data.board.user.email,
              name: data.board.user.name,
            },
            hashTags: data.board.hashTags,
          });
          setComments(data.comments || []);
        })
        .catch((error) => {
          console.error('Error fetching post detail:', error);
          alert('게시글 정보를 불러오는 데 실패했습니다.');
        });
    }
  }, [postId]);

  // post 데이터가 업데이트될 때 likes 상태 동기화
useEffect(() => {
  if (post) {
    setLikes(post.likes);
  }
}, [post]);

  const handleDelete = () => {
    if (postId) {
      fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include',  // 세션 쿠키 포함
      })
        .then((response) => {
          if (response.ok) {
            alert('게시물이 삭제되었습니다.');
            navigate('/community');
          } else {
            throw new Error('게시물 삭제 실패');
          }
        })
        .catch(() => alert('게시물 삭제 실패'));
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postId}/like`, {
        method: 'POST',
        credentials: 'include',  // 세션 쿠키 포함
      });
  
      if (!response.ok) {
        throw new Error('좋아요 실패');
      }
  
      const data = await response.json();
  
      if (data.likes !== undefined) {
        setLikes(data.likes);  // 백엔드에서 반환한 값으로 업데이트
      } else {
        throw new Error('서버 응답 오류');
      }
  
    } catch (error) {
      console.error('좋아요 처리 중 오류:', error);
      alert('좋아요 처리 중 오류 발생');
    }
  };



  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert('댓글을 작성해주세요!');
      return;
    }

    fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newComment }),
      credentials: 'include',  // 세션 쿠키 포함
    })
      .then((response) => {
        if (response.ok) {
          return response.json();  // 정상적인 응답인 경우, JSON 파싱
        } else {
          throw new Error('댓글 작성 실패');
        }
      })
      .then(() => {
        alert('댓글이 추가되었습니다.');
        setNewComment('');
        setComments((prevComments) => [
          ...prevComments,
          { id: prevComments.length + 1, author: email || '익명', content: newComment },
        ]);
      })
      .catch((error) => {
        console.error('댓글 작성 오류:', error);
        alert(error.message || '댓글 작성 실패');
      });
  };

  return post ? (
    <div className="board-detail">
      <h1>{post.title}</h1>
      <div>글쓴이: {post.user.name}</div>
      <div>조회수: {post.viewCnt}</div>
      <div>작성일: {new Date(post.regdate).toLocaleString()}</div>
      <div>내용: {post.content}</div>
      <div>태그: {post.hashTags.join(', ')}</div>


      <div>
        <Link to={`/edit/${post.boardId}`}>수정하기</Link>
        <button onClick={handleDelete}>삭제하기</button>
      </div>


      <div className="like-section">
        <button onClick={handleLike}>좋아요 {likes}</button>
      </div>

      <div className="comments-section">
        <h2>댓글</h2>
        {comments.length === 0 ? (
          <p>댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <strong>{comment.author}</strong>: {comment.content}
            </div>
          ))
        )}
      </div>

      <div className="comment-form">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="댓글을 작성하세요"
        />
        <button onClick={handleCommentSubmit}>댓글 작성</button>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default BoardDetail;
