import React from 'react';
import '../../styles/pages/mypage/MyPage.scss';

const MyOverviewPage = () => {
  return (
    <div className="mypage-page overview-page">
      <h3 className="page-title">대시보드</h3>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="label">예약 예정</span>
          <strong className="value">1건</strong>
        </div>
        <div className="stat-card">
          <span className="label">보유 포인트</span>
          <strong className="value">2,500 P</strong>
        </div>
        <div className="stat-card">
          <span className="label">쿠폰</span>
          <strong className="value">3장</strong>
        </div>
      </div>

      <div className="recent-section">
        <h4>최근 예약 내역</h4>
        <div className="empty-state">
          최근 예약된 내역이 없습니다.
        </div>
      </div>
    </div>
  );
};

export default MyOverviewPage;