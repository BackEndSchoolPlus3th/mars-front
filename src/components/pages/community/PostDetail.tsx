import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { communityService } from "../../../api/services/communityService";
import { Board, Comment } from "../../../api/types";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Board | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedTags, setUpdatedTags] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    
    async function fetchPostDetail() {
      if (!id) return;
      try {
        // 조회수 증가 요청
      await communityService.increaseViewCount(Number(id));
          const postResponse = await communityService.getPostDetail(Number(id));
          setPost(postResponse.data);
          const commentsResponse = await communityService.getCommentsByPostId(Number(id));

          // 댓글에 대댓글 추가
          const commentsWithReplies = await Promise.all(
              commentsResponse.data.comments.map(async (comment: Comment) => {
                  const repliesResponse = await communityService.getRepliesByCommentId(Number(id), comment.commentId);
                  return { ...comment, replies: repliesResponse.data }; // replies 필드 추가
              })
          );

          setComments(commentsWithReplies);
      } catch (error) {
          setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
          setLoading(false);
      }
  }
  
    fetchPostDetail();
  }, [id]);  // ❌ comments 의존성 배열에서 제거!
  

  const handleLike = async () => {
    await communityService.likePost(Number(id));
    const reactionsResponse = await communityService.getReactions(Number(id));
    setLikes(reactionsResponse.data.likes);
    setDislikes(reactionsResponse.data.dislikes);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return alert("댓글을 입력해주세요.");

    try {
      await communityService.addComment(Number(id), newComment);
      setNewComment("");
      alert("댓글이 추가되었습니다.");
      const commentsResponse = await communityService.getCommentsByPostId(Number(id));
      setComments(commentsResponse.data.comments);
    } catch (error) {
      alert("댓글 저장 실패");
    }
  };

  const handleCommentEdit = async (commentId: number) => {
    console.log(comments);
    console.log("Editing comment with ID:", commentId);
    if (!editContent.trim()) return alert("수정할 내용을 입력해주세요.");
  
    try {
      await communityService.updateComment(Number(id), commentId, editContent);
      setEditCommentId(null);
      setEditContent("");
      const commentsResponse = await communityService.getCommentsByPostId(Number(id));
      setComments(commentsResponse.data.comments);
    } catch (error) {
      alert("댓글 수정 실패");
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await communityService.deleteComment(Number(id), commentId);
      const commentsResponse = await communityService.getCommentsByPostId(Number(id));
      setComments(commentsResponse.data.comments);
    } catch (error) {
      alert("댓글 삭제 실패");
    }
  };

  const handleReplySubmit = async (parentId: number) => {
    if (!replyContent.trim()) return;
    try {
        await communityService.addReplyComment(Number(id), parentId, replyContent);
        setReplyContent("");

        // 대댓글 작성 후 갱신
        const commentsResponse = await communityService.getCommentsByPostId(Number(id));
        const commentsWithReplies = await Promise.all(
            commentsResponse.data.comments.map(async (comment: Comment) => {
                const repliesResponse = await communityService.getRepliesByCommentId(Number(id), comment.commentId);
                return { ...comment, replies: repliesResponse.data }; // replies 필드 추가
            })
        );

        setComments(commentsWithReplies);
    } catch (error) {
        alert("대댓글 저장 실패");
    }
  };

  const handlePostUpdate = async () => {
    if (!updatedContent.trim()) return alert("수정할 내용을 입력해주세요.");
    try {
      await communityService.updatePost(Number(id), {
        title: post!.title,
        content: updatedContent,
        tags: updatedTags.split(",").map(tag => tag.trim())
      });
      setIsEditing(false);
      setPost({ ...post!, content: updatedContent, hashTags: updatedTags.split(",").map(tag => tag.trim()) });
    } catch (error) {
      alert("게시글 수정 실패");
    }
  };

  const handlePostDelete = async () => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await communityService.deletePost(Number(id));
        alert("게시글이 삭제되었습니다.");
        navigate("/community");
      } catch (error) {
        alert("게시글 삭제 실패");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {post && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="text-sm text-gray-500 mt-2">작성자: {post.user.name}</p>
          <p className="text-sm text-gray-500">조회수: {post.viewCnt}</p>

          <div className="mt-4">
            {isEditing ? (
              <>
                <textarea
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  rows={4}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                <input
                  type="text"
                  value={updatedTags}
                  onChange={(e) => setUpdatedTags(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full mt-2"
                  placeholder="태그를 쉼표로 구분하여 입력하세요 (예: React, JavaScript)"
                />
              </>
            ) : (
              <p>{post.content}</p>
            )}
          </div>

          <p className="text-sm text-gray-500">태그: {post.hashTags.join(", ")}</p>

          <div className="mt-4 flex gap-2">
            <button onClick={() => setIsEditing(!isEditing)} className="bg-blue-500 text-white rounded-lg px-4 py-2">
              {isEditing ? "수정 취소" : "수정하기"}
            </button>
            <button onClick={handlePostDelete} className="bg-red-500 text-white rounded-lg px-4 py-2">
              삭제하기
            </button>
            {isEditing && (
              <button onClick={handlePostUpdate} className="bg-green-500 text-white rounded-lg px-4 py-2">
                수정 완료
              </button>
            )}
          </div>

          {/* 좋아요 버튼 추가 */}
          <div className="mt-4 flex gap-2 items-center">
            <button onClick={handleLike} className="bg-gray-200 text-black rounded-lg px-4 py-2">
              👍 좋아요 ({likes})
            </button>
            <span>👎 싫어요 ({dislikes})</span>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">댓글</h3>
            <div className="mt-6">
  <h3 className="text-lg font-semibold">댓글</h3>
  <div className="space-y-4 mt-4">
    {comments.map((comment) => (
      <div key={comment.commentId} className="border-b pb-2">
        {editCommentId === comment.commentId ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        ) : (
          <p>{comment.content}</p>
        )}
        <p className="text-sm text-gray-500">{comment.user.name}</p>
        <div className="flex gap-2 mt-2">
          {editCommentId === comment.commentId ? (
            <button onClick={() => handleCommentEdit(comment.commentId)} className="bg-green-500 text-white px-3 py-1 rounded">
              저장
            </button>
          ) : (
            <button onClick={() => { setEditCommentId(comment.commentId); setEditContent(comment.content); }} className="bg-blue-500 text-white px-3 py-1 rounded">
              수정하기
            </button>
          )}
          <button onClick={() => handleCommentDelete(comment.commentId)} className="bg-red-500 text-white px-3 py-1 rounded">
            삭제하기
          </button>
          <button onClick={() => setReplyCommentId(replyCommentId === comment.commentId ? null : comment.commentId)} className="bg-gray-500 text-white px-3 py-1 rounded">
            답글 달기
          </button>
        </div>
        
        {/* ✅ 대댓글 표시 */}
        {comment.replies && (
          <div className="ml-6 mt-2">
            {comment.replies.map((reply) => (
              <div key={reply.replyId} className="border-l-2 pl-4 ml-2 mb-2">
                <p className="text-sm">{reply.content}</p>
                <p className="text-xs text-gray-500">{reply.username}</p>
              </div>
            ))}
          </div>
        )}

        {/* 대댓글 입력 UI */}
        {replyCommentId === comment.commentId && (
          <div className="mt-2">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button onClick={() => handleReplySubmit(comment.commentId)} className="bg-orange-500 text-white px-3 py-1 rounded mt-2">
              답글 작성
            </button>
          </div>
        )}
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
        </div>
      )}
    </div>
  );
};

export default PostDetail;
