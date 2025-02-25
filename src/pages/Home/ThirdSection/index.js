import { useTranslation } from "react-i18next";
import images from "../../../asset/images";
import Button from "../../../components/Button";
import { PATH } from "../../../constants/path";

function ThirdSection() {
  const { t } = useTranslation();
  return (
    <section
      style={{
        backgroundImage: `url(${images.slide1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className="xl:py-[150px] sm:py-[100px] xl:bg-[50%_50%] sm:bg-[0%_50%] bg-[30%_50%]  flex items-center justify-center mt-10 relative"
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.19)",
        }}
        className="h-full w-full absolute inset-0 pointer-events-none"
      ></div>
      <div className="text-center xl:w-[35%] p-10 z-[1000]">
        <p className="text-xl text-yellow font-semibold">
          {t("common.midAutumnFestival")}
        </p>
        <h2 className="xl:text-[50px] text-[35px]  font-semibold text-white mt-3">
          {t("common.sweetCakes")}
        </h2>
        <Button
          rounded
          textColor="white"
          bgColor="emerald"
          bgHoverColor="yellow"
          textHoverColor="dark"
          size="large"
          to={PATH.PRODUCTS}
          className="m-auto font-semibold px-10 mt-5"
        >
          {t("common.showMenu")}
        </Button>
      </div>
    </section>
  );
}

export default ThirdSection;
