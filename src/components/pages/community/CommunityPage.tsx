import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { communityService } from "../../../api/services/communityService";
import type { Board, Comment } from "../../../api/types";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const [posts, setPosts] = useState<Board[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPost, setNewPost] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Board | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // ✅ 모든 게시글 가져오기
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await communityService.getPosts();
        console.log("🔥 응답 데이터:", response.data);
        if (response.status === 200) {
          const formattedPosts = response.data.posts.map((post) => ({
            ...post,
            id: post.boardId ?? 1, // boardId를 id로 변환
            
          }));
          setPosts(formattedPosts);
        } else {
          setError("게시글을 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // ✅ 특정 게시글 조회 + 댓글 불러오기
  const handlePostClick = async (postId?: number) => {
    if (!postId) {
      alert("게시글 ID가 없습니다.");
      return;
    }

    try {
      console.log(`🔥 게시글 ID ${postId} 클릭됨`);
      const response = await communityService.getPostDetail(postId);
      if (response.status === 200) {
        const postData = response.data;
        setSelectedPost({
          ...postData,
          id: postData.boardId ?? 1, // boardId가 undefined면 0으로 설정 // boardId를 id로 변환
        });

        const commentsResponse = await communityService.getCommentsByPostId(postId);
        setComments(commentsResponse.data.comments);
      } else {
        alert("게시글을 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      alert("게시글 조회 중 오류 발생");
    }
  };

  // ✅ 게시글 검색 필터
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  // ✅ 댓글 작성
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost) return;
    if (!newComment.trim()) return alert("댓글을 입력해주세요.");

    try {
      await communityService.addComment(selectedPost.id, newComment);
      setNewComment("");
      alert("댓글이 추가되었습니다.");
      handlePostClick(selectedPost.id); // 댓글 추가 후 다시 조회
    } catch (error) {
      alert("댓글 저장 실패");
    }
  };

  if (loading) return <p className="text-center">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      {/* 검색 입력 */}
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-1 mb-4"
      />

      {/* 새 게시글 작성 */}
      <div className="w-full max-w-md mb-6">
      <button onClick={() => navigate("/community/writeForm")} className="w-full bg-orange-500 text-white rounded-lg py-2">
  새 게시글 작성
</button>
      </div>

      {/* 게시글 목록 */}
      <div className="w-full max-w-md">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg border border-gray-200 mb-4 p-4 cursor-pointer"
          >
            {/* Link 컴포넌트로 게시글 클릭 시 PostDetail.tsx로 이동 */}
            <Link to={`/community/${post.id}`}>
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-gray-500 text-sm mt-2">
               {post.id} | {post.hashTags.join(", ")}
              </p>
            </Link>
          </div>
        ))}
      </div>
  

      {/* 선택된 게시글 세부 내용 및 댓글 */}
      {selectedPost && (
        <div className="mt-8 w-full max-w-md bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">{selectedPost.title}</h2>
          <p>{selectedPost.content}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">댓글</h3>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.commentId} className="border-b pb-2">
                  <p>{comment.content}</p>
                  <p className="text-sm text-gray-500">{comment.user.name}</p>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
              className="border border-gray-300 rounded-md p-2 w-full"
              rows={3}
            />
            <button type="submit" className="bg-orange-500 text-white rounded-lg py-2 mt-2 w-full">
              댓글 작성
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Community;
