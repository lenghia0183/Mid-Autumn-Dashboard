import React from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/Formik/FormikTextField";
import { PATH } from "../../constants/path";
import Button from "../../components/Button";

import validationSchema from "./schema";

import { TEXTFIELD_ALLOW } from "../../constants/common";

import { useVerifyForgotOTP } from "../../service/https";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getLocalStorageItem, setLocalStorageItem } from "../../utils";
import { useTranslation } from "react-i18next";

function VerifyForgotOTP() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { trigger: handleVerifyForgotOTP, isMutating: isVerifyForgotLoading } =
    useVerifyForgotOTP();

  const initialValues = {
    otp: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const convertValue = {
      otp: values.otp,
      tokenForgot: getLocalStorageItem("tokenForgot"),
    };

    handleVerifyForgotOTP(convertValue, {
      onSuccess: (response) => {
        if (response?.code === 200) {
          toast.success(t("verifyForgotOTP.toast.successMessage"));
          setLocalStorageItem("tokenVerifyOtp", response?.data?.tokenVerifyOtp);
          navigate(PATH.RESET_PASSWORD, { replace: true });
        } else {
          resetForm();
          toast.error(response?.message);
        }
      },
      onError: () => {
        toast.error(t("verifyForgotOTP.toast.errorMessage"));
      },
    });
  };

  return (
    <>
      <h2 className="text-[40px] text-dark font-medium">
        {t("verifyForgotOTP.title")}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikTextField
            name="otp"
            label={t("verifyForgotOTP.otpLabel")}
            className="mt-10"
            allow={TEXTFIELD_ALLOW.NUMERIC}
            inputProps={{
              maxLength: 6,
            }}
          />

          <p className="text-gray-500 mr-2 mt-6 w-[80%]">
            {t("verifyForgotOTP.description")}
          </p>

          <Button type="submit" className="mt-5 px-8 py-3 !text-xl">
            {t("verifyForgotOTP.verifyButton")}
          </Button>

          <Button
            to={PATH.LOGIN}
            size="zeroPadding"
            className="text-lg font-semibold text-emerald hover:text-yellow mt-4"
          >
            {t("verifyForgotOTP.backToLogin")}
          </Button>

          <div className="flex items-center text-lg mt-4">
            <p className="text-gray-500 mr-2">
              {t("verifyForgotOTP.noAccount")}
            </p>
            <Button
              to={PATH.SIGN_UP}
              size="zeroPadding"
              className="text-lg font-semibold text-emerald hover:text-yellow"
            >
              {t("verifyForgotOTP.signUp")}
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default VerifyForgotOTP;
