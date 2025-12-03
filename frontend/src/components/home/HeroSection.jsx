import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBed, faSearch, faChevronRight, faCog, faCreditCard, faUser, faSignOutAlt 
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "../common/LogoutModal"; 
import "../../styles/components/home/HeroSection.scss";

const bgImages = ["/images/hero-bg-1.jpg", "/images/hero-bg-2.jpg", "/images/hero-bg-3.jpg"];

const HeroSection = ({ isCardVisible, onCardEnter, onCardLeave }) => {
  const { logout, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 

  /* ✅ 심플 검색을 위해 destination 상태만 남김 */
  const [destination, setDestination] = useState("");

  const handleLogoutConfirm = () => {
    logout();
    setShowModal(false);
    navigate("/");
  };

  /* ✅ 검색 실행 함수 */
  const handleSearch = () => {
    navigate({
      pathname: "/search",
      search: createSearchParams({ destination }).toString(),
    });
  };

  /* ✅ 엔터키 감지 핸들러 */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); 
    }
  };

  return (
    <div className="hero-section">
      <Swiper
        spaceBetween={0} slidesPerView={1} loop={true} speed={1000}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        className="hero-swiper"
      >
        {bgImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="hero-bg" style={{ backgroundImage: `url(${img})` }}></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="fixed-content-overlay">
        <div className="inner-content">
          <div className="text-area">
            <h1>플러스 호텔 및 다양한<br />숙소를 확인하세요!</h1>
            <p>검색을 통해 요금을 비교하고 무료 취소를 포<br />함한 특가도 확인하세요!</p>
          </div>

          {isCardVisible && (
            <div 
              className="user-dashboard-card"
              onMouseEnter={onCardEnter}
              onMouseLeave={onCardLeave}
            >
              <div className="card-header">
                <div className="avatar-large"></div>
                <div className="user-info">
                  <span className="name">{user ? user.name : "Tomhoon"}</span>
                  <span className="status">Online</span>
                </div>
              </div>
              <ul className="card-menu">
                <li><FontAwesomeIcon icon={faUser} /> 계정 <FontAwesomeIcon icon={faChevronRight} className="arrow"/></li>
                <li><FontAwesomeIcon icon={faCreditCard} /> 결제내역 <FontAwesomeIcon icon={faChevronRight} className="arrow"/></li>
                <li><FontAwesomeIcon icon={faCog} /> 설정 <FontAwesomeIcon icon={faChevronRight} className="arrow"/></li>
                <li className="logout" onClick={() => setShowModal(true)}>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: '1rem'}}/> 로그아웃
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ✅ [수정됨] 하단 검색창: 복잡한 필드 다 지우고 심플하게 변경 */}
      <div className="search-bar-container">
        <h3>Where are you staying?</h3>
        
        <div className="simple-search-box">
          <div className="input-wrapper">
            <FontAwesomeIcon icon={faBed} className="icon"/>
            <input 
              type="text" 
              placeholder="Search places, hotels..." 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={handleKeyDown} 
            />
          </div>
          
          <button className="btn-search" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <LogoutModal isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={handleLogoutConfirm} />
    </div>
  );
};

export default HeroSection;