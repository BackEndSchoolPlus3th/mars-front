import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../ui/EditPost.css';
import { useAuth } from '../../../widgets/navigationBar/component/AuthContext';

const EditPost = () => {
  const { isLoggedIn, email } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<{ email?: string; title: string; content: string; tags?: string[] } | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then((response) => {
        if (!response.ok) throw new Error('게시글 정보를 불러오는 데 실패했습니다.');
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setTags((data.tags || []).join(','));
      })
      .catch((error) => console.error('Error fetching post:', error));
  }, [postId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const postData = {
      title,
      content,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    fetch(`http://localhost:8080/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
      credentials: 'include',  // This ensures the session cookie is sent with the request
    })
      .then((response) => {
        if (!response.ok) throw new Error('게시글 수정 실패');
        alert('게시글이 수정되었습니다.');
        navigate('/community');
      })
      .catch((error) => alert(error.message));
    
  };

  return post ? (
    <div className="edit-post">
      <h1>글수정 폼</h1>
      <form onSubmit={handleSubmit}>
        <div>이름: {email}</div>
        <div>
          제목: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          내용:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div>
          태그: <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditPost;
