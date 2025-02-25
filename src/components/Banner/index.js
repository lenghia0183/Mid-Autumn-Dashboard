import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import images from "../../asset/images";
import Button from "./../Button/index";
import { useTranslation } from "react-i18next";
import { PATH } from "../../constants/path";

const bannerData = [
  {
    id: 1,
    src: images.slide1,

    alt: "Banner 1",
  },
  {
    id: 2,
    src: images.slide2,
    alt: "Banner 2",
  },
  {
    id: 3,
    src: images.slide3,
    alt: "Banner 3",
  },
];

const Banner = () => {
  const { t } = useTranslation();

  const settings = {
    infinite: true,
    speed: 7000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {bannerData.map((banner) => {
          return (
            <>
              <div
                className="w-full xl:h-[700px] sm:h-[600px] h-[350px] bg-[0%_50%]"
                style={{
                  backgroundImage: `url(${banner.src})`,
                  // backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </>
          );
        })}
      </Slider>
      <div
        className="absolute top-[60%] right-0 w-[25%] aspect-square animate-slide-horizontal pointer-events-none hidden xl:block"
        style={{
          backgroundImage: `url(${images.childrenBanner1})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div
        className="absolute xl:-translate-y-1/2  xl:top-1/2 xl:right-[15%] xl:w-[750px] right-0 top-full -translate-y-full w-full p-[30px]"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      >
        <h1 className="text-white sm:text-[50px] text-[22px] font-medium hover:text-yellow text-center duration-500">
          {t("banner.title")}
        </h1>
        <p className="text-[22px] text-yellow text-center font-medium hidden sm:block">
          {t("banner.desc")}
        </p>
        <Button
          to={PATH.PRODUCTS}
          rounded
          bgColor="yellow"
          textColor="dark"
          bgHoverColor="emerald"
          className="sm:text-[18px] text-base h-[45px] font-medium mt-5 sm:px-[40px] duration-500 hover:text-white m-auto"
        >
          {t("banner.itemBtn")}
        </Button>
      </div>
    </div>
  );
};

export default Banner;
