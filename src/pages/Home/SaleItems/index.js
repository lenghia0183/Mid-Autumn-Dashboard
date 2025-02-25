import Slider from "react-slick";
import ItemCard from "../../../components/ItemCard";
import IconButton from "../../../components/IconButton";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGetProduct } from "../../../service/https";
import ProductListSkeleton from "../../../components/Skeletons/ProductListSkeleton";

function SaleItems() {
  const {
    data,
    mutate: refreshGetProduct,
    isLoading: isGettingProductList,
    isValidating: isValidatingProductList,
  } = useGetProduct({
    limit: 6,
    page: 1,
  });

  const saleItems = data?.data?.products || [];
  const isLoading = isGettingProductList || isValidatingProductList;

  const slider = useRef();
  const { t } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    arrow: false,
    responsive: [
      {
        breakpoint: 1024, // 1024px
        settings: {
          slidesToShow: 2, // Hiển thị 3 slide
        },
      },
      {
        breakpoint: 480, // 480px
        settings: {
          slidesToShow: 1, // Hiển thị 1 slide
        },
      },
    ],
  };

  return (
    <section className="container mt-14">
      <h4 className="sm:text-xl text-lg text-emerald font-medium text-center">
        {t("common.midAutumnFestival")}
      </h4>
      <h3 className="xl:text-[42px] text-3xl font-semibold text-dark text-center mt-2">
        {t("home.saleItems.title")}
      </h3>
      <p className="xl:text-xl text-lg text-dark font-medium text-center w-[70%] m-auto  mb-7">
        {t("home.saleItems.desc")}
      </p>
      {isLoading ? (
        <ProductListSkeleton count={4} />
      ) : saleItems.length > 2 ? (
        <div className="relative">
          <IconButton
            type="button"
            className="absolute top-1/2 -translate-y-1/2 left-[-50px] hidden sm:flex"
            iconName="arrowSlider"
            variant="contained"
            size="small"
            bgColor="emerald"
            textColor="white"
            bgHoverColor="yellow"
            iconSize={1.5}
            onClick={() => {
              slider?.current?.slickPrev();
            }}
          />

          <IconButton
            type="button"
            className="rotate-180 absolute top-1/2 -translate-y-1/2 right-[-50px] hidden sm:flex"
            iconName="arrowSlider"
            variant="contained"
            size="small"
            bgColor="emerald"
            textColor="white"
            bgHoverColor="yellow"
            iconSize={1.5}
            onClick={() => {
              slider?.current?.slickNext();
            }}
          />

          <Slider ref={slider} {...settings}>
            {saleItems.map((item, index) => {
              return (
                <div className="" key={index}>
                  <ItemCard
                    product={item}
                    className="mx-2"
                    refreshGetProduct={refreshGetProduct}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <div className="flex justify-center gap-4">
          {saleItems?.map((item, index) => (
            <div className="w-[25%]" key={index}>
              <ItemCard product={item} refreshGetProduct={refreshGetProduct} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SaleItems;
