import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMapMarkerAlt, faStar, faWifi, faSwimmingPool, faUtensils, faSpa, faParking, faTv, faShareAlt, faHeart
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/pages/hotel/HotelDetailPage.scss";

const HotelDetailPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  /* ✅ 날짜 및 인원 상태 */
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [guests, setGuests] = useState(2);

  /* ✅ 더미 데이터 (실제로는 API로 받아올 부분) */
  const hotel = {
    name: "CVK Park Bosphorus Hotel Istanbul",
    address: "Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437",
    rating: 5,
    reviews: 371,
    price: 240,
    description: "이스탄불의 심장부에 위치한 이 럭셔리 호텔은 보스포러스 해협의 숨막히는 전경을 자랑합니다. 우아한 인테리어와 최상급 서비스를 경험해보세요. 탁 트인 수영장과 고급 스파 시설이 완비되어 있습니다.",
    images: [
      "/images/login-bg-1.jpg", // 메인 큰 사진
      "/images/login-bg-2.jpg",
      "/images/login-bg-3.jpg",
      "/images/hero-bg-1.jpg",
      "/images/hero-bg-2.jpg",
    ],
    amenities: [
      { icon: faWifi, name: "Free Wifi" },
      { icon: faSwimmingPool, name: "Pool" },
      { icon: faUtensils, name: "Restaurant" },
      { icon: faSpa, name: "Spa & Sauna" },
      { icon: faParking, name: "Free Parking" },
      { icon: faTv, name: "Smart TV" },
    ]
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FontAwesomeIcon key={i} icon={faStar} className={i < rating ? "star filled" : "star"} />
    ));
  };

  return (
    <div className="hotel-detail-page">
      <div className="container">
        
        {/* 1. 상단 헤더 (이름, 주소, 가격) */}
        <div className="detail-header">
          <div className="header-left">
            <div className="title-row">
              <h1>{hotel.name}</h1>
              <div className="stars">{renderStars(hotel.rating)}</div>
            </div>
            <p className="address">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {hotel.address}
            </p>
          </div>
          <div className="header-right">
            <div className="price-box">
              <span className="price">${hotel.price}</span>
              <span className="unit">/night</span>
            </div>
            <div className="action-buttons">
              <button className="btn-icon"><FontAwesomeIcon icon={faHeart} /></button>
              <button className="btn-icon"><FontAwesomeIcon icon={faShareAlt} /></button>
              <button className="btn-book">Book now</button>
            </div>
          </div>
        </div>

        {/* 2. 이미지 갤러리 (그리드) */}
        <div className="image-gallery">
          <div className="main-image">
            <img src={hotel.images[0]} alt="Main" />
          </div>
          <div className="sub-images">
            {hotel.images.slice(1, 5).map((img, index) => (
              <div key={index} className="sub-image-item">
                <img src={img} alt={`Sub ${index}`} />
                {/* 마지막 사진에 '더보기' 오버레이 예시 */}
                {index === 3 && <div className="more-overlay">+15 Photos</div>}
              </div>
            ))}
          </div>
        </div>

        {/* 3. 하단 콘텐츠 (좌측 정보 + 우측 예약 카드) */}
        <div className="content-wrapper">
          
          {/* 좌측: 상세 설명 및 편의시설 */}
          <div className="left-content">
            <section className="section overview">
              <h3>Overview</h3>
              <p>{hotel.description}</p>
            </section>

            <section className="section amenities">
              <h3>Amenities</h3>
              <div className="amenities-grid">
                {hotel.amenities.map((item, index) => (
                  <div key={index} className="amenity-item">
                    <FontAwesomeIcon icon={item.icon} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="section reviews">
              <h3>Reviews</h3>
              <div className="review-summary">
                <span className="score">{hotel.rating}.0</span>
                <span className="text">Very Good</span>
                <span className="count">({hotel.reviews} reviews)</span>
              </div>
            </section>
          </div>

          {/* 우측: 예약 폼 (Sticky) */}
          <div className="right-sidebar">
            <div className="booking-card">
              <h3>Book your stay</h3>
              
              <div className="date-picker-group">
                <div className="date-field">
                  <label>Check In</label>
                  <DatePicker 
                    selected={checkInDate} 
                    onChange={date => setCheckInDate(date)} 
                    dateFormat="yyyy/MM/dd"
                  />
                </div>
                <div className="date-field">
                  <label>Check Out</label>
                  <DatePicker 
                    selected={checkOutDate} 
                    onChange={date => setCheckOutDate(date)} 
                    dateFormat="yyyy/MM/dd"
                    minDate={checkInDate}
                  />
                </div>
              </div>

              <div className="guest-field">
                <label>Guests</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                </select>
              </div>

              <div className="price-summary">
                <div className="row">
                  <span>${hotel.price} x 1 night</span>
                  <span>${hotel.price}</span>
                </div>
                <div className="row">
                  <span>Service fee</span>
                  <span>$0</span>
                </div>
                <div className="row total">
                  <span>Total</span>
                  <span>${hotel.price}</span>
                </div>
              </div>

              <button className="btn-confirm-book" onClick={() => navigate(`/booking/${hotelId}`)}>
                예약하기
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;