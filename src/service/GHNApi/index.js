import { ghnApi } from "../api";

export const getProvinceDataTest = () => {
  const url = "/master-data/province";
  return ghnApi.get(url);
};

export const getDistrictDataTest = (provinceId) => {
  const url = "/master-data/district";
  return ghnApi.get(url, {
    province_id: provinceId,
  });
};

export const getWardDataTest = (districtID) => {
  console.log(districtID);
  const url = "/master-data/ward";
  return ghnApi.get(url, {
    district_id: districtID,
  });
};

export const getShipPriceTest = (data) => {
  const url = "/v2/shipping-order/fee";
  return ghnApi.post(url, data);
};
