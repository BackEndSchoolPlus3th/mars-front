import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

  const login = (email: string) => {
    setIsLoggedIn(true);
    setEmail(email);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setEmail(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
  };

  useEffect(() => {
    // 상태 동기화 확인
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedEmail = localStorage.getItem("email");

    setIsLoggedIn(storedIsLoggedIn);
    setEmail(storedEmail);
  }, []); // 컴포넌트가 마운트될 때 한 번 실행

  return (
    <AuthContext.Provider value={{ isLoggedIn, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
