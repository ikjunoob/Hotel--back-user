import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarAlt,
  faUserFriends,
  faSearch,
  faPlus,
  faMinus,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/pages/search/SearchPage.scss";
import HotelCard from "../../components/hotel/HotelCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  /* 초기값 가져오기 */
  const initialDest = searchParams.get("destination") || "";
  const initialCheckIn = searchParams.get("checkIn")
    ? new Date(searchParams.get("checkIn"))
    : new Date();
  const initialCheckOut = searchParams.get("checkOut")
    ? new Date(searchParams.get("checkOut"))
    : new Date();
  /* ✅ [추가] URL에서 인원/객실 수 가져오기 (없으면 기본값 1, 2) */
  const initialRooms = Number(searchParams.get("rooms")) || 1;
  const initialGuests = Number(searchParams.get("guests")) || 2;

  const [destination, setDestination] = useState(initialDest);
  const [checkInDate, setCheckInDate] = useState(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOut);

  /* ✅ [추가] 인원/객실 상태 및 팝업 상태 */
  const [rooms, setRooms] = useState(initialRooms);
  const [guests, setGuests] = useState(initialGuests);
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  /* ✅ [추가] 카운터 핸들러 */
  const handleCounter = (type, operation) => {
    if (type === "rooms") {
      if (operation === "inc") setRooms((prev) => prev + 1);
      if (operation === "dec" && rooms > 1) setRooms((prev) => prev - 1);
    } else {
      if (operation === "inc") setGuests((prev) => prev + 1);
      if (operation === "dec" && guests > 1) setGuests((prev) => prev - 1);
    }
  };

  // 더미 데이터
  const searchResults = [
    {
      id: 1,
      name: "CVK Park Bosphorus Hotel Istanbul",
      location: "Istanbul",
      rating: 5,
      reviews: 371,
      price: 240,
      image: "/images/hotel1.jpg",
    },
    {
      id: 2,
      name: "Eresin Hotels Sultanahmet",
      location: "Istanbul",
      rating: 4.2,
      reviews: 54,
      price: 104,
      image: "/images/hotel2.jpg",
    },
    {
      id: 3,
      name: "Rixos Pera Istanbul",
      location: "Istanbul",
      rating: 4.8,
      reviews: 120,
      price: 180,
      image: "/images/hotel3.jpg",
    },
  ];

  return (
    <div className="search-page">
      <div className="search-bar-wrapper">
        <div className="search-container">
          {/* Destination */}
          <div className="input-group">
            <label>Enter Destination</label>
            <div className="input-field">
              <FontAwesomeIcon icon={faBed} />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter Destination"
              />
            </div>
          </div>

          {/* Check In */}
          <div className="input-group">
            <label>Check In</label>
            <div className="input-field">
              <DatePicker
                selected={checkInDate}
                onChange={setCheckInDate}
                dateFormat="yyyy-MM-dd"
                className="custom-datepicker"
              />
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
          </div>

          {/* Check Out */}
          <div className="input-group">
            <label>Check Out</label>
            <div className="input-field">
              <DatePicker
                selected={checkOutDate}
                onChange={setCheckOutDate}
                dateFormat="yyyy-MM-dd"
                className="custom-datepicker"
                minDate={checkInDate}
              />
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
          </div>

          {/* ✅ [수정] Rooms & Guests (팝업 적용) */}
          <div className="input-group" style={{ position: "relative" }}>
            <label>Rooms & Guests</label>
            <div
              className="input-field pointer"
              onClick={() => setShowGuestPopup(!showGuestPopup)}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faUserFriends} />
              <span
                className="guest-text"
                style={{
                  marginLeft: "1rem",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  flex: 1,
                }}
              >
                {rooms} Room, {guests} Guests
              </span>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{
                  marginLeft: "auto",
                  fontSize: "1.2rem",
                  transform: `rotate(${showGuestPopup ? "90deg" : "0deg"})`,
                  transition: "transform 0.2s",
                }}
              />
            </div>

            {/* 팝업 내용 */}
            {showGuestPopup && (
              <div
                className="guest-popup"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  background: "#fff",
                  borderRadius: "1.6rem",
                  padding: "2rem",
                  marginTop: "1rem",
                  boxShadow: "0 1rem 3rem rgba(0,0,0,0.15)",
                  zIndex: 20,
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                {/* 방 개수 */}
                <div
                  className="counter-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="label"
                    style={{ fontSize: "1.4rem", fontWeight: 700 }}
                  >
                    Rooms
                  </span>
                  <div
                    className="counter-controls"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                    }}
                  >
                    <button
                      onClick={() => handleCounter("rooms", "dec")}
                      disabled={rooms <= 1}
                      style={btnStyle}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span
                      className="count"
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: 700,
                        width: "1.5rem",
                        textAlign: "center",
                      }}
                    >
                      {rooms}
                    </span>
                    <button
                      onClick={() => handleCounter("rooms", "inc")}
                      style={btnStyle}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>

                <div
                  className="divider"
                  style={{
                    height: "1px",
                    background: "#eee",
                    margin: "1.5rem 0",
                  }}
                ></div>

                {/* 인원 수 */}
                <div
                  className="counter-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="label"
                    style={{ fontSize: "1.4rem", fontWeight: 700 }}
                  >
                    Guests
                  </span>
                  <div
                    className="counter-controls"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                    }}
                  >
                    <button
                      onClick={() => handleCounter("guests", "dec")}
                      disabled={guests <= 1}
                      style={btnStyle}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span
                      className="count"
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: 700,
                        width: "1.5rem",
                        textAlign: "center",
                      }}
                    >
                      {guests}
                    </span>
                    <button
                      onClick={() => handleCounter("guests", "inc")}
                      style={btnStyle}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 검색 버튼 */}
          <button className="btn-search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <div className="container">
        <div className="results-list">
          {searchResults.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ✅ [스타일] 버튼 스타일 객체 (SCSS 파일 없이 인라인으로 빠르게 적용) */
const btnStyle = {
  width: "3.2rem",
  height: "3.2rem",
  borderRadius: "0.8rem",
  border: "none",
  backgroundColor: "#8DD3BB",
  color: "#112211",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export default SearchPage;
