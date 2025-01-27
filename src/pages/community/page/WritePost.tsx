import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../ui/WritePost.css";

const WritePost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<{ email?: string; title: string; content: string; tags?: string[] } | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/users/current-user', { credentials: 'include' })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('로그인이 필요합니다.');
      })
      .then((user) => setPost({ email: user.email, title: '', content: '', tags: [] }))
      .catch((error) => alert(error.message));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!post?.email) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    const postData = {
      email: post.email,  // email 추가
      title,
      content,
      tags: tags.split(',').map((tag) => tag.trim()),
    };
  
    fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 세션 쿠키 포함
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('게시글 등록 실패');
        alert('게시글이 등록되었습니다.');
        navigate('/community');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="write-post">
      <h1>글쓰기 폼</h1>
      <form onSubmit={handleSubmit}>
        <div>이름: {post?.email || '알 수 없음'}</div>
        <div>
          제목: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <br />
        <div>
          내용:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <br />
        <div>
          태그: <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="예: 태그1,태그2" />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default WritePost;
