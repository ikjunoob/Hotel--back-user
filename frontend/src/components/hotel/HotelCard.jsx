import React, { useState } from "react"; /* ✅ useState 추가 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStar,
  faHeart,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/hotel/HotelCard.scss";

const HotelCard = ({ hotel }) => {
  /* ✅ 찜하기 상태 관리 (기본값: false) */
  const [isFavorite, setIsFavorite] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={`star ${i < Math.floor(rating) ? "filled" : ""}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="hotel-card-horizontal">
      {/* 1. 왼쪽 이미지 영역 (기존 코드 유지) */}
      <div className="card-left">
        {hotel.image ? (
          <img src={hotel.image} alt={hotel.name} />
        ) : (
          <div className="no-image">No Image</div>
        )}
        <span className="image-count">9 images</span>
      </div>

      {/* 2. 오른쪽 정보 + 가격 + 버튼 (기존 코드 유지) */}
      <div className="card-right">
        {/* 상단 정보 및 가격 (기존 코드 유지) */}
        <div className="card-header-row">
          <div className="info-group">
            <h3 className="hotel-name">{hotel.name}</h3>
            <p className="location">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {hotel.location}
            </p>

            <div className="rating-section">
              <div className="stars">{renderStars(hotel.rating)}</div>
              <span className="review-text">5 Star Hotel</span>
              <span className="amenity-icon">
                <FontAwesomeIcon icon={faCoffee} /> 20+ Amenities
              </span>
            </div>

            <div className="review-score-box">
              <span className="score">4.2</span>
              <span className="text">Very Good</span>
              <span className="count">371 reviews</span>
            </div>
          </div>

          <div className="price-group">
            <span className="label">starting from</span>
            <span className="price">
              ${hotel.price}
              <small>/night</small>
            </span>
            <span className="tax">excl. tax</span>
          </div>
        </div>

        {/* 하단 버튼들 */}
        <div className="card-bottom-row">
          <div className="divider"></div>
          <div className="buttons">
            {/* ✅ [수정됨] 클릭 시 isFavorite 상태 토글 및 스타일 적용 */}
            <button
              className="btn-heart"
              onClick={() => setIsFavorite(!isFavorite)}
              style={{
                backgroundColor: isFavorite ? "#8DD3BB" : "#fff",
                color: isFavorite ? "#fff" : "#112211",
                borderColor: "#8DD3BB",
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className="btn-view">View Place</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
