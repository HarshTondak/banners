import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

import { BannerProvider } from "./utils/BannerContext";
import HeroSection from "./components/HeroSection";
import Dashboard from "./components/Dashboard";
import Banner from "./components/Banner";
import "./index.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bannerRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToBanner = () => {
    if (bannerRef.current) {
      bannerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <BannerProvider>
      <div className="app">
        <HeroSection scrollToBanner={scrollToBanner} />
        <div ref={bannerRef}>
          <Banner />
        </div>
        <div className="burger-menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </div>
        <Dashboard isOpen={isMenuOpen} />
      </div>
    </BannerProvider>
  );
}

export default App;
