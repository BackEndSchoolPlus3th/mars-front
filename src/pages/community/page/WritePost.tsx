import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../ui/WritePost.css";

const WritePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const postData = {
      title,
      content,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    fetch('http://localhost:8080/api/posts', {  // 서버 URL을 http://localhost:8080로 변경
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
        <div>이름: John Doe</div>
        <div>
          제목: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <br>
        </br>
        <div>
          내용:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <br>
        </br>
        <div>
          태그: <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="예: 태그1,태그2" />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default WritePost;
