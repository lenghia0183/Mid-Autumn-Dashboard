import { Form, Formik } from "formik";
import FormikTextField from "./../../components/Formik/FormikTextField";
import * as Yup from "yup";
import Button from "../../components/Button";
import Breadcrumb from "../../components/Breadcrumb";
import Divider from "../../components/Devider";
import Icon from "../../components/Icon";
import { useTranslation } from "react-i18next";
import FormikTextArea from "../../components/Formik/FormikTextArea";
import { TEXTFIELD_ALLOW } from "../../constants/common";
import { PAGE_TITLE, PATH } from "../../constants/path";
import Comment from "../Home/Comment";
import useBreakpoint from "../../hooks/useBreakpoint";

function ContactUs() {
  const { t } = useTranslation();
  const isLargerThanSm = useBreakpoint("sm");

  const validationSchema = Yup.object({
    name: Yup.string().required(t("validation.required")),
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required("Email là bắt buộc"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, t("validation.invalidPhoneNumber"))
      .required("Số điện thoại là bắt buộc"),
    message: Yup.string().required(t("validation.required")),
  });

  // Initial values
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log("Form values:", values);
  };

  const breadcrumbContact = [
    {
      label: PAGE_TITLE.HOME,
      path: PATH.HOME,
    },
    {
      label: PAGE_TITLE.CONTACT,
      path: PATH.CONTACT,
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbContact} />

      <div className="container shadow-md py-14">
        <h3 className="sm:text-[35px] text-3xl w-[80%] m-auto text-dark font-semibold text-center">
          {t("contact.title")}
        </h3>
        <p className="xl:w-[60%] w-full m-auto mt-5  text-xl text-dark-400 text-center font-medium">
          {t("contact.desc")}
        </p>

        <div className="container py-14 flex xl:flex-row flex-col gap-14">
          <div className="flex-1">
            <h2 className="sm:text-[35px] text-3xl font-semibold text-dark  p-4">
              {t("contact.contactInfo")}
            </h2>
            <Divider />

            <div className="flex flex-col gap-y-5 text-xl font-medium mt-7">
              <div className="flex sm:flex-row flex-col items-start sm:items-center sm:gap-2 gap-1">
                <div className="flex gap-2 items-center">
                  <Icon name="location" size="1.2em" color="emerald" />
                  <p className="text-emerald">{t("contact.address")}</p>
                </div>
                <p>{t("shopInfo.address")}</p>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="phone" size="1.2em" color="emerald" />
                <p className="text-emerald">{t("contact.phone")} </p>
                <p className="">{t("shopInfo.phoneNumber")}</p>
              </div>

              <div className="flex sm:flex-row flex-col items-start sm:items-center sm:gap-2 gap-1">
                <div className="flex gap-2 items-center">
                  <Icon name="email" size="1.2em" color="emerald" />
                  <p className="text-emerald"> {t("contact.phone")}</p>
                </div>
                <p>{t("shopInfo.email")}</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ resetForm }) => (
                <Form>
                  <div className="flex flex-col sm:gap-6 gap-14 mt-7">
                    <FormikTextField
                      name="name"
                      label={t("contact.name")}
                      orientation={isLargerThanSm ? "horizontal" : "vertical"}
                      labelClassName="font-medium"
                      rightIcon={
                        <Icon name="user" size="1.5em" color="gray-400" />
                      }
                      required
                    />

                    <FormikTextField
                      name="email"
                      label={t("contact.email")}
                      orientation={isLargerThanSm ? "horizontal" : "vertical"}
                      labelClassName="font-medium"
                      type="email"
                      rightIcon={
                        <Icon name="email" size="1.5em" color="gray-400" />
                      }
                      required
                    />

                    <FormikTextField
                      name="phone"
                      label={t("contact.phone")}
                      orientation={isLargerThanSm ? "horizontal" : "vertical"}
                      labelClassName="font-medium"
                      rightIcon={
                        <Icon name="phone" size="1.5em" color="gray-400" />
                      }
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />

                    <FormikTextArea
                      name="message"
                      label={t("contact.message")}
                      orientation={isLargerThanSm ? "horizontal" : "vertical"}
                      labelClassName="font-medium"
                      required
                    />
                  </div>
                  <div className="flex mt-10">
                    <div className="flex gap-4 mr-auto">
                      <Button
                        type="submit"
                        rounded
                        className="text-xl"
                        size="large"
                        startIcon={<Icon name="send" size="1em" />}
                      >
                        {t("common.send")}
                      </Button>

                      <Button
                        type="button"
                        rounded
                        className="text-xl"
                        size="large"
                        bgColor="dark-500"
                        bgHoverColor="dark"
                        textHoverColor="white"
                        startIcon={<Icon name="refresh" size="1.2em" />}
                        onClick={() => resetForm()}
                      >
                        {t("common.cancel")}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <Comment />
    </>
  );
}

export default ContactUs;
