import React, { createContext, useState, useEffect, useContext } from "react";
import { authApi } from "../api/authApi"; 

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const isAuthed = !!user;

  
  const login = async (email, password) => {
    try {
      // 1. 서버에 로그인 요청
      const response = await authApi.login({ email, password });
      
      // 2. 응답에서 토큰 추출 (백엔드 응답 구조에 따라 accessToken 또는 token)
      const token = response.accessToken || response.token;

      if (token) {
        // 3. 토큰 저장
        localStorage.setItem("accessToken", token);

        // 4. 토큰을 이용해 내 정보(프로필) 가져오기
        const userData = await authApi.getMe();
        setUser(userData);
        
        return true; // 로그인 성공
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("이메일 또는 비밀번호를 확인해주세요.");
      return false; // 로그인 실패
    }
  };

  /* ✅ [추가] 실제 회원가입 함수 (서버 통신) */
  const signup = async (userData) => {
    try {
      // 1. 서버에 회원가입 요청
      await authApi.register(userData);
      
      // 2. 가입 성공 시 바로 로그인 처리 (UX 편의상)
      await login(userData.email, userData.password);
      
      return true;
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다.");
      return false;
    }
  };

  /* ✅ [수정] 로그아웃 함수 */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken"); // 토큰 삭제
    // localStorage.removeItem("user"); // 보안상 유저 정보는 로컬에 저장하지 않는 것이 좋음
  };

  /* ✅ [수정] 새로고침 시 로그인 유지 (토큰 검증) */
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      
      if (token) {
        try {
          // 토큰이 있다면 유효한지 확인 겸 내 정보 가져오기
          const userData = await authApi.getMe();
          setUser(userData);
        } catch (error) {
          console.error("토큰 만료 또는 유효하지 않음:", error);
          logout(); // 토큰이 이상하면 로그아웃 처리
        }
      }
      setLoading(false); // 로딩 끝
    };

    initAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: isAuthed, 
        isAuthed,
        login,  // 이제 (email, password)를 받습니다
        signup, // 이제 (userData)를 받습니다
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};