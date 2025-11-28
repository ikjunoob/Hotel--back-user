import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/mypage/MyPage.scss';

const MyPaymentPage = () => {
  const navigate = useNavigate();

  // Mock Data: 등록된 카드 목록
  const myCards = [
    { id: 1, name: '신한카드', number: '**** **** **** 1234', isDefault: true },
    { id: 2, name: '현대카드', number: '**** **** **** 5678', isDefault: false },
  ];

  return (
    <div className="mypage-page payment-manage-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h3 className="page-title" style={{ marginBottom: 0, border: 'none' }}>결제 수단 관리</h3>
        <button 
          className="btn btn--primary btn--sm"
          onClick={() => navigate('/payment/add')} // AddPaymentPage로 이동
        >
          + 카드 추가
        </button>
      </div>

      <div className="card-list">
        {myCards.map((card) => (
          <div 
            key={card.id} 
            className="saved-card-item"
            style={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: '1.2rem', 
              padding: '2rem', 
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff'
            }}
          >
            <div className="card-info">
              <div style={{ fontWeight: '700', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                {card.name} {card.isDefault && <span style={{ fontSize: '1.2rem', color: '#2563eb', backgroundColor: '#eff6ff', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', marginLeft: '0.5rem' }}>기본</span>}
              </div>
              <div style={{ color: '#6b7280', fontSize: '1.4rem' }}>{card.number}</div>
            </div>
            <button className="btn btn--ghost btn--sm" style={{ color: '#ef4444' }}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPaymentPage;