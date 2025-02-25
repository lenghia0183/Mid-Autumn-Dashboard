import Slider from "react-slick";

import { useEffect, useRef } from "react";
import IconButton from "../IconButton";
import ItemCard from "../ItemCard";
import clsx from "clsx";
import { useGetProduct } from "../../service/https";

import ProductListSkeleton from "../Skeletons/ProductListSkeleton";

function RelatedProducts({
  className,
  categoryId,
  manufacturerId,
  productId,
  isGettingProductDetail,
}) {
  const {
    data,
    mutate: refreshData,
    isLoading: isGettingProductList,
  } = useGetProduct(
    isGettingProductDetail
      ? null
      : {
          categoryId,
          manufacturerId: [manufacturerId],
          limit: 6,
          page: 1,
        }
  );

  const saleItems = data?.data?.products || [];

  useEffect(() => {
    refreshData();
  }, [productId, categoryId, manufacturerId]);

  const slider = useRef();

  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrow: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isGettingProductDetail || isGettingProductList) {
    return <ProductListSkeleton count={4} className="mt-10" />;
  }

  return (
    <section className={clsx("container sm:mt-14 mt-10", className)}>
      {saleItems.length > 2 ? (
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
                <div key={index}>
                  <ItemCard product={item} className="mx-2" />
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <div className="flex justify-center gap-4">
          {saleItems?.map((item, index) => (
            <div className="xl:w-[25%] w-full" key={index}>
              <ItemCard product={item} refreshGetProduct={refreshData} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RelatedProducts;
