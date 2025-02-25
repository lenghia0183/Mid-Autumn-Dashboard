import { Form, Formik } from "formik";
import Breadcrumb from "../../components/Breadcrumb";
import FormikQuantityInput from "../../components/Formik/FormikQuantityInput";
import { PATH } from "../../constants/path";
import formatCurrency from "../../utils/formatCurrency";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import Tabs from "../../components/Tabs";
import ProductGallery from "../../components/ProductGallery";
import Divider from "../../components/Devider";
import RelatedProducts from "../../components/RelatedProducts";
import { useGetProductDetail } from "../../service/https";
import { useParams } from "react-router-dom";

import { isArray } from "lodash";
import { useAddProductToCart } from "../../service/https/cart";
import { toast } from "react-toastify";
import { validateStatus } from "../../utils/api";
import { useAddProductToFavoriteList } from "./../../service/https/favorite";
import { useTranslation } from "react-i18next";
import { useQueryState } from "./../../hooks/useQueryState";

import CommentList from "../../components/CommentList";
import ProductDetailSkeleton from "../../components/Skeletons/ProductGallerySkeleton";
import ProductGallerySkeleton from "../../components/Skeletons/ProductGallerySkeleton";
import ProductDetailInfoSkeleton from "../../components/Skeletons/ProductDetailInfo";

function ProductDetail() {
  const params = useParams();

  const { t } = useTranslation();
  const {
    data: itemDetail,
    mutate: refreshGetProductDetail,
    isLoading,
  } = useGetProductDetail(params.productId);

  const { trigger: addProductToCart } = useAddProductToCart();
  const { trigger: addProductToFavoriteList } = useAddProductToFavoriteList(
    params.productId
  );

  const { tab, setTab } = useQueryState();

  const productDetailBreadcrumbs = [
    {
      label: t("pageTitle.home"),
      to: PATH.HOME,
    },
    {
      label: t("pageTitle.product"),
      to: PATH.PRODUCTS,
    },
    {
      label: itemDetail?.categoryId?.name,
    },
  ];

  const newSearch = PATH.PRODUCTS;
  const finalSearch = `${newSearch}?filters=${JSON.stringify({
    category: itemDetail?.categoryId?._id,
  })}`;

  const tagList = [
    {
      label: t("common.autumnCake"),
      to: PATH.PRODUCTS,
    },
    {
      label: itemDetail?.categoryId?.name,
      to: finalSearch,
    },
    {
      label: itemDetail?.name,
      to: PATH.PRODUCT_DETAIL.replace(":productId", itemDetail?._id),
    },
  ];

  const tabList = [
    { label: t("productDetail.productInfo"), value: "product-info" },
    { label: t("productDetail.comment"), value: "comment" },
  ];

  return (
    <>
      <Formik
        initialValues={{ quantity: 1 }}
        onSubmit={(values) => {
          const convertValues = {
            productId: itemDetail?._id,
            quantity: values.quantity,
          };

          addProductToCart(convertValues, {
            onSuccess: (response) => {
              // console.log(response);
              if (validateStatus(response.code)) {
                toast.success(response.message);
              } else {
                toast.error(response?.message);
              }
            },
            onError: () => {
              toast.error(t("productDetail.toast.addProductToCartFailed"));
            },
          });
        }}
      >
        <Form>
          <div className="bg-white">
            <Breadcrumb items={productDetailBreadcrumbs} />
            <div className="container grid grid-cols-12 gap-x-7 py-14 gap-y-10">
              {/* gallery */}
              <div className="xl:col-span-6 col-span-full">
                {isLoading ? (
                  <ProductGallerySkeleton />
                ) : (
                  <ProductGallery
                    images={
                      isArray(itemDetail?.images) ? itemDetail?.images : []
                    }
                  />
                )}
              </div>

              {/* info */}
              <div className="xl:col-span-6 col-span-full text-dark">
                {isLoading ? (
                  <ProductDetailInfoSkeleton />
                ) : (
                  <div>
                    <h1 className="sm:text-[45px] text-[38px] leading-tight font-medium">
                      {itemDetail?.name}
                    </h1>
                    <p className="text-xl font-medium mt-3">
                      {t("productDetail.status")}{" "}
                      <span className="text-emerald">
                        {itemDetail?.inStock
                          ? t("common.inStock")
                          : t("common.outOfStock")}
                      </span>
                    </p>

                    <div className="sm:flex gap-2 text-xl font-medium xl:mt-3 mt-3">
                      <p>
                        {t("productDetail.brand")}
                        <span className="text-emerald ml-3">
                          {itemDetail?.manufacturerId?.name}
                        </span>
                      </p>
                      <p className="sm:inline-block hidden">|</p>
                      <p className="mt-1 xl:mt-0">
                        {t("productDetail.productCode")}
                        <span className="text-emerald ml-3">
                          {itemDetail?.code}
                        </span>
                      </p>
                    </div>
                    <p className="text-[30px] text-emerald font-semibold mt-3">
                      {formatCurrency(itemDetail?.price)}
                    </p>
                    <p className="text-[17px] mt-3">
                      {itemDetail?.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 mt-5">
                      <div className="sm:w-[30%] w-[70%]">
                        <FormikQuantityInput
                          name="quantity"
                          height="50px"
                          buttonClassName="bg-white-100"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-shrink-0 text-xl">
                          {t("productDetail.compare")}
                        </Button>
                        <Button
                          className="flex-shrink-0 text-xl"
                          type="button"
                          onClick={() => {
                            addProductToFavoriteList(
                              {},
                              {
                                onSuccess: (response) => {
                                  // console.log(response);
                                  if (validateStatus(response.code)) {
                                    toast.success(response.message);
                                    refreshGetProductDetail();
                                  } else {
                                    toast.error(response?.message);
                                  }
                                },
                                onError: () => {
                                  toast.error(
                                    t("common.toast.hasErrorTryAgainLater")
                                  );
                                },
                              }
                            );
                          }}
                        >
                          {itemDetail?.isFavorite
                            ? t("productDetail.removeFromFavorite")
                            : t("productDetail.addToFavorite")}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      bgColor="yellow"
                      textColor="dark"
                      bgHoverColor="emerald"
                      textHoverColor="white"
                      size="large"
                      className="sm:mt-5 mt-3 text-xl font-semibold"
                    >
                      {t("productDetail.addToCart")}
                    </Button>

                    <div className="shadow-sm sm:mt-5 mt-3 flex items-center gap-4 py-2 px-3">
                      <Icon name="tag" color="emerald" />
                      <div className="flex sm:flex-row flex-col flex-wrap sm:gap-4 gap-2">
                        {tagList.map((tag, index) => (
                          <div key={index} className="mr-2">
                            <Button
                              className="flex-shrink-0 font-medium"
                              size="zeroPadding"
                              bgColor="white"
                              textColor="dark-300"
                              textHoverColor="emerald"
                              type="button"
                              to={tag.to}
                            >
                              {tag.label}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <Tabs
                  className="sm:mt-5 mt-3"
                  list={tabList}
                  divider={true}
                  value={tab}
                  onChange={(value) => {
                    setTab(value);
                  }}
                >
                  <div className="text-dark-400 text-lg flex flex-col gap-3">
                    <p>
                      {t("productDetail.brand")}{" "}
                      <span>{itemDetail?.manufacturerId?.name}</span>
                    </p>

                    <p>
                      {t("productDetail.category")}{" "}
                      <span>{itemDetail?.categoryId?.name}</span>
                    </p>

                    <p>
                      {t("productDetail.productCode")}{" "}
                      <span>{itemDetail?.code}</span>
                    </p>

                    <p>{itemDetail?.description}</p>
                  </div>
                  <div>
                    <CommentList />
                  </div>
                </Tabs>
              </div>

              <div className="col-span-12 sm:mt-14">
                <h2 className="text-emerald text-[35px] font-medium">
                  {t("productDetail.related")}
                </h2>
                <Divider color="emerald" height="2px" />

                <RelatedProducts
                  manufacturerId={itemDetail?.manufacturerId?._id}
                  categoryId={itemDetail?.categoryId?._id}
                  productId={params.productId}
                  isGettingProductDetail={isLoading}
                />
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}
export default ProductDetail;
