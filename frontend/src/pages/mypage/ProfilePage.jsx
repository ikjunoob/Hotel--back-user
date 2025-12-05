import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../../styles/pages/mypage/ProfilePage.scss";

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");

  // 계정 정보 상태
  const [formData, setFormData] = useState({
    name: user?.name || "Tomhoon",
    email: user?.email || "gnsd9079@gmail.com",
    password: "************",
    phone: "010-5555-5555",
    address: "경기도 화성시 동탄 오산아파트 10동 101호",
    dateOfBirth: "1999-99-99"
  });

  return (
    <div className="profile-page">
      {/* 헤더 영역 */}
      <div className="profile-header">
        <div className="header-bg">
          <div className="gradient-overlay"></div>
        </div>
        <div className="profile-avatar-section">
          <div className="avatar-wrapper">
            <img src="/images/profile-placeholder.png" alt="Profile" className="avatar-img" />
            <button className="btn-upload-photo">
              <FontAwesomeIcon icon={faCamera} />
            </button>
          </div>
          <button className="btn-upload-cover">
            <FontAwesomeIcon icon={faCamera} />
            Upload new cover
          </button>
        </div>
        <div className="profile-info">
          <h2 className="profile-name">Tomhoon</h2>
          <p className="profile-email">gnsd9079@gmail.com</p>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === "account" ? "active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          Account
        </button>
        <button 
          className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
        <button 
          className={`tab-btn ${activeTab === "payment" ? "active" : ""}`}
          onClick={() => setActiveTab("payment")}
        >
          Payment methods
        </button>
      </div>

      {/* Account 탭 콘텐츠 */}
      {activeTab === "account" && (
        <div className="account-content">
          <h3 className="section-title">Account</h3>
          
          <div className="account-fields">
            <div className="field-row">
              <label>Name</label>
              <div className="field-value">
                <span>Tomhoon</span>
                <button className="btn-change">Change</button>
              </div>
            </div>

            <div className="field-row">
              <label>Email</label>
              <div className="field-value">
                <span>gnsd9079@gmail.com</span>
                <button className="btn-change">Change</button>
              </div>
            </div>

            <div className="field-row">
              <label>Password</label>
              <div className="field-value">
                <span>************</span>
                <button className="btn-change">Change</button>
              </div>
            </div>

            <div className="field-row">
              <label>Phone number</label>
              <div className="field-value">
                <span>010-5555-5555</span>
                <button className="btn-change">Change</button>
              </div>
            </div>

            <div className="field-row">
              <label>Address</label>
              <div className="field-value">
                <span>경기도 화성시 동탄 오산아파트 10동 101호</span>
                <button className="btn-change">Change</button>
              </div>
            </div>

            <div className="field-row">
              <label>Date of birth</label>
              <div className="field-value">
                <span>1999-99-99</span>
                <button className="btn-change">Change</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History 탭 콘텐츠 */}
      {activeTab === "history" && (
        <div className="history-content">
          <div className="history-header">
            <h3>예약내역</h3>
            <select className="sort-select">
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="booking-list">
            {[1, 2, 3].map((item) => (
              <div key={item} className="booking-card">
                <div className="booking-date">
                  <div className="date-badge">
                    <span className="day">08</span>
                    <span className="month">DEC</span>
                  </div>
                </div>
                <div className="booking-details">
                  <div className="detail-row">
                    <span className="label">Check In</span>
                    <span className="value">Thur, Dec 8</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Check Out</span>
                    <span className="value">Fri, Dec 9</span>
                  </div>
                </div>
                <div className="booking-time">
                  <div className="time-info">
                    <div className="label">Check In</div>
                    <div className="value">12:00pm</div>
                  </div>
                  <div className="time-info">
                    <div className="label">Room No.</div>
                    <div className="value">On arrival</div>
                  </div>
                </div>
                <button className="btn-download">Download Ticket</button>
                <button className="btn-arrow">›</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment 탭 콘텐츠 */}
      {activeTab === "payment" && (
        <div className="payment-content">
          <h3 className="section-title">결제수단</h3>
          
          <div className="cards-grid">
            {/* 기존 카드 */}
            <div className="payment-card active">
              <div className="card-top">
                <span className="card-label">**** **** ****</span>
                <div className="card-logo">VISA</div>
              </div>
              <div className="card-number">4321</div>
              <div className="card-bottom">
                <div className="card-info">
                  <span className="label">Valid Thru</span>
                  <span className="value">02/27</span>
                </div>
              </div>
            </div>

            {/* 카드 추가 버튼 */}
            <div className="add-card-btn">
              <div className="plus-icon">+</div>
              <span>Add a new card</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
