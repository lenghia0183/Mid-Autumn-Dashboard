"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";
import {
  useGetBrandMarketShare,
  useGetOrderByRegion,
  useGetProductDistribution,
  useGetRevenueProfit,
  useGetReviews,
  useGetVisitor,
} from "../../service/https/statistic";
import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { filterOptions } from "./utils/chartUtils";

// Import chart components
import RevenueChart from "./components/RevenueChart";
import ProductDistributionChart from "./components/ProductDistributionChart";
import VisitorChart from "./components/VisitorChart";
import ReviewsChart from "./components/ReviewsChart";
import RegionalOrdersChart from "./components/RegionalOrdersChart";
import BrandMarketShareChart from "./components/BrandMarketShareChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

export default function Dashboard() {
  const innerForm = useRef();
  const [values, setValues] = useState();

  const { data: revenueData, mutate: refreshRevenueData } = useGetRevenueProfit(
    {
      filterBy: innerForm.current?.values?.revenueFilterBy?.value,
    }
  );

  const { data: productDistributionData, mutate: refreshProductDistribution } =
    useGetProductDistribution({
      filterBy: values?.productDistributionFilterBy?.value,
    });

  const { data: brandMarketShareData, mutate: refreshBrandMarketShare } =
    useGetBrandMarketShare({
      filterBy: values?.brandMarketShareFilterBy?.value,
    });

  const { data: orderByRegionData, mutate: refreshOrderByRegion } =
    useGetOrderByRegion({
      filterBy: values?.orderByRegionFilterBy?.value,
    });

  const { data: visitorData, mutate: refreshVisitorData } = useGetVisitor({
    filterBy: values?.visitorFilterBy?.value,
  });

  const { data: reviewsData, mutate: refreshReviewsData } = useGetReviews({
    filterBy: values?.reviewsFilterBy?.value,
  });

  // Set up effect hooks for data refreshing
  useEffect(() => {
    refreshRevenueData();
  }, [values?.revenueFilterBy]);

  useEffect(() => {
    refreshProductDistribution();
  }, [values?.productDistributionFilterBy]);

  useEffect(() => {
    refreshBrandMarketShare();
  }, [values?.brandMarketShareFilterBy]);

  useEffect(() => {
    refreshOrderByRegion();
  }, [values?.orderByRegionFilterBy]);

  useEffect(() => {
    refreshVisitorData();
  }, [values?.visitorFilterBy]);

  useEffect(() => {
    refreshReviewsData();
  }, [values?.reviewsFilterBy]);

  // Filter options
  const filterBy = [
    {
      label: "Ngày",
      value: "day",
    },
    {
      label: "Tuần",
      value: "week",
    },
    {
      label: "Tháng",
      value: "month",
    },
    {
      label: "Năm",
      value: "year",
    },
  ];

  return (
    <Formik
      initialValues={{
        revenueFilterBy: filterBy[2],
        productDistributionFilterBy: filterBy[2],
        brandMarketShareFilterBy: filterBy[2],
        orderByRegionFilterBy: filterBy[2],
        visitorFilterBy: filterBy[2],
        reviewsFilterBy: filterBy[3],
      }}
      enableReinitialize
      innerRef={(ref) => {
        innerForm.current = ref;
        setValues(ref?.values);
      }}
    >
      {({ values }) => {
        return (
          <Form>
            <div className="grid grid-cols-3 gap-6 p-6 bg-gray-100">
              <RevenueChart
                data={revenueData}
                filterValue={values.revenueFilterBy}
              />

              <ProductDistributionChart
                data={productDistributionData}
                filterValue={values.productDistributionFilterBy}
              />

              <VisitorChart
                data={visitorData}
                filterValue={values.visitorFilterBy}
              />

              <ReviewsChart
                data={reviewsData}
                filterValue={values.reviewsFilterBy}
              />

              <RegionalOrdersChart
                data={orderByRegionData}
                filterValue={values.orderByRegionFilterBy}
              />

              <BrandMarketShareChart
                data={brandMarketShareData}
                filterValue={values.brandMarketShareFilterBy}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
