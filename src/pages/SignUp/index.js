import React from "react";
import { Formik, Form, Field } from "formik";

import FormikTextField from "../../components/Formik/FormikTextField";
import { PATH } from "../../constants/path";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { TEXTFIELD_ALLOW } from "../../constants/common";
import validationSchema from "./schema";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

import { useRegister, useSocialLogin } from "../../service/https/auth";
import { validateStatus } from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

function SignUp() {
  const { t } = useTranslation();
  const { trigger: handleRegister } = useRegister();
  const navigate = useNavigate();
  const { login } = useUser();

  const { trigger: handleSocialLogin, isMutating: isSocialLoginLoading } =
    useSocialLogin();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = (values, { resetForm }) => {
    handleRegister(
      {
        fullname: values?.fullName,
        email: values?.email,
        password: values?.password,
      },
      {
        onSuccess: (response) => {
          if (validateStatus(response?.code)) {
            toast.success(response?.message);
            navigate(PATH.LOGIN);
          } else {
            toast.error(response?.message);
            resetForm();
          }
        },
        onError: () => {
          toast.error("Đăng ký thật bạo vui lòng thử lại");
        },
      }
    );
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      handleSocialLogin(idToken, {
        onSuccess: (response) => {
          if (response?.code === 200) {
            toast.success("Đăng nhập thành công");
            navigate(PATH.HOME);
            login(response?.data);
          } else {
            toast.error(response?.message);
          }
        },
        onError: (error) => {
          toast.error("Đăng nhập thất bại vui lòng thử lại");
        },
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
    }
  };
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      handleSocialLogin(idToken, {
        onSuccess: (response) => {
          if (response?.code === 200) {
            toast.success("Đăng nhập thành công");
            navigate(PATH.HOME);
            login(response?.data);
          } else {
            toast.error(response?.message);
          }
        },
        onError: (error) => {
          toast.error("Đăng nhập thất bại vui lòng thử lại");
        },
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
    }
  };

  return (
    <>
      <h2 className="text-[40px] text-dark font-medium">ĐĂNG KÝ</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <FormikTextField
              name="fullName"
              label="Họ và tên"
              className="mt-10"
              allow={TEXTFIELD_ALLOW.VIETNAMESE}
              required
            />

            {/* <FormikTextField name="address" label="Địa chỉ" className="mt-10" /> */}

            <FormikTextField
              name="email"
              label="Email"
              className="mt-10"
              allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
              required
            />

            <FormikTextField
              name="password"
              label="Mật khẩu"
              type="password"
              className="mt-10"
              rightIconClassName="text-gray-500"
              allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
              required
            />

            <FormikTextField
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type="password"
              className="mt-10"
              rightIconClassName="text-gray-500"
              allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
              required
            />

            <div className="flex items-center text-lg mt-5">
              <p className="text-gray-500 mr-2">- Bạn đã có tài khoản?</p>
              <Button
                to={PATH.LOGIN}
                size="zeroPadding"
                className="text-lg font-semibold text-emerald hover:text-yellow"
              >
                Đăng nhập
              </Button>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="mt-4 px-8 py-3 !text-xl">
                ĐĂNG KÝ
              </Button>

              <Button
                type="button"
                onClick={() => resetForm()}
                className="mt-4 px-8 py-3 !text-xl"
              >
                LÀM LẠI
              </Button>
            </div>

            <div className="flex w-full gap-2 mt-4">
              <Button
                type="button"
                className="flex-1 text-lg w-full"
                bgColor="facebook"
                startIcon={<Icon name="facebook" size={1} />}
                onClick={handleFacebookLogin}
              >
                Facebook
              </Button>

              <Button
                type="button"
                className="flex-1 text-lg w-full"
                bgColor="google"
                startIcon={<Icon name="google" size={1} />}
                onClick={handleGoogleLogin}
              >
                Google
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SignUp;
