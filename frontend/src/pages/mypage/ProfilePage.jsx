import React from 'react';
import '../../styles/pages/mypage/MyPage.scss';

const ProfilePage = () => {
  return (
    <div className="mypage-page profile-page">
      <h3 className="page-title">내 프로필</h3>
      <form className="profile-form">
        <div className="form-group">
          <label>이름</label>
          <input type="text" defaultValue="Tomhoon" readOnly className="input--lg" />
        </div>
        <div className="form-group">
          <label>이메일</label>
          <input type="email" defaultValue="test@example.com" readOnly className="input--lg" />
        </div>
        <div className="form-group">
          <label>휴대폰 번호</label>
          <input type="tel" placeholder="010-0000-0000" className="input--lg" />
        </div>
        <button type="submit" className="btn btn--primary btn--lg">저장하기</button>
      </form>
    </div>
  );
};

export default ProfilePage;