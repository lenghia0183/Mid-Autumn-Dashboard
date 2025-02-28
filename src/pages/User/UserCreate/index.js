import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { getManufacturerList, useAddProduct } from "../../../service/https";
import Image from "../../../components/Image";
import Button from "../../../components/Button";

import { PATH } from "../../../constants/path";
import FormikTextField from "../../../components/Formik/FormikTextField";
import FormikAutoComplete from "../../../components/Formik/FormikAutoComplete";
import { api } from "../../../service/api";
import FormikTextArea from "./../../../components/Formik/FormikTextArea";
import { validateSchema } from "./schema";
import { useTranslation } from "react-i18next";
import {
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from "./../../../constants/common";
import FormikFileInput from "../../../components/FileInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateStatus } from "../../../utils/api";
import { getCategoryList } from "../../../service/https/category";
import RadioGroup from "../../../components/RadioGroup";
import FormikRadio from "../../../components/Formik/FormikRadio";
import { useAddUser } from "../../../service/https/user";

const UserCreate = () => {
  const [reviewList, setReviewList] = useState();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { trigger: handleAddUser } = useAddUser();

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">{t("user.create.title")}</h2>
      <div className="flex gap-3 justify-between w-[90%] my-5">
        <Button
          variant="outlined"
          borderColor="gray-500"
          textColor="gray-500"
          bgHoverColor="blue-200"
          textHoverColor="blue"
          borderHoverColor="blue"
          to={PATH.USER_LIST}
        >
          {t("common.backToList")}
        </Button>
      </div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          role: "user",
          password: "",
          isLocked: false,
          avatar: null,
        }}
        validationSchema={validateSchema(t)}
        onSubmit={(values) => {
          const convertValue = {
            fullname: values?.name || "",
            email: values?.email || "",
            phone: values?.phone || "",
            role: values.role,
            password: values.password,
            isLocked: values.isLocked,
            ...(values?.avatar?.[0] && { image: values.avatar[0] }),
          };

          handleAddUser(convertValue, {
            onSuccess: (response) => {
              if (validateStatus(response.code)) {
                console.log("response", response);
                toast.success(t("user.create.success"));
                navigate(
                  PATH.USER_DETAIL.replace(":userId", response?.data._id)
                );
              } else {
                toast.error(response?.message);
              }
            },
            onError: () => {
              toast.error(t("common.toast.hasErrorTryAgainLater"));
            },
          });
        }}
        enableReinitialize
      >
        {({ resetForm }) => {
          return (
            <Form>
              <div className="grid grid-cols-2 gap-5">
                <FormikTextField
                  name="name"
                  label={t("user.create.name")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <FormikTextField
                  name="email"
                  label={t("user.create.email")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <FormikTextField
                  name="password"
                  label={t("user.create.password")}
                  type="password"
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <FormikTextField
                  name="phone"
                  label={t("user.create.phone")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <FormikTextField
                  name="confirmPassword"
                  label={t("user.create.confirmPassword")}
                  type="password"
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <RadioGroup
                  name="isLocked"
                  vertical={false}
                  labelWidth="150px"
                  required
                  label={t("user.create.lockedStatus")}
                >
                  <FormikRadio
                    value={true}
                    label={t("common.locked")}
                    vertical={false}
                  />
                  <FormikRadio
                    value={false}
                    label={t("common.unLocked")}
                    labelWidth="150px"
                  />
                </RadioGroup>

                <RadioGroup
                  name="role"
                  vertical={false}
                  labelWidth="150px"
                  required
                  label={t("user.create.role")}
                >
                  <FormikRadio
                    value={"admin"}
                    label={t("common.admin")}
                    vertical={false}
                  />
                  <FormikRadio
                    value={"user"}
                    label={t("common.user")}
                    labelWidth="150px"
                  />
                </RadioGroup>

                <div className="col-span-2 mt-4 flex gap-3 justify-end w-[90%]">
                  <Button variant="outlined" type="submit">
                    {t("user.btn.addUser")}
                  </Button>
                  <Button
                    variant="outlined"
                    borderColor="crimson"
                    textColor="crimson"
                    bgHoverColor="crimson-300"
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    {t("common.cancel")}
                  </Button>
                </div>

                <FormikFileInput
                  className="w-[80%]"
                  name="avatar"
                  multiple
                  onPreviewsChange={(val) => {
                    setReviewList(val);
                  }}
                />

                <div className="w-[80%]">
                  <h2 className="col-span-2 text-xl mt-3 font-medium">
                    {t("user.create.images")}
                  </h2>

                  {reviewList?.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {reviewList?.map((item, index) => (
                        <div>
                          <Image
                            key={index}
                            src={item.previewUrl}
                            alt={`Hình ${index + 1}`}
                            className="w-full rounded-md shadow-md transition-transform transform hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UserCreate;
