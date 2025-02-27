import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useAddProduct, useGetProductDetail } from "../../../service/https";
import Image from "../../../components/Image";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
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
const getCategoryList = () => {
  return api.get("v1/category");
};

const getManufacturerList = () => {
  return api.get("v1/manufacturer");
};

const ProductCreate = () => {
  const [reviewList, setReviewList] = useState();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { trigger: handleAddProduct } = useAddProduct();

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">Chỉnh sửa sản phẩm</h2>
      <div className="flex gap-3 justify-between w-[90%] my-5">
        <Button
          variant="outlined"
          borderColor="gray-500"
          textColor="gray-500"
          bgHoverColor="gray-200"
          to={PATH.PRODUCT_LIST}
        >
          Trở về danh sách
        </Button>

        {/* <div className="flex gap-3">
          <Button
            variant="outlined"
            borderColor="crimson"
            textColor="crimson"
            bgHoverColor="crimson-300"
            startIcon={<Icon name="bin" size={1.5} />}
          >
            Xóa
          </Button>
          <Button
            variant="outlined"
            startIcon={<Icon name="eye" size={1.5} />}
            to={PATH.PRODUCT_DETAIL.replace(":productId", params.productId)}
          >
            Xem chi tiết
          </Button>
        </div> */}
      </div>
      <Formik
        initialValues={{
          name: "san pham test",
          code: "san pham test",
          price: 10000,
          manufacturerId: { name: "Như Lan", _id: "67af38a1f5819066168dd97e" },
          categoryId: {
            name: "Bánh nướng 2 trứng đặc biệt",
            _id: "67af33d4f5819066168dd967",
          },
          description: "san pham rat tot",
        }}
        validationSchema={validateSchema(t)}
        onSubmit={(values) => {
          console.log("values", values);

          const convertValue = {
            name: values.name,
            code: values.code,
            price: values.price,
            manufacturerId: values.manufacturerId._id,
            categoryId: values.categoryId._id,
            description: values.description,
            images: values.images,
          };

          handleAddProduct(convertValue, {
            onSuccess: (response) => {
              if (validateStatus(response.code)) {
                console.log("response", response);
                toast.success(t("Tạo sản phẩm mới thành công"));
                navigate(
                  PATH.PRODUCT_DETAIL.replace(":productId", response?.data._id)
                );
              } else {
                toast.error(response?.message);
              }
            },
            onError: (error) => {
              console.error("error", t("hasErrorTryAgainLater"));
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
                  label="Tên sản phẩm:"
                  orientation="horizontal"
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <FormikTextField
                  name="code"
                  label="Mã sản phẩm:"
                  orientation="horizontal"
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />
                <FormikTextField
                  name="price"
                  label="Giá sản phẩm:"
                  orientation="horizontal"
                  required
                  labelWidth="150px"
                  width="80%"
                  allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />
                <FormikAutoComplete
                  name="categoryId"
                  asyncRequest={getCategoryList}
                  asyncRequestHelper={(res) => {
                    return res.data.categories;
                  }}
                  getOptionsLabel={(opt) => opt?.name}
                  isEqualValue={(val, opt) => val._id === opt._id}
                  label="Danh mục:"
                  autoFetch={true}
                  filterActive={true}
                  labelWidth="150px"
                  width="80%"
                  vertical={false}
                  required
                />

                <FormikAutoComplete
                  name="manufacturerId"
                  asyncRequest={getManufacturerList}
                  asyncRequestHelper={(res) => {
                    return res.data.manufacturers;
                  }}
                  getOptionsLabel={(opt) => opt?.name}
                  isEqualValue={(val, opt) => val._id === opt._id}
                  label="Thương hiệu:"
                  autoFetch={true}
                  filterActive={true}
                  labelWidth="150px"
                  width="80%"
                  vertical={false}
                  required
                />

                <FormikTextArea
                  name="description"
                  label="Giới thiệu sản phẩm"
                  className="col-span-2"
                  labelWidth="150px"
                  orientation="horizontal"
                  width="90.5%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                  required
                />

                <div className="col-span-2 mt-4 flex gap-3 justify-end w-[90%]">
                  <Button variant="outlined" type="submit">
                    Tạo mới
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
                    Hủy
                  </Button>
                </div>

                <FormikFileInput
                  className="w-[80%]"
                  name="images"
                  multiple
                  onPreviewsChange={(val) => {
                    setReviewList(val);
                  }}
                />

                <div className="w-[80%]">
                  <h2 className="col-span-2 text-xl mt-3 font-medium">
                    Danh sách hình ảnh
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

export default ProductCreate;
