import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "../../..";
import type { User, LoginPayload } from "../types/types";

// ✅ 초기 상태 설정
const initialState: User = {
  id: null,
  name: "",
  email: "",
  profileImageUrl: "",
  isLoggedIn: false,
};

// ✅ localStorage에서 user 정보 가져오기 (안전한 JSON 파싱)
const loadUserFromLocalStorage = (): User => {
  try {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return initialState; // ❗ 저장된 값이 없으면 기본값 반환

    const parsedUser: User = JSON.parse(savedUser);
    
    // ✅ id가 숫자가 아니거나 이상한 값이면 기본값 반환
    if (typeof parsedUser.id !== "number") return initialState;

    return parsedUser;
  } catch (error) {
    console.error("❌ localStorage에서 user 파싱 실패:", error);
    return initialState;
  }
};

// ✅ localStorage에서 불러온 유저 상태
const initialUserState: User = loadUserFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { user, accessToken, social } = action.payload;
      console.log("✅ 로그인 성공:", user);

      try {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("social", JSON.stringify(social));
      } catch (error) {
        console.error("❌ localStorage 저장 오류:", error);
      }

      return { ...user, isLoggedIn: true };
    },
    logout: (state) => {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        try {
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("social");
          apiClient.post("/api/auth/logout").catch(console.error);
        } catch (error) {
          console.error("❌ 로그아웃 오류:", error);
        }

        window.location.replace("/");
        return initialState;
      }
      return state;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
