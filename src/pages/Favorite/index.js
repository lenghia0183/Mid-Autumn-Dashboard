import ItemCard from "../../components/ItemCard";
import Pagination from "../../components/Pagination";
import { useEffect } from "react";
import { useGetMyFavorite } from "../../service/https/favorite";
import { useQueryState } from "../../hooks/useQueryState";
import { useTranslation } from "react-i18next";
import ProductListSkeleton from "./../../components/Skeletons/ProductListSkeleton";

function Favorite() {
  const { page } = useQueryState();
  const { t } = useTranslation();
  const {
    data,
    mutate: refreshGetMyFavorite,
    isLoading: isGettingMyFavoriteList,
    isValidating: isValidatingMyFavoriteList,
  } = useGetMyFavorite({
    page: page,
    limit: 6,
  });

  const isLoading = isGettingMyFavoriteList || isValidatingMyFavoriteList;

  useEffect(() => {
    refreshGetMyFavorite();
  }, [page]);

  const items = data?.data?.favorites || [];

  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-dark shadow-md p-4">
        {t("favorite.title")}
      </h2>

      {isLoading ? (
        <ProductListSkeleton className="lg:!grid-cols-3 mt-10" />
      ) : items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                product={item}
                refreshGetProduct={refreshGetMyFavorite}
              />
            ))}
          </div>
          <Pagination
            pageCount={data?.data?.totalPages}
            className="ml-auto mt-10"
          />
        </>
      ) : (
        <p className="text-xl mt-10">{t("favorite.empty")}</p>
      )}
    </div>
  );
}

export default Favorite;
