import { Form, Formik } from "formik";
import LabelValue from "./../../../components/LabelValue/index";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProduct, useGetProductDetail } from "../../../service/https";
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

  const { data: productDetail } = useGetProductDetail(params.productId);

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
            toast.success("Xóa sản phẩm thành công");
            navigate(PATH.PRODUCT_LIST, { replace: true });
            handleCloseDeleteDialog();
          } else {
            toast.error(response.message);
          }
        },
        onError: () => {
          toast.error(t("common.hasErrorTryAgainLater"));
          handleCloseDeleteDialog();
        },
      }
    );
  };

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">Chi tiết sản phẩm</h2>
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

        <div className="flex gap-3">
          <Button
            variant="outlined"
            borderColor="crimson"
            textColor="crimson"
            bgHoverColor="crimson-300"
            startIcon={<Icon name="bin" size={1.5} />}
            onClick={() => setIsOpenDeleteDialog(true)}
          >
            Xóa
          </Button>
          <Button
            variant="outlined"
            startIcon={<Icon name="edit" size={1.5} />}
            to={PATH.PRODUCT_EDIT.replace(":productId", params.productId)}
          >
            Chỉnh sửa
          </Button>
        </div>
      </div>
      <Formik>
        <Form>
          <div className="grid grid-cols-2 gap-3">
            <LabelValue
              labelWidth="150px"
              label="ID sản phẩm:"
              value={productDetail?._id}
            />
            <LabelValue
              labelWidth="150px"
              label="Tên sản phẩm:"
              value={productDetail?.name}
            />
            <LabelValue
              labelWidth="150px"
              label="Mã sản phẩm:"
              value={productDetail?.code}
            />
            <LabelValue
              labelWidth="150px"
              label="Giá sản phẩm:"
              value={formatCurrency(productDetail?.price)}
            />
            <LabelValue
              labelWidth="150px"
              label="Thương hiệu:"
              value={productDetail?.manufacturerId?.name}
            />
            <LabelValue
              labelWidth="150px"
              label="Thể loại:"
              value={productDetail?.categoryId?.name}
            />

            <LabelValue
              labelWidth="150px"
              className="col-span-2"
              label="Giới thiệu:"
              value={productDetail?.description}
            />

            <h2 className="col-span-2 text-xl mt-3 font-medium">
              Danh sách hình ảnh
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
