import apiClient from "../apiClient";
import type { ApiResponse } from "../types";
import type { Board, Comment, Reply } from "../types";


export const communityService = {
  // ✅ 1. 모든 게시글 조회: GET /api/posts
  async getPosts(): Promise<ApiResponse<{ posts: Board[] }>> {
    return apiClient.get("/api/posts");
  },

  // ✅ 2. 특정 게시글 상세 조회: GET /api/posts/{postId}
  async getPostDetail(postId: number): Promise<ApiResponse<Board>> {
    return apiClient.get(`/api/posts/${postId}`);
  },

  // ✅ 3. 게시글 작성: POST /api/posts
  async createPost(data: { title: string; content: string; tags: string[] }): Promise<ApiResponse<void>> {
    return apiClient.post("/api/posts", data);
  },

  // ✅ 4. 게시글 수정: PUT /api/posts/{postId}
  async updatePost(postId: number, data: { title: string; content: string; tags: string[] }): Promise<ApiResponse<void>> {
    return apiClient.put(`/api/posts/${postId}`, data);
  },

  // ✅ 5. 게시글 삭제: DELETE /api/posts/{postId}
  async deletePost(postId: number): Promise<ApiResponse<void>> {
    return apiClient.delete(`/api/posts/${postId}`);
  },

  // ✅ 6. 댓글 추가: POST /api/posts/{postId}/comments
  async addComment(postId: number, content: string): Promise<ApiResponse<Comment>> {
    return apiClient.post(`/api/posts/${postId}/comments`, { content });
  },

  // ✅ 7. 특정 게시글의 댓글 조회: GET /api/posts/{postId}/comments
  async getCommentsByPostId(postId: number): Promise<ApiResponse<{ comments: Comment[] }>> {
    return apiClient.get(`/api/posts/${postId}/comments`);
  },

  // ✅ 8. 댓글 수정: PUT /api/posts/{postId}/comments/{commentId}
  async updateComment(postId: number, commentId: number, content: string): Promise<ApiResponse<void>> {
    return apiClient.put(`/api/posts/${postId}/comments/${commentId}`, { content });
  },

  // ✅ 9. 댓글 삭제: DELETE /api/posts/{postId}/comments/{commentId}
  async deleteComment(postId: number, commentId: number): Promise<ApiResponse<void>> {
    return apiClient.delete(`/api/posts/${postId}/comments/${commentId}`);
  },

  // ✅ 10. 특정 사용자의 게시글 개수 조회: GET /api/posts/count?email={email}
  async getUserPostCount(email: string): Promise<ApiResponse<{ count: number }>> {
    return apiClient.get(`/api/posts/count?email=${email}`);
  },

  // ✅ 11. 게시글 좋아요/싫어요: POST /api/posts/{postId}/reaction
  async toggleReaction(postId: number): Promise<ApiResponse<{ liked: boolean }>> {
    return apiClient.post(`/api/posts/${postId}/reaction`);
  },

  // ✅ 12. 좋아요/싫어요 개수 조회: GET /api/posts/{postId}/reactions
  async getReactions(postId: number): Promise<ApiResponse<{ likes: number; dislikes: number }>> {
    return apiClient.get(`/api/posts/${postId}/reactions`);
  },

  

  // ✅ 게시글 좋아요: POST /api/posts/{postId}/reaction (좋아요/싫어요 토글)
  async likePost(postId: number): Promise<ApiResponse<{ liked: boolean }>> {
    return apiClient.post(`/api/posts/${postId}/reaction`);
  },

  // ✅ 9. 대댓글 추가: POST /api/posts/{postId}/comments/{commentId}/replies
  async addReplyComment(postId: number, commentId: number, content: string): Promise<ApiResponse<void>> {
    return apiClient.post(`/api/posts/${postId}/comments/${commentId}/replies`, { content });
  },

  async getRepliesByCommentId(postId: number, commentId: number): Promise<ApiResponse<Reply[]>> {
    return await apiClient.get(`/api/posts/${postId}/comments/${commentId}/replies`)
},
  
async increaseViewCount(postId: number): Promise<ApiResponse<void>> {
  return apiClient.put(`/api/posts/${postId}/increment-views`);
}

   

  

 
};
