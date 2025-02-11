import apiClient from "../apiClient";
import type { ApiResponse, Reviewer } from "../types";

export const reviewerService = {
  // ✅ 상위 10명의 리뷰어 조회: GET /api/v1/reviewers/top10
  async getTopReviewers(): Promise<ApiResponse<{ top: Reviewer[]; others: Reviewer[] }>> {
    return apiClient.get(`api/reviewer-rank/top10`);
  },


};
