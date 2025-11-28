import React from 'react';
import '../../styles/pages/mypage/MyPage.scss';

const MyAccountPage = () => {
  return (
    <div className="mypage-page account-page">
      <h3 className="page-title">계정 설정</h3>
      
      <section className="setting-section" style={{ marginBottom: '4rem' }}>
        <h4 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>비밀번호 변경</h4>
        <form className="password-form">
          <div className="form-group">
            <label>현재 비밀번호</label>
            <input type="password" placeholder="현재 비밀번호를 입력하세요" className="input--lg" />
          </div>
          <div className="form-group">
            <label>새 비밀번호</label>
            <input type="password" placeholder="새 비밀번호 (8자 이상)" className="input--lg" />
          </div>
          <div className="form-group">
            <label>새 비밀번호 확인</label>
            <input type="password" placeholder="새 비밀번호를 다시 입력하세요" className="input--lg" />
          </div>
          <button type="submit" className="btn btn--primary btn--md" style={{ marginTop: '1rem' }}>
            비밀번호 변경
          </button>
        </form>
      </section>

      <section className="setting-section">
        <h4 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>알림 설정</h4>
        <div className="form-group">
          <label className="control">
            <input type="checkbox" defaultChecked />
            <span>이메일 수신 동의 (이벤트, 할인 정보)</span>
          </label>
        </div>
        <div className="form-group">
          <label className="control">
            <input type="checkbox" defaultChecked />
            <span>SMS 수신 동의 (예약 정보 알림)</span>
          </label>
        </div>
        <button type="button" className="btn btn--secondary btn--md" style={{ marginTop: '1rem' }}>
          설정 저장
        </button>
      </section>
    </div>
  );
};

export default MyAccountPage;