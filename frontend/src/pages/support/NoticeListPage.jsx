import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/support/Support.scss';

const NoticeListPage = () => {
  // Mock Data
  const notices = [
    { id: 1, title: '시스템 점검 안내', date: '2025-01-10' },
    { id: 2, title: '여름 성수기 예약 안내', date: '2025-06-01' },
  ];

  return (
    <div className="support-page container">
      <div className="inner">
        <h2 className="page-heading">공지사항</h2>
        <ul className="notice-list">
          {notices.map((notice) => (
            <li key={notice.id}>
              <Link to={`/support/notices/${notice.id}`}>
                <span className="notice-title">{notice.title}</span>
                <span className="notice-date">{notice.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoticeListPage;