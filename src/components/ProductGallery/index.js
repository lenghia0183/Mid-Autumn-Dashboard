import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductGallery.scss";
import IconButton from "../IconButton";
import "./ProductGallery.scss";

const ProductGallery = ({ images }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  // Slider settings for the main banner
  const mainSliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    asNavFor: nav2,
    ref: (slider) => (sliderRef1 = slider),
  };

  // Slider settings for the navigation slider (thumbnails)
  const navSliderSettings = {
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    asNavFor: nav1,
    ref: (slider) => (sliderRef2 = slider),
  };

  return (
    <div className="slider-container">
      <div className="relative">
        <IconButton
          className="absolute top-1/2 -translate-y-1/2 left-[10px] z-[100]"
          iconName="arrowSlider"
          variant="contained"
          size="small"
          bgColor="emerald"
          textColor="white"
          bgHoverColor="yellow"
          iconSize={1.5}
          onClick={() => {
            nav1?.slickPrev();
          }}
        />

        <IconButton
          className="rotate-180 absolute top-1/2 -translate-y-1/2 right-[10px] z-[100]"
          iconName="arrowSlider"
          variant="contained"
          size="small"
          bgColor="emerald"
          textColor="white"
          bgHoverColor="yellow"
          iconSize={1.5}
          onClick={() => {
            nav1?.slickNext();
          }}
        />

        {/* Main Slider */}
        <Slider
          {...mainSliderSettings}
          className="main-slider bg-white-100 border border-gray-300 rounded-md overflow-hidden"
        >
          {images?.map((image, index) => (
            <>
              <div
                key={index}
                className="w-full aspect-square"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </>
          ))}
        </Slider>
      </div>

      {/* Navigation Slider */}
      <Slider {...navSliderSettings} className="nav-slider -ml-1 mt-2">
        {images?.map((image, index) => (
          <>
            <div className="mx-1" key={index}>
              <div
                className="nav-slider-item cursor-pointer w-full aspect-square object-cover rounded-md bg-white-100 border border-gray-300"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          </>
        ))}
      </Slider>
    </div>
  );
};

export default ProductGallery;
