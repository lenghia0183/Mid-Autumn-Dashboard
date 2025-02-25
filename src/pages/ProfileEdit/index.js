import { Form, Formik } from "formik";
import FormikTextField from "./../../components/Formik/FormikTextField";
import Button from "../../components/Button";
import useBreakpoint from "../../hooks/useBreakpoint";
import validationSchema from "./schema";
import { useTranslation } from "react-i18next";
import FormikAutoComplete from "../../components/Formik/FormikAutoComplete";
import {
  getDistrictDataTest,
  getProvinceDataTest,
  getWardDataTest,
} from "../../service/GHNApi";
import { useUser } from "../../context";
import { useGetMe, useUpdateMe } from "./../../service/https/user";
import { validateStatus } from "../../utils/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function ProfileEdit() {
  const isLargerThanSm = useBreakpoint("sm");
  const { t } = useTranslation();

  const { updateUser } = useUser();
  const { trigger: updateMe } = useUpdateMe();
  const { data, mutate: refreshGetUserData } = useGetMe();
  const [userData, setUserData] = useState(data);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  // Initial values with fake data
  const initialValues = {
    name: userData?.fullname,
    email: userData?.email,
    phone: userData?.phone,
    province: userData?.address?.province
      ? {
          ProvinceID: userData?.address?.province.provinceId,
          ProvinceName: userData?.address?.province.provinceName,
        }
      : null,
    district: userData?.address?.district
      ? {
          DistrictID: userData?.address?.district.districtId,
          DistrictName: userData?.address?.district.districtName,
        }
      : null,
    ward: userData?.address?.ward
      ? {
          WardCode: userData?.address?.ward?.wardCode,
          WardName: userData?.address?.ward?.wardName,
        }
      : null,
    street: userData?.address?.street,
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log("Form values:", values);
    const convertValues = {
      fullname: values?.name,
      email: values?.email,
      phone: values?.phone,
      address: {
        province: {
          provinceId:
            values?.province?.provinceId || values?.province?.ProvinceID,
          provinceName:
            values?.province?.provinceName || values?.province?.ProvinceName,
        },
        district: {
          districtId:
            values?.district?.districtId || values?.district?.DistrictID,
          districtName:
            values?.district?.districtName || values?.district?.DistrictName,
        },
        ward: {
          wardCode: values?.ward?.wardCode || values?.ward?.WardCode,
          wardName: values?.ward?.wardName || values?.ward?.WardName,
        },
        street: values?.street,
      },
    };

    updateMe(convertValues, {
      onSuccess: (response) => {
        console.log(response);
        if (validateStatus(response?.code)) {
          toast.success(response?.message);
          refreshGetUserData();
          console.log("response", response);
          updateUser(response?.data);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-dark shadow-md p-4">
        {t("profile.title")}
      </h2>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ resetForm, setFieldValue, values }) => (
          <Form>
            <div className="flex flex-col gap-6 sm:gap-y-6 gap-y-14 sm:mt-7 mt-14">
              <FormikTextField
                name="name"
                labelWidth={"150px"}
                label={t("profile.name")}
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelClassName="font-medium"
                required
                disabled
              />

              <FormikTextField
                name="email"
                labelWidth={"150px"}
                label={t("profile.email")}
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelClassName="font-medium"
                disabled
                required
              />

              <FormikTextField
                name="phone"
                labelWidth={"150px"}
                label={t("profile.phone")}
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelClassName="font-medium"
                required
              />

              <FormikAutoComplete
                name="province"
                label={t("profile.province")}
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelWidth={"150px"}
                asyncRequest={getProvinceDataTest}
                asyncRequestHelper={(res) => {
                  return res?.data;
                }}
                getOptionsLabel={(opt) => opt?.ProvinceName}
                isEqualValue={(opt, val) => opt?.ProvinceID === val?.ProvinceID}
                onChange={() => {
                  setFieldValue("district", null);
                  setFieldValue("ward", null);
                  setFieldValue("street", "");
                }}
                autoFetch={false}
                filterActive={true}
                required
              />

              <FormikAutoComplete
                labelWidth={"150px"}
                name="district"
                label={t("profile.district")}
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                asyncRequest={() => {
                  return getDistrictDataTest(values?.province?.ProvinceID);
                }}
                asyncRequestHelper={(res) => {
                  return res?.data;
                }}
                getOptionsLabel={(opt) => {
                  return opt?.DistrictName;
                }}
                isEqualValue={(opt, val) => opt?.DistrictID === val?.DistrictID}
                onChange={() => {
                  setFieldValue("ward", null);
                  setFieldValue("street", "");
                }}
                disabled={!values?.province}
                autoFetch={false}
                filterActive={true}
                required
              />

              <FormikAutoComplete
                labelWidth={"150px"}
                name="ward"
                label={t("profile.ward")}
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                asyncRequest={() => {
                  return getWardDataTest(values?.district?.DistrictID);
                }}
                asyncRequestHelper={(res) => {
                  return res?.data;
                }}
                getOptionsLabel={(opt) => {
                  return opt?.WardName;
                }}
                isEqualValue={(opt, val) => opt?.WardCode === val?.WardCode}
                onChange={() => {
                  setFieldValue("street", "");
                }}
                autoFetch={false}
                disabled={!values?.district}
                asyncRequestDeps="district"
                filterActive={true}
                required
              />

              <FormikTextField
                name="street"
                labelWidth={"150px"}
                label={t("profile.street")}
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelClassName="font-medium"
                required
              />
            </div>
            <div className="flex mt-10">
              <div className="flex gap-4 ml-auto">
                <Button type="button" onClick={() => resetForm()}>
                  {t("common.cancel")}
                </Button>

                <Button type="submit" className="">
                  {t("common.saveChange")}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileEdit;
