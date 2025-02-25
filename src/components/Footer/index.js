import React from "react";
import Image from "../Image";
import images from "../../asset/images";
import { useTranslation } from "react-i18next";
import useColorClasses from "../../hooks/useColorClasses";
import clsx from "clsx";
import Icon from "../Icon";
import Button from "../Button";
import { PATH } from "../../constants/path";
import Divider from "../Devider";
import { useGetCategory } from "./../../service/https/category";

const Footer = ({
  textColor = "white-100",
  bgColor = "dark-900",
  className,
}) => {
  const { t } = useTranslation();
  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { textColor: newTextColor } = useColorClasses({ textColor });

  const { data: categoryList } = useGetCategory(false) || [];

  return (
    <footer
      className={clsx("w-full py-10", newBgColor, newTextColor, className)}
    >
      <div className="container mx-auto grid gap-10 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
        {/* Column 1 */}
        <div className="flex flex-col mb-4">
          {/* Logo */}
          <Button to={PATH.HOME} className="mb-4 hover:scale-110">
            <Image
              src={images.logo}
              width="w-[150px]"
              height="h-[150px]"
              alt="Shop Logo"
            />
          </Button>

          {/* Shop Info */}
          <div className="flex flex-col gap-y-5">
            <div className="flex items-center gap-2">
              <Icon name="location" size="1.5em" color="yellow" />
              <p>{t("shopInfo.address")}</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon name="phone" size="1.5em" color="yellow" />
              <p>{t("shopInfo.phoneNumber")}</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon name="email" size="1.5em" color="yellow" />
              <p>{t("shopInfo.email")}</p>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-2xl font-medium">{t("footer.itemList.title")}</h3>
          <Divider marginTop="10px" marginBottom="30px" color="dark-600" />
          <div className="flex flex-col gap-y-3">
            {categoryList?.map((category, index) => {
              return (
                <Button
                  key={index}
                  to={`${PATH.PRODUCTS}?filters=${JSON.stringify({
                    category: category?._id,
                  })}`}
                  size="zeroPadding"
                  textColor="white"
                  className="hover:text-yellow"
                >
                  {category?.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-2xl font-medium">
            {t("footer.serviceList.title")}
          </h3>
          <Divider marginTop="10px" marginBottom="30px" color="dark-600" />
          <div className="flex flex-col gap-y-3">
            {Array.from({ length: 2 }, (_, index) => (
              <Button
                key={index}
                to={PATH.HOME}
                size="zeroPadding"
                textColor="white"
                className="hover:text-yellow"
              >
                {t(`footer.serviceList.service${index + 1}`)}
              </Button>
            ))}
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7456.6298516158995!2d105.88085536557655!3d20.859352998337474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135b1798a40dc27%3A0xf7c2339b14b010fc!2zTGnDqm4gUGjGsMahbmcsIFRoxrDhu51uZyBUw61uLCBIYW5vaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1724488545942!5m2!1sen!2s"
            style={{ width: "100%", aspectRatio: "1/1" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="container mt-10">
        <Divider color="dark-600" />
      </div>

      <div className="container grid gap-5 grid-cols-1 sm:grid-cols-3 mt-14">
        {[
          { img: images.truck, title: "freeShipTitle", desc: "freeShipDesc" },
          { img: images.payment, title: "paymentTitle", desc: "paymentDesc" },
          { img: images.refund, title: "refundTitle", desc: "refundDesc" },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-5">
            <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full">
              <Image src={item.img} width="50px" height="50px" />
            </div>
            <div>
              <h4 className="text-2xl font-medium">
                {t(`footer.${item.title}`)}
              </h4>
              <p className="text-base">{t(`footer.${item.desc}`)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Copyright Section */}
      <div className="w-full text-center mt-10">
        <p className="text-white text-base">
          &copy; {new Date().getFullYear()} {t("footer.copyRight")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
