import { Form, Formik } from "formik";
import LabelValue from "./../../../components/LabelValue/index";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProduct,
  useGetProductDetail,
  useTranslateProduct,
} from "../../../service/https";
import formatCurrency from "./../../../utils/formatCurrency";
import Image from "../../../components/Image";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import { PATH } from "../../../constants/path";
import { useState } from "react";
import { validateStatus } from "../../../utils/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import DeleteDialog from "../Dialog/delete";

const ProductDetail = () => {
  const params = useParams();

  const { data: productDetail, mutate: mutateProductDetail } =
    useGetProductDetail(params.productId);
  console.log("productDetail", productDetail);

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  const { trigger: handleDeleteProduct } = useDeleteProduct();

  const handleSubmitDeleteProduct = () => {
    handleDeleteProduct(
      { _id: params.productId },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("product.delete.success"));
            navigate(PATH.PRODUCT_LIST, { replace: true });
            handleCloseDeleteDialog();
          } else {
            toast.error(response.message);
          }
        },
        onError: () => {
          toast.error(t("common.toast.hasErrorTryAgainLater"));
          handleCloseDeleteDialog();
        },
      }
    );
  };

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("product.detail.title")}
      </h2>
      <div className="flex gap-3 justify-between w-[90%] my-5">
        <Button
          variant="outlined"
          borderColor="gray-500"
          textColor="gray-500"
          bgHoverColor="blue-200"
          textHoverColor="blue"
          borderHoverColor="blue"
          to={PATH.PRODUCT_LIST}
        >
          {t("common.backToList")}
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outlined"
            borderColor="crimson"
            textColor="crimson"
            bgHoverColor="crimson-300"
            startIcon={<Icon name="bin" size={1.5} />}
            onClick={() => setIsOpenDeleteDialog(true)}
          >
            {t("common.delete")}
          </Button>
          <Button
            variant="outlined"
            startIcon={<Icon name="edit" size={1.5} />}
            to={PATH.PRODUCT_EDIT.replace(":productId", params.productId)}
          >
            {t("common.edit")}
          </Button>
        </div>
      </div>
      <Formik>
        <Form>
          <div className="grid grid-cols-2 gap-3">
            {/* Basic Information */}
            <div className="col-span-2 mb-4">
              <h3 className="text-lg font-medium mb-4 text-gray-700">
                Thông tin cơ bản
              </h3>
            </div>

            <LabelValue
              labelWidth="150px"
              label={t("product.detail.ID")}
              value={productDetail?._id}
            />
            <LabelValue
              labelWidth="150px"
              label={t("product.detail.name")}
              value={productDetail?.name}
            />
            <LabelValue
              labelWidth="150px"
              label={t("product.detail.code")}
              value={productDetail?.code}
            />
            <LabelValue
              labelWidth="150px"
              label={t("product.detail.price")}
              value={formatCurrency(productDetail?.price)}
            />
            <LabelValue
              labelWidth="150px"
              label={t("product.detail.costPrice")}
              value={formatCurrency(productDetail?.costPrice)}
            />
            <LabelValue
              labelWidth="150px"
              label={t("product.detail.manufacturer")}
              value={productDetail?.manufacturerId?.name}
            />
            <LabelValue
              labelWidth="150px"
              label={t("product.detail.category")}
              value={productDetail?.categoryId?.name}
            />
            <LabelValue
              labelWidth="150px"
              label={t("product.detail.quantity")}
              value={productDetail?.quantity}
            />

            <LabelValue
              labelWidth="150px"
              className="col-span-2"
              label={t("product.detail.description")}
              value={productDetail?.description}
            />

            <div className="col-span-2 mt-6 mb-4">
              <h3 className="text-lg font-medium mb-4 text-gray-700">
                Thông tin đa ngôn ngữ
              </h3>
            </div>

            <LabelValue
              labelWidth="150px"
              label="Tên tiếng Anh:"
              value={productDetail?.nameEn || "Chưa có"}
            />
            <LabelValue
              labelWidth="150px"
              label="Tên tiếng Trung:"
              value={productDetail?.nameZh || "Chưa có"}
            />
            <LabelValue
              labelWidth="150px"
              label="Tên tiếng Nhật:"
              className="col-span-2"
              value={productDetail?.nameJa || "Chưa có"}
            />
            <LabelValue
              labelWidth="150px"
              label="Mô tả tiếng Anh:"
              className="col-span-2"
              value={productDetail?.descriptionEn || "Chưa có"}
            />

            <LabelValue
              labelWidth="150px"
              label="Mô tả tiếng Trung:"
              className="col-span-2"
              value={productDetail?.descriptionZh || "Chưa có"}
            />

            <LabelValue
              labelWidth="150px"
              label="Mô tả tiếng Nhật:"
              className="col-span-2"
              value={productDetail?.descriptionJa || "Chưa có"}
            />

            <h2 className="col-span-2 text-xl mt-3 font-medium">
              {t("product.detail.images")}
            </h2>

            {productDetail?.images?.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {productDetail?.images?.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Hình ${index + 1}`}
                    className="w-full rounded-md shadow-md transition-transform transform hover:scale-105"
                  />
                ))}
              </div>
            )}
          </div>
        </Form>
      </Formik>
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        product={productDetail}
        handleSubmitDeleteProduct={handleSubmitDeleteProduct}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default ProductDetail;
