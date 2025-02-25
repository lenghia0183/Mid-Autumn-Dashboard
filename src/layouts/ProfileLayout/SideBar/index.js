import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Icon from "../../../components/Icon";
import { PAGE_TITLE, PATH } from "../../../constants/path";
import Button from "../../../components/Button";
import { useUser } from "../../../context";
import { useTranslation } from "react-i18next";
import Image from "../../../components/Image";
import clsx from "clsx";
import { useState } from "react";
import { useUpdateMe } from "../../../service/https/user";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  // avatar: Yup.mixed().required("Vui lòng chọn ảnh"),
});

function SideBar() {
  const { logout, user: userData, updateUser } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { trigger } = useUpdateMe();

  const [previewUrl, setPreviewUrl] = useState(null);

  const accountLinks = [
    { name: t(PAGE_TITLE.PROFILE), path: PATH.PROFILE_EDIT, icon: "edit" },
    {
      name: t(PAGE_TITLE.CHANGE_PASSWORD),
      path: PATH.CHANGE_PASSWORD,
      icon: "key",
    },
  ];

  const transactionLinks = [
    { name: t(PAGE_TITLE.ORDER), path: PATH.ORDER, icon: "order" },
    { name: t(PAGE_TITLE.FAVORITE), path: PATH.FAVORITE, icon: "heart" },
  ];

  return (
    <nav className="p-4 sm:pb-[150px] pb-[100px] bg-white-100 border-r border-gray-200">
      <Formik
        initialValues={{ avatar: null }}
        onSubmit={(values) => {
          trigger(
            { avatar: values.avatar },
            {
              onSuccess: (response) => {
                if (response.code === 200) {
                  toast.success(t("profile.updateAvatarSuccess"));
                  updateUser(response.data);
                  URL.revokeObjectURL(previewUrl);
                  setPreviewUrl(null);
                } else {
                  toast.error(response.message);
                  setPreviewUrl(null);
                }
              },
              onError: () => {
                toast.error("common.hasErrorTryAgainLater");
                setPreviewUrl(null);
              },
            }
          );
        }}
      >
        {({ setFieldValue, resetForm }) => {
          return (
            <Form>
              <div className="mb-4">
                <div className="relative group w-[150px] h-[150px] m-auto overflow-hidden rounded-full">
                  <Image
                    src={previewUrl || userData?.user?.avatar}
                    className="rounded-full w-full h-full object-cover"
                    width="150px"
                    height="150px"
                  />
                  <label
                    htmlFor="fileInput"
                    className="absolute bottom-0 left-0 w-full h-1/2 bg-black/60 text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300"
                  >
                    Thay đổi
                  </label>
                  <input
                    id="fileInput"
                    name="avatar"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onInput={(event) => {
                      const file = event.currentTarget.files[0];
                      if (previewUrl) {
                        URL.revokeObjectURL(previewUrl);
                      }

                      if (file) {
                        const newPreviewUrl = URL.createObjectURL(file);
                        setPreviewUrl(newPreviewUrl);
                        setFieldValue("avatar", file);
                      }
                    }}
                  />
                </div>
                <div
                  className={clsx(
                    "flex gap-2 m-auto justify-center my-3 opacity-0 max-h-0 transition-all duration-500",
                    {
                      "opacity-100 max-h-fit": previewUrl,
                    }
                  )}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    borderColor="crimson"
                    textColor="crimson"
                    bgHoverColor="crimson-500"
                    onClick={() => {
                      if (previewUrl) {
                        URL.revokeObjectURL(previewUrl);
                      }
                      setPreviewUrl(null);
                      const fileInput = document.getElementById("fileInput");
                      if (fileInput) {
                        fileInput.value = "";
                      }
                      resetForm();
                    }}
                  >
                    {t("common.cancel")}
                  </Button>
                  <Button type="submit" size="small" variant="outlined">
                    {t("common.saveChange")}
                  </Button>
                </div>
                <div className="text-dark text-xl font-semibold text-center">
                  {userData?.user?.fullname}
                </div>
                <div className="text-gray-400 text-lg text-center">
                  {userData?.user?.email}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

      <div className="mb-6">
        <div className="flex h-fit items-stretch">
          <div className="w-[3px] bg-yellow"></div>
          <h2 className="flex-1 font-semibold text-dark text-lg bg-gray-100 h-full flex items-center p-2 mb-0">
            QUẢN LÝ TÀI KHOẢN
          </h2>
        </div>
        <ul className="space-y-2">
          {accountLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-2 p-2 text-yellow text-lg font-medium hover:text-yellow rounded"
                    : "flex items-center space-x-2 p-2 text-dark text-lg font-medium hover:text-yellow rounded"
                }
              >
                <Icon name={link.icon} size="1.3em" />
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex h-fit items-stretch">
          <div className="w-[3px] bg-yellow"></div>
          <h2 className="flex-1 font-semibold text-dark text-lg bg-gray-100 h-full flex items-center p-2 mb-0">
            QUẢN LÝ GIAO DỊCH
          </h2>
        </div>
        <ul className="space-y-2">
          {transactionLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-2 p-2 text-yellow text-lg font-medium hover:text-yellow rounded"
                    : "flex items-center space-x-2 p-2 text-dark text-lg font-medium hover:text-yellow rounded"
                }
              >
                <Icon name={link.icon} size="1.3em" />
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Button
        full
        className="mt-10"
        onClick={() => {
          logout(navigate);
        }}
      >
        {t("common.logout")}
      </Button>
    </nav>
  );
}

export default SideBar;
