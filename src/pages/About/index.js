import React, { useEffect } from "react";
import Breadcrumb from "./../../components/Breadcrumb/index";
import { PAGE_TITLE, PATH } from "./../../constants/path";
import Image from "../../components/Image";
import images from "../../asset/images";
import Reason from "./../Home/Reason/index";
import Comment from "../Home/Comment";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import CSS của AOS
import { useTranslation } from "react-i18next";

const About = () => {
  const aboutBreadcrumb = [
    {
      label: PAGE_TITLE.HOME,
      to: PATH.HOME,
    },
    {
      label: PAGE_TITLE.ABOUT,
      to: PATH.ABOUT,
    },
  ];

  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Khởi tạo AOS với thời gian hiệu ứng 1 giây
  }, []);

  return (
    <div className="bg-white">
      <Breadcrumb items={aboutBreadcrumb} />
      <div className="container grid xl:grid-cols-2 grid-cols-1 gap-8 items-center mt-14">
        <div className="text-dark text-xl">
          <p className="text-[30px] font-medium text-emerald">
            {t("about.introduction")}
          </p>
          <h2 className="sm:mt-7 mt-3 text-[50px] font-semibold leading-tight">
            {t("common.midAutumnFestival")}
          </h2>

          <div className="rounded-full aspect-square w-full xl:hidden block mt-10">
            <Image
              height="100%"
              width="100%"
              src={images.home1}
              className="rounded-full object-cover h-full"
            />
          </div>

          <p className="sm:mt-10 mt-5">{t("about.desc01")}</p>
          <p className="mt-5">{t("about.desc02")}</p>
          <p className="mt-5">{t("about.desc03")}</p>
          <p className="mt-5">{t("about.desc04")}</p>
        </div>

        <div className="rounded-full aspect-square w-full xl:block hidden">
          <Image
            height="100%"
            width="100%"
            src={images.home1}
            className="rounded-full object-cover h-full"
          />
        </div>
      </div>
      =
      <Reason
        containerClassName="mt-20 "
        titleClassName="text-[30px] font-medium text-emerald"
        headingClassName="!text-[50px] font-semibold"
        descClassName="text-xl"
      />
      <div className="container grid xl:grid-cols-2 gap-8 items-center mt-14">
        <div className="text-dark text-xl flex flex-col">
          <p className="text-[30px] font-medium text-emerald">
            {" "}
            {t("about.introduction")}
          </p>
          <h2 className="mt-7 text-[50px] font-semibold leading-tight">
            {t("about.mission")}
          </h2>

          <div className="xl:hidden block mt-10">
            <Image
              height="90%"
              width="90%"
              src={images.childrenBanner2}
              className="rounded-full object-cover h-full"
            />
          </div>

          <p className="sm:mt-10 mt-5">
            <p className="mt-5">{t("about.desc05")}</p>
          </p>
          <p className="mt-5">
            <p className="mt-5">{t("about.desc06")}</p>
          </p>
          <p className="mt-5">
            <p className="mt-5">{t("about.desc07")}</p>
          </p>
          <p className="mt-5">
            <p className="mt-5">{t("about.desc08")}</p>
          </p>
          <p className="mt-4 text-xl text-dark">
            <p className="mt-5">{t("about.desc09")}</p>
          </p>
        </div>

        <div className="xl:block hidden">
          <Image
            height="90%"
            width="90%"
            src={images.childrenBanner2}
            className="rounded-full object-cover h-full"
          />
        </div>
      </div>
      <div className="container mt-20">
        <h2 className="mt-7 sm:text-[50px] text-[40px] font-semibold text-center text-dark">
          {t("about.staff")}
        </h2>
        <p className="sm:w-[60%] mt-4 mx-auto text-xl text-dark text-center">
          {t("about.desc10")}
        </p>
        <div className="flex sm:flex-row flex-col justify-between gap-5 mt-10">
          {[
            { img: images.chef1, name: "Nguyễn Văn A" },
            { img: images.chef2, name: "Trần Văn B" },
            { img: images.chef3, name: "Lê Công N" },
          ].map((chef, index) => (
            <div
              key={index}
              className="group relative flex-1 overflow-hidden"
              data-aos="slide-up"
            >
              {/* Image with scale on hover */}
              <Image
                height="500px"
                src={chef.img}
                className="rounded-lg object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4">
                <p className="text-white text-2xl font-semibold">{chef.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Comment />
    </div>
  );
};

export default About;
