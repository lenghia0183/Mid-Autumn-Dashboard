import React from "react";
import PropTypes from "prop-types";
import Image from "../Image";
import Icon from "../Icon";
import IconButton from "../IconButton";
import clsx from "clsx";
import formatCurrency from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import { useAddProductToFavoriteList } from "../../service/https/favorite";
import { validateStatus } from "../../utils/api";
import { toast } from "react-toastify";
import { useCart } from "../../context";
import { useTranslation } from "react-i18next";

const ItemCard = ({ product, className, refreshGetProduct }) => {
  const navigate = useNavigate();

  const {
    _id,
    name,
    image,
    images,
    price,
    ratings,
    discount,
    inStock,
    manufacturerId,
    isFavorite = false,
  } = product;

  const { t } = useTranslation();

  const { addProductToCart, refreshCart } = useCart();

  const { trigger: addProductToFavoriteList } =
    useAddProductToFavoriteList(_id);

  const discountDecimal = discount / 100;

  const oldPrice = discountDecimal
    ? Math.round(price / (1 - discountDecimal))
    : null;

  const renderStars = (ratings) => {
    const totalStars = 5;
    let stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(ratings)) {
        stars.push(
          <Icon key={i} name="starContained" color="emerald" size={1.5} />
        );
      } else if (i === Math.ceil(ratings)) {
        stars.push(<Icon key={i} name="starHalf" color="emerald" size={1.5} />);
      } else {
        stars.push(
          <Icon key={i} name="starEmpty" color="emerald" size={1.5} />
        );
      }
    }

    return stars;
  };

  return (
    <div>
      <div
        className={clsx(
          "group relative shadow-lg rounded-md bg-white-100 border-gray-300 border transition-all duration-300 hover:-translate-y-1 overflow-hidden",
          className
        )}
      >
        <div
          className={clsx(
            "absolute top-4 -left-[2px] z-[2] w-fit p-2 rounded-br-lg text-white font-medium opacity-90",
            inStock ? "bg-emerald" : "bg-gray-400"
          )}
        >
          {inStock ? t("common.inStock") : t("common.outOfStock")}
          <div
            className={clsx(
              "absolute translate-y-full left-0 bottom-0 w-0 h-0 border-r-[3px] border-b-[5px]",
              inStock ? "border-r-emerald" : "border-r-gray-400",
              "border-b-transparent"
            )}
          ></div>
        </div>

        {/* Hiển thị discount nếu có */}
        {discount > 0 && (
          <div className="absolute top-4 right-4 z-[2] w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-400 text-white font-medium opacity-90">
            -{discount}%
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image || images[0]}
            alt={name}
            className="transition-transform duration-300 group-hover:scale-105 ease-linear absolute inset-0 rounded-md"
          />

          {/* Options */}
          <div
            className="absolute inset-x-0 -bottom-[15px] flex justify-center gap-5 transition-all duration-300 ease-linear transform translate-y-full
        group-hover:translate-y-0 group-hover:bottom-[10px]"
          >
            <IconButton
              type="button"
              iconName="bag"
              textColor="dark"
              width="40px"
              height="40px"
              className="rounded-md px-2 py-1 bg-yellow-500"
              onClick={() => {
                addProductToCart(
                  { productId: _id, quantity: 1 },
                  {
                    onSuccess: (response) => {
                      if (validateStatus(response?.code)) {
                        toast.success(response?.message);
                        refreshCart();
                      } else {
                        toast.error(response?.message);
                      }
                    },
                    onError: () => {
                      toast.error(t("common.hasErrorTryAgainLater"));
                    },
                  }
                );
              }}
            />
            <IconButton
              type="button"
              iconName="search"
              textColor="dark"
              width="40px"
              height="40px"
              className="rounded-md px-2 py-1 bg-yellow-500"
            />
            <IconButton
              type="button"
              iconName="eye"
              textColor="dark"
              width="40px"
              height="40px"
              className="rounded-md px-2 py-1 bg-yellow-500"
              onClick={() => {
                navigate(PATH.PRODUCT_DETAIL.replace(":productId", _id));
              }}
            />
            <IconButton
              type="button"
              iconName="heart"
              textColor={isFavorite ? "crimson" : "dark"}
              width="40px"
              height="40px"
              className="rounded-md px-2 py-1 bg-yellow-500"
              onClick={() => {
                addProductToFavoriteList(
                  {},
                  {
                    onSuccess: (response) => {
                      if (validateStatus(response?.code)) {
                        toast.success(response?.message);
                        refreshGetProduct();
                      } else {
                        toast.error(response?.message);
                      }
                    },
                    onError: () => {
                      toast.error(t("common.hasErrorTryAgainLater"));
                    },
                  }
                );
              }}
            />
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-semibold text-dark mt-2 line-clamp-1">
            {name}
          </h3>
          <div className="flex space-x-1 mt-2">{renderStars(ratings)}</div>
          <div className="text-base font-semibold text-emerald mt-2">
            {manufacturerId?.name}
          </div>
          {/* Price and Old Price */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-bold text-dark">
              {formatCurrency(price)}
            </span>
            {oldPrice && (
              <span className="text-gray-500 font-medium line-through">
                {formatCurrency(oldPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    discount: PropTypes.number,
    state: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemCard;
