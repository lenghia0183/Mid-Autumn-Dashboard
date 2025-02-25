import { useTranslation } from "react-i18next";
import images from "../../../asset/images";
import Button from "../../../components/Button";

function Email() {
  const { t } = useTranslation();
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${images.slide2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="xl:py-[100px] sm:py-[80px] py-[60px] flex items-center justify-center mt-14 relative"
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          className="h-full w-full absolute inset-0 pointer-events-none"
        ></div>
        <div className="text-center p-10 z-[1000] w-full">
          <p className="sm:text-2xl text-xl text-yellow font-semibold">
            {t("common.midAutumnFestival")}
          </p>
          <h2 className="xl:text-[50px] sm:text-[40px] text-3xl font-semibold text-white-100 mt-2">
            {t("home.email.title")}
          </h2>

          <div className="container">
            <div className="relative sm:block flex flex-col xl:w-[70%] m-auto xl:mt-10 sm:mt-5 mt-4">
              <input
                className="sm:absolute inset-0 z-0 outline-none rounded-full p-5"
                type="email"
                placeholder={t("home.email.inputPlaceholder")}
              ></input>
              <Button
                rounded
                textColor="white"
                bgColor="emerald"
                bgHoverColor="yellow"
                size="large"
                width="150px"
                height="60px"
                className="sm:ml-auto sm:mr-0 ml-auto mr-auto hover:text-dark font-semibold px-10 mt-5 z-[1000] relative"
              >
                {t("common.register")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Email;
