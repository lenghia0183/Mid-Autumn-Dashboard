import { Form, Formik } from "formik";
import FormikTextField from "./../../components/Formik/FormikTextField";
import * as Yup from "yup";
import Button from "../../components/Button";
import useBreakpoint from "../../hooks/useBreakpoint";
import validationSchema from "./schema";
import { useTranslation } from "react-i18next";
import { useChangePassword } from "../../service/https/auth";
import { validateStatus } from "../../utils/api";
import { toast } from "react-toastify";

function ChangePassword() {
  const isLargerThanSm = useBreakpoint("sm");
  const { t } = useTranslation();

  const { trigger: handleChangePassword } = useChangePassword();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    handleChangePassword(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: (response) => {
          if (validateStatus(response?.code)) {
            toast.success(response?.message);
            resetForm();
          } else {
            toast.error(response?.message);
            resetForm();
          }
        },
        onError: (error) => {
          toast.error(error?.message);
          resetForm();
        },
      }
    );
  };

  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-dark shadow-md p-4">
        {t("changePassword.title")}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <div className="flex flex-col gap-6 sm:gap-y-6 gap-y-14 sm:mt-7 mt-14">
              <FormikTextField
                name="currentPassword"
                label={t("changePassword.currentPassword")}
                type="password"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelWidth="200px"
                labelClassName="font-medium"
                rightIconClassName="text-gray-500"
                required
              />

              <FormikTextField
                name="newPassword"
                label={t("changePassword.newPassword")}
                type="password"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelWidth="200px"
                labelClassName="font-medium"
                rightIconClassName="text-gray-500"
                required
              />

              <FormikTextField
                name="confirmPassword"
                label={t("changePassword.confirmPassword")}
                type="password"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelWidth="200px"
                labelClassName="font-medium"
                rightIconClassName="text-gray-500"
                required
              />
            </div>
            <div className="flex mt-10">
              <div className="flex gap-4 ml-auto">
                <Button
                  type="button"
                  onClick={() => resetForm()} // Reset form on button click
                >
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

export default ChangePassword;
