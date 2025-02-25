import React, { useEffect, useState } from "react";
import Icon from "../Icon";
import clsx from "clsx";

const GoToTop = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    setScrollPercentage(Math.floor(scrolled));
  };

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      onClick={handleGoToTop}
      className={clsx(
        "fixed cursor-pointer flex items-center justify-center transition-all duration-300",
        {
          "bottom-4 right-4": scrollPercentage > 0,
        },
        {
          "bottom-4 -right-4 translate-x-full": scrollPercentage === 0,
        }
      )}
    >
      <div className="relative flex items-center justify-center w-[50px] h-[50px] rounded-full">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            borderRadius: "50%",
            background: `conic-gradient(#005957 ${scrollPercentage}%, #f7a825 ${scrollPercentage}%)`,
          }}
        />
        <div className="absolute inset-[2px] bg-white rounded-full flex items-center justify-center text-emerald text-lg">
          <Icon name="arrowDown" className="rotate-180" size="1.5" />
        </div>
      </div>
    </div>
  );
};

export default GoToTop;
