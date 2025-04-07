import React from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/Formik/FormikTextField";
import { PATH } from "../../constants/path";
import Button from "../../components/Button";

import validationSchema from "./schema";
import { useTranslation } from "react-i18next";
import { TEXTFIELD_ALLOW } from "../../constants/common";

import { useLogin } from "../../service/https";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const { t } = useTranslation();
  const { login } = useUser();
  const navigate = useNavigate();

  const { trigger: handleLogin, isMutating: isLoginLoading } = useLogin();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const convertValue = {
      email: values.email,
      password: values.password,
    };

    handleLogin(convertValue, {
      onSuccess: (response) => {
        if (response?.code === 200) {
          toast.success(t("login.toast.success"));
          navigate(PATH.DASHBOARD);
          login(response?.data);
        } else {
          toast.error(response?.message);
        }
      },
      onError: () => {
        toast.error(t("login.toast.failed"));
      },
    });
  };

  return (
    <>
      <h2 className="text-[40px] text-dark font-medium">{t("login.title")}</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikTextField
            name="email"
            label={t("login.email")}
            className="mt-10"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
          />
          <FormikTextField
            name="password"
            label={t("login.password")}
            type="password"
            className="mt-10"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
            rightIconClassName="!text-gray-500"
          />

          <Button type="submit" className="mt-10 px-8 py-3 !text-xl">
            {t("login.title")}
          </Button>
          <p className="mt-4 text-lg text-gray-600">{t("login.desc01")}</p>
          <p className="mt-2 text-gray-500">{t("login.desc02")}</p>
        </Form>
      </Formik>
    </>
  );
}

export default Login;
