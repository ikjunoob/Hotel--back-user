import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../../context/AuthContext";

/* Swiper 관련 import */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "../../styles/pages/auth/LoginPage.scss";

/* 슬라이드 이미지 배열 */
const loginImages = [
  "/images/login-bg-1.jpg",
  "/images/login-bg-2.jpg",
  "/images/login-bg-3.jpg"
];

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  /* 이메일, 비밀번호 입력값을 저장할 state */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  /* 로그인 버튼 클릭 핸들러 */
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 1. 실제 서버 로그인 함수 호출 (email, password 전달)
    const isSuccess = await login(email, password);

    // 2. 로그인 성공 시 홈으로 이동
    if (isSuccess) {
      navigate("/"); 
    } else {
      // 실패 시 처리 (필요 시 추가)
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* 1. 왼쪽 폼 영역 */}
        <div className="form-section">
          <h1 className="title">Login</h1>
          <p className="subtitle">로그인해주세요</p>

          <form className="login-form" onSubmit={handleLogin}>
            {/* 이메일 입력 */}
            <div className="input-group">
              <input 
                type="email" 
                id="email" 
                placeholder="john.doe@gmail.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>

            {/* 비밀번호 입력 */}
            <div className="input-group">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="...................." 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <span 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>

            {/* 체크박스 & 비밀번호 찾기 */}
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>비밀번호 기억하기</span>
              </label>
              {/* ✅ [수정 완료] class -> className 으로 변경 */}
              <Link to="/reset-password" className="forgot-link">Forgot Password</Link>
            </div>

            {/* 로그인 버튼 */}
            <button type="submit" className="btn-login">Login</button>

            {/* 회원가입 링크 */}
            <div className="signup-link">
              <Link to="/signup">회원가입</Link>
            </div>

            <div className="divider">
              <span>Or login with</span>
            </div>

            {/* 소셜 로그인 버튼 */}
            <div className="social-login">
              <button type="button" className="social-btn facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </button>
              <button type="button" className="social-btn google">
                <FontAwesomeIcon icon={faGoogle} />
              </button>
              <button type="button" className="social-btn apple">
                <FontAwesomeIcon icon={faApple} />
              </button>
            </div>
          </form>
        </div>

        {/* 2. 오른쪽 이미지 영역 (Swiper 적용) */}
        <div className="image-section">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true} 
            speed={1000} 
            autoplay={{ delay: 3000, disableOnInteraction: false }} 
            pagination={{ clickable: true }} 
            modules={[Autoplay, Pagination]}
            className="login-swiper"
          >
            {loginImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Login Resort ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;