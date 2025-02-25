import { useTranslation } from "react-i18next";
import images from "../../../asset/images";
import ItemCard from "../../../components/ItemCard";
import { useGetProduct } from "../../../service/https";
import ProductListSkeleton from "../../../components/Skeletons/ProductListSkeleton";

function PopularDishes() {
  const { t } = useTranslation();
  const {
    data,
    mutate: refreshGetProduct,
    isLoading: isGettingProductList,
    isValidating: isValidatingProductList,
  } = useGetProduct({
    limit: 4,
    page: 1,
  });

  let popularDishesList = data?.data?.products || [];
  const isLoading = isGettingProductList || isValidatingProductList;
  return (
    <section
      className="mt-10 pb-14"
      style={{
        backgroundImage: `url(${images.productPageBg})`,
      }}
    >
      <h4 className="sm:text-xl text-lg text-emerald font-medium text-center pt-4">
        {t("common.midAutumnFestival")}
      </h4>
      <h2 className="xl:text-[42px] text-3xl font-semibold text-dark text-center mt-2">
        {t("common.popularDishes")}
      </h2>

      {isLoading ? (
        <ProductListSkeleton count={4} className="container mt-10" />
      ) : (
        <div className="xl:flex gap-4 justify-center mt-10 container">
          {popularDishesList.map((dish) => (
            <div className="xl:w-[25%] w-full xl:mt-0 mt-5">
              <ItemCard
                key={dish.id}
                product={dish}
                refreshGetProduct={refreshGetProduct}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PopularDishes;
