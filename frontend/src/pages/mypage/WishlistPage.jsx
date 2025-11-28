import React, { useState } from 'react';
import HotelCard from '../../components/hotel/HotelCard';
import Newsletter from '../../components/common/Newsletter';
import '../../styles/pages/mypage/WishlistPage.scss';

const WishlistPage = () => {

  const [activeTab, setActiveTab] = useState("places");

  const wishlistItems = [
    {
      id: 1,
      name: "CVK Park Bosphorus Hotel Istanbul",
      location: "Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437",
      rating: 5,
      reviews: 371,
      price: 240,
      image: "/images/hotel1.jpg", 
      amenities: "5 Star Hotel",
      options: "20+ Aminities"
    },
    {
      id: 2,
      name: "Eresin Hotels Sultanahmet - Boutique Class",
      location: "Küçükayasofya No. 40 Sultanahmet, Istanbul 34022",
      rating: 4.2,
      reviews: 54,
      price: 104,
      image: "/images/hotel2.jpg",
      amenities: "5 Star Hotel",
      options: "20+ Aminities"
    },
    {
      id: 3,
      name: "Eresin Hotels Sultanahmet - Boutique Class",
      location: "Küçükayasofya No. 40 Sultanahmet, Istanbul 34022",
      rating: 4.2,
      reviews: 54,
      price: 104,
      image: "/images/hotel3.jpg",
      amenities: "5 Star Hotel",
      options: "20+ Aminities"
    }
  ];

  return (
    <div className="wishlist-page">
      <div className="container">
        <h2 className="page-title">Favourites</h2>
        
        {/* ✅ 탭 메뉴 추가 */}
        <div className="wishlist-tabs">
          <div 
            className={`tab-item ${activeTab === 'flights' ? 'active' : ''}`}
            onClick={() => setActiveTab('flights')}
          >
            <span className="tab-title">Flights</span>
            <span className="tab-count">2 marked</span>
          </div>
          <div 
            className={`tab-item ${activeTab === 'places' ? 'active' : ''}`}
            onClick={() => setActiveTab('places')}
          >
            <span className="tab-title">Places</span>
            <span className="tab-count">3 marked</span>
          </div>
        </div>

        <div className="wishlist-grid">
          {/* Places 탭일 때만 호텔 리스트 보여주기 */}
          {activeTab === 'places' && wishlistItems.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
          
          {/* Flights 탭일 때 보여줄 내용 (비어있음) */}
          {activeTab === 'flights' && (
            <div className="empty-state">No flights marked yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;