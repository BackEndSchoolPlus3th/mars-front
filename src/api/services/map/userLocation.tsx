import apiClient from "../../apiClient";

export const userLocationService = {
  async getUserLocation() {
    const response = await apiClient.get("/api/v1/location/current");
    console.log("유저 위치 정보 응답: ", response.data);
    return response.data;
  },
};
