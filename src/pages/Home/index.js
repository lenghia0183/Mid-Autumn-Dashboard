import React from "react";

import Banner from "../../components/Banner";
import PopularDishes from "./PopularDishes";
import Reason from "./Reason";
import SaleItems from "./SaleItems";
import Email from "./Email";
import Comment from "./Comment";
import FirstSection from "./FirstSection";
import ThirdSection from "./ThirdSection";

const Home = () => {
  return (
    <>
      <Banner />
      <main className="py-10 md:py-20 bg-white">
        <FirstSection />

        <PopularDishes />

        <ThirdSection />

        <Reason />

        <SaleItems />

        <Email />

        <Comment />
      </main>
    </>
  );
};

export default Home;
