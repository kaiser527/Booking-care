import React from "react";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";

const HomePage = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div>
      <HomeHeader isShowBanner={true} />
      <Specialty settings={settings} />
      <MedicalFacility settings={settings} />
      <OutStandingDoctor settings={settings} />
      <HandBook settings={settings} />
      <About />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
