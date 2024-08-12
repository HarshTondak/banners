import React, { useState, useEffect } from "react";
import { useBannerUpdate } from "../utils/BannerContext";
import CountdownTimer from "./CountdownTimer";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(
    JSON.parse(localStorage.getItem("bannerIsVisible") || "true")
  );
  const [timer, setTimer] = useState(
    parseInt(localStorage.getItem("bannerTimer") || "60", 10) * 1000 // Convert to milliseconds
  );
  const { updateTrigger } = useBannerUpdate();

  const [banners, setBanners] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchBanners();
    updateVisibility();
    updateTimer();
  }, [updateTrigger]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "bannerIsVisible") {
        updateVisibility();
      }
      if (e.key === "bannerTimer") {
        updateTimer();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateVisibility = () => {
    const currentVisibility = JSON.parse(
      localStorage.getItem("bannerIsVisible") || "true"
    );
    setIsVisible(currentVisibility);
  };

  const updateTimer = () => {
    const currentTimer = parseInt(
      localStorage.getItem("bannerTimer") || "60",
      10
    );
    setTimer(currentTimer * 1000);
  };

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveImageIndex((prevIndex) => (prevIndex + 1) % banners.length);
          setIsTransitioning(false);
        }, 500); // Half of the transition duration
      }, timer);

      return () => clearInterval(interval);
    }
  }, [banners, timer]);

  const fetchBanners = async () => {
    try {
      const response = await fetch(`${API_URL}/`);
      const data = await response.json();
      setBanners(data);
    } catch (error) {
      console.error("Error fetching banner settings:", error);
    }
  };

  if (!isVisible) {
    return (
      <div className="banner-container">
        <div className="no-banner">Please turn on the Banner Visibility!</div>
      </div>
    );
  } else if (banners.length === 0) {
    return (
      <div className="banner-container">
        <div className="no-banner">No Banners Found! Please add Banners.</div>
      </div>
    );
  }

  return (
    <div className="banner-container">
      {banners.map((item, i) => (
        <div
          key={item.id}
          className={`banner-slide ${activeImageIndex === i ? "active" : ""} ${
            isTransitioning ? "transitioning" : ""
          }`}
        >
          <img src={`${API_URL}/images/${item.image}`} alt="banner" />
          <p className="banner-description">{item.description}</p>
          {activeImageIndex === i && <CountdownTimer duration={timer} />}
        </div>
      ))}
    </div>
  );
};

export default Banner;
