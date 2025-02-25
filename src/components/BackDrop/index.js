import React, { useEffect } from "react";
import clsx from "clsx";
import Loading from "./../Loading/index";
import useBreakpoint from "./../../hooks/useBreakpoint";

const Backdrop = ({ open, onClick, className }) => {
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (open) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [open]);

  const isLagerThanSm = useBreakpoint("sm");

  return (
    <>
      {open && (
        <div
          className={clsx(
            "fixed inset-0 z-[999] transition duration-300",
            open ? "opacity-100" : "opacity-0",
            className
          )}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
          onClick={onClick}
        >
          <Loading
            width="sm:w-[50px] 40px"
            height="sm:h-[50px] 40px"
            thickness={isLagerThanSm ? "8px" : "6px"}
            color="emerald"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -inset-0translate-y-1/2"
          />
        </div>
      )}
    </>
  );
};

export default Backdrop;
