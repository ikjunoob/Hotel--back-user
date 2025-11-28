/* src/components/common/Header.jsx */
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faPlane,
  faHeart,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "./LogoutModal";
import "../../styles/components/common/Header.scss";

const Header = ({ onMouseEnter, onMouseLeave }) => {
  const { isAuthenticated, login, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setShowModal(false);
    navigate("/");
  };

  /* 현재 페이지 확인 */
  const isWishlistPage = location.pathname === "/wishlist";
  const isSearchPage = location.pathname === "/search";

  return (
    <>
      {/* 찜하기 페이지일 때 'wishlist-header' 클래스 추가 */}
      <header className={`header ${isWishlistPage ? "wishlist-header" : ""}`}>
        <div className="inner">
          {isWishlistPage ? (
            /* ==============================
               CASE 1: 찜하기 페이지용 헤더
               ============================== */
            <>
              <div className="header-left wishlist-mode">
                <Link to="/flights" className="nav-item">
                  <FontAwesomeIcon icon={faPlane} /> Find Flight
                </Link>
                <Link to="/hotels" className="nav-item">
                  <FontAwesomeIcon icon={faBed} /> Find Stays
                </Link>
              </div>

              <div className="header-center">
                <Link to="/" className="logo">
                  <span className="logo-text">golobe</span>
                </Link>
              </div>

              <div className="header-right wishlist-mode">
                {/* 찜하기 버튼 (활성화 표시) */}
                <Link to="/wishlist" className="menu-text active">
                  <FontAwesomeIcon icon={faHeart} /> Favourites
                </Link>
                <span className="divider">|</span>

                {isAuthenticated ? (
                  <>
                    <div
                      className="user-simple"
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                    >
                      <div className="avatar-circle"></div>
                      <span>{user && user.name ? user.name : "Tomhoon"}</span>
                    </div>
                    <button
                      className="btn-logout"
                      onClick={() => setShowModal(true)}
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <button
                    className="btn-login"
                    onClick={() => navigate("/login")}
                  >
                    로그인
                  </button>
                )}
              </div>
            </>
          ) : (
            /* ==============================
               CASE 2: 일반 페이지용 헤더
               ============================== */
            <>
              <div className="header-left">
                <Link to="/" className="logo">
                  {/* 검색 페이지면 침대 아이콘 + Find Stays, 아니면 호텔 아이콘 + Hotels */}
                  <FontAwesomeIcon icon={isSearchPage ? faBed : faHotel} />
                  <span>{isSearchPage ? "Find Stays" : "Hotels"}</span>
                </Link>
              </div>

              <div className="header-right">
                <Link to="/wishlist" className="menu-item">
                  <FontAwesomeIcon icon={faHeart} />
                  <span>찜하기</span>
                </Link>

                <div className="separator">|</div>

                {isAuthenticated ? (
                  <>
                    <div
                      className="user-simple"
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                    >
                      <div className="avatar-circle"></div>
                      <span>{user && user.name ? user.name : "Tomhoon"}</span>
                    </div>
                    <button
                      className="btn-logout"
                      onClick={() => setShowModal(true)}
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <button
                    className="btn-login"
                    onClick={() => navigate("/login")}
                  >
                    로그인
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      <LogoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Header;
