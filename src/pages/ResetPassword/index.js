import React from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/Formik/FormikTextField";
import { PATH } from "../../constants/path";
import Button from "../../components/Button";

import validationSchema from "./schema";
import { useTranslation } from "react-i18next";
import { TEXTFIELD_ALLOW } from "../../constants/common";

import { useResetPassword } from "../../service/https";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getLocalStorageItem } from "../../utils";

function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { trigger: handleResetPassword, isMutating: isResetPasswordLoading } =
    useResetPassword();

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    const convertValue = {
      newPassword: values.newPassword,
      tokenVerifyOtp: getLocalStorageItem("tokenVerifyOtp"),
    };

    handleResetPassword(convertValue, {
      onSuccess: (response) => {
        if (response?.code === 200) {
          toast.success(t("resetPassword.toast.successMessage"));
          navigate(PATH.LOGIN, { replace: true });
        } else {
          toast.error(response?.message);
        }
      },
      onError: () => {
        toast.error(t("common.toast.hasErrorTryAgainLater"));
      },
    });
  };

  return (
    <>
      <h2 className="text-[40px] text-dark font-medium">
        {t("resetPassword.title")}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikTextField
            name="newPassword"
            label={t("resetPassword.newPassword")}
            type="password"
            className="mt-10"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
            inputProps={{ minLength: 6 }}
          />

          <FormikTextField
            name="confirmPassword"
            label={t("resetPassword.confirmPassword")}
            type="password"
            className="mt-6"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
            inputProps={{ minLength: 6 }}
          />

          <p className="text-gray-500 mr-2 mt-6 w-[80%]">
            {t("resetPassword.description")}
          </p>

          <Button type="submit" className="mt-5 px-8 py-3 !text-xl">
            {t("resetPassword.submitButton")}
          </Button>

          <Button
            to={PATH.LOGIN}
            size="zeroPadding"
            className="text-lg font-semibold text-emerald hover:text-yellow mt-4"
          >
            {t("resetPassword.backToLogin")}
          </Button>

          <div className="flex items-center text-lg mt-4">
            <p className="text-gray-500 mr-2">{t("resetPassword.noAccount")}</p>
            <Button
              to={PATH.SIGN_UP}
              size="zeroPadding"
              className="text-lg font-semibold text-emerald hover:text-yellow"
            >
              {t("resetPassword.signUp")}
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default ResetPassword;
