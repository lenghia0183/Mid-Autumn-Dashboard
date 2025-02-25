import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import images from "../../../asset/images";
import { PATH } from "../../../constants/path";

function FirstSection() {
  const { t } = useTranslation();
  return (
    <section className="container grid grid-cols-1 xl:grid-cols-3 xl:grid-rows-2 grid-rows-3 gap-6">
      {/*  Div đầu tiên trải dài 2 cột và 2 hàng*/}
      <div className="col-span-1 xl:col-span-2 row-span-1 xl:row-span-2 overflow-hidden rounded-xl relative">
        <div className="relative w-full xl:aspect-[5/4] aspect-[3/2] overflow-hidden">
          <div
            className="absolute inset-0 transform scale-100 hover:scale-110 duration-500"
            style={{
              backgroundImage: `url(${images.home1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="absolute p-4 md:p-6 text-left ">
            <h2 className="text-xl sm:text-2xl xl:text-3xl font-semibold text-white">
              {t("home.section1.title1")}
            </h2>
            <p className="text-sm md:text-lg font-medium text-white mt-2">
              {t("home.section1.desc1")}
            </p>
            <Button
              rounded
              bgColor="white"
              textColor="emerald"
              bgHoverColor="yellow"
              to={PATH.PRODUCTS}
              className="font-medium mt-4"
            >
              {t("common.byNow")}
            </Button>
          </div>
        </div>
      </div>

      {/* Div thứ hai chiếm phần còn lại của hàng thứ nhất, cột thứ nhất  */}
      <div className="relative w-full xl:aspect-[5/4] aspect-[3/2] rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 transform scale-100 hover:scale-110 duration-500"
          style={{
            backgroundImage: `url(${images.home2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute p-4 md:p-6">
          <h2 className="text-xl sm:text-2xl xl:text-3xl font-semibold text-white">
            {t("home.section1.title2")}
          </h2>

          <Button
            rounded
            to={PATH.PRODUCTS}
            bgColor="white"
            textColor="emerald"
            className="font-medium mt-2"
            bgHoverColor="yellow"
          >
            {t("common.byNow")}
          </Button>
        </div>
      </div>

      {/* Div thứ ba chiếm phần còn lại của hàng thứ hai, cột thứ hai */}
      <div className="relative w-full xl:aspect-[5/4] aspect-[3/2] rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 transform scale-100 hover:scale-110 duration-500"
          style={{
            backgroundImage: `url(${images.slide3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute p-4 md:p-6">
          <h2 className="text-xl sm:text-2xl xl:text-3xl font-semibold text-dark">
            {t("home.section1.title3")}
          </h2>

          <Button
            rounded
            to={PATH.PRODUCTS}
            bgColor="white"
            textColor="emerald"
            className="font-medium mt-2"
            bgHoverColor="yellow"
          >
            {t("common.byNow")}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FirstSection;
