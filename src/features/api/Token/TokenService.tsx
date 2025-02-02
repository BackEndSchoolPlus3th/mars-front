class TokenService {
  private static accessTokenKey = "accessToken";
  private static refreshTokenKey = "refreshToken";

  // AccessToken 저장
  static setAccessToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  // AccessToken 가져오기
  static getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  // RefreshToken 저장
  static setRefreshToken(token: string) {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  // RefreshToken 가져오기
  static getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  // 토큰 삭제 (로그아웃 시 사용)
  static clearTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }
}

export default TokenService;
