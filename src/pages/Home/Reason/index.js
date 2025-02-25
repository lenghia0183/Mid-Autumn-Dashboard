import React from "react";
import clsx from "clsx";
import Image from "../../../components/Image";
import images from "../../../asset/images";
import styles from "./Reason.module.scss";
import { useTranslation } from "react-i18next";

function Reason({
  containerClassName,
  titleClassName,
  headingClassName,
  descClassName,
}) {
  const { t } = useTranslation();

  return (
    <div className={clsx("container xl:flex gap-10 mt-14", containerClassName)}>
      <div
        className={clsx("flex-1 aspect-[5/4]", styles["flip-box-container"])}
      >
        <div className={styles["flip-box-inner"]}>
          <div className={styles["flip-box-front"]}>
            <Image src={images.homeReason} />
          </div>
          <div className={styles["flip-box-back"]}>
            <Image src={images.home1} />
          </div>
        </div>
      </div>
      <div className="flex-1 sm:mt-1 mt-3">
        <h3 className={clsx("text-2xl text-emerald", titleClassName)}>
          {t("home.reason.title")}
        </h3>
        <h2
          className={clsx(
            "sm:text-[42px] text-3xl text-dark font-medium leading-tight",
            headingClassName
          )}
        >
          {t("home.reason.whyChoiceUs")}
        </h2>
        <p className={clsx("mt-5 text-lg text-dark", descClassName)}>
          {t("home.reason.desc1")}
        </p>
        <p className={clsx("mt-5 text-lg text-dark", descClassName)}>
          {t("home.reason.desc2")}
        </p>
      </div>
    </div>
  );
}

export default Reason;
