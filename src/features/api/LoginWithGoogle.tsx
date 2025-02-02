import axios from "axios";

async function loginWithGoogle(idToken: string) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_CORE_API_BASE_URL + "/api/auth/login/google",
      {
        idToken: idToken,
      }
    );

    // 응답 헤더에서 Authorization 값 추출
    const accessToken = response.headers["authorization"].replace(
      "Bearer ",
      ""
    );

    console.log("Access Token:", accessToken);

    // 2. 브라우저의 저장소(LocalStorage, SessionStorage)에 저장하기
    localStorage.setItem("accessToken", accessToken);

    // 추가 정보도 저장 가능
    const { email, name, picture } = response.data;
    localStorage.setItem("user", JSON.stringify({ email, name, picture }));

    console.log("User 정보가 저장되었습니다.");
  } catch (error) {
    console.error("로그인 중 오류가 발생했습니다:", error);
  }
}
