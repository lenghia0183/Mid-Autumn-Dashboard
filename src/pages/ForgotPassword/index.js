import React from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/Formik/FormikTextField";
import { PATH } from "../../constants/path";
import Button from "../../components/Button";
import validationSchema from "./schema";
import { useTranslation } from "react-i18next";
import { TEXTFIELD_ALLOW } from "../../constants/common";
import { useForgotPassword } from "../../service/https";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { setLocalStorageItem } from "../../utils";

function ForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { trigger: handleForgotPassword, isMutating: isForgotPasswordLoading } =
    useForgotPassword();

  const initialValues = { email: "", password: "" };

  const handleSubmit = async (values) => {
    const convertValue = { email: values.email };

    handleForgotPassword(convertValue, {
      onSuccess: (response) => {
        if (response?.code === 200) {
          toast.success(t("forgotPassword.toast.otpSuccess"));
          setLocalStorageItem("tokenForgot", response?.data?.tokenForgot);
          navigate(PATH.VERIFY_FORGOT_OTP);
        } else {
          toast.error(response?.message);
        }
      },
      onError: () => {
        toast.error(t("forgotPassword.toast.forgotFailed"));
      },
    });
  };

  return (
    <>
      <h2 className="text-[40px] text-dark font-medium">
        {t("forgotPassword.title")}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikTextField
            name="email"
            label={t("forgotPassword.email")}
            className="mt-10"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
          />

          <p className="text-gray-500 mr-2 mt-6 w-[80%]">
            {t("forgotPassword.otpMessage")}
          </p>

          <Button type="submit" className="mt-5 px-8 py-3 !text-xl">
            {t("forgotPassword.submitButton")}
          </Button>

          <Button
            to={PATH.LOGIN}
            size="zeroPadding"
            className="text-lg font-semibold text-emerald hover:text-yellow mt-4"
          >
            {t("forgotPassword.loginNow")}
          </Button>

          <div className="flex items-center text-lg mt-4">
            <p className="text-gray-500 mr-2">
              {t("forgotPassword.noAccount")}
            </p>
            <Button
              to={PATH.SIGN_UP}
              size="zeroPadding"
              className="text-lg font-semibold text-emerald hover:text-yellow"
            >
              {t("forgotPassword.signUpNow")}
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default ForgotPassword;
