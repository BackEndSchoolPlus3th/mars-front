import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { communityService } from "../../../api/services/communityService";

const WriteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  // ✅ 게시글 저장
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!content.trim()) return alert("내용을 입력해주세요.");

    try {
      await communityService.createPost({
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()), // 태그를 배열로 변환
      });

      alert("게시글이 작성되었습니다.");
      navigate("/community"); // 저장 후 이동
    } catch (error) {
      alert("게시글 저장 실패");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">새 게시글 작성</h2>
      <form onSubmit={handlePostSubmit} className="w-full max-w-md flex flex-col">
        {/* 제목 입력 */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="border border-gray-300 rounded-lg p-2 mb-4"
        />
        {/* 내용 입력 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          placeholder="글 내용을 입력하세요"
          className="border border-gray-300 rounded-lg p-2 mb-4"
        />
        {/* 태그 입력 */}
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="태그를 입력하세요 (쉼표로 구분)"
          className="border border-gray-300 rounded-lg p-2 mb-4"
        />
        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-orange-500 text-white rounded-lg p-2">
            저장하기
          </button>
          <button
            type="button"
            onClick={() => navigate("/community")}
            className="flex-1 bg-gray-400 text-white rounded-lg p-2"
          >
            뒤로 가기
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteForm;
