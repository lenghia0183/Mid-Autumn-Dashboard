import { toast } from "react-toastify";
import Dialog from "../../../components/Diaglog";
import LabelValue from "../../../components/LabelValue";
import { useDeleteProduct } from "../../../service/https";
import { useTranslation } from "react-i18next";
import { validateStatus } from "../../../utils/api";
import formatCurrency from "../../../utils/formatCurrency";

const DeleteDialog = ({ isOpen, onCancel, product, refreshProductList }) => {
  const { trigger: handleDeleteProduct } = useDeleteProduct(product?._id);
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        open={isOpen}
        title="Xóa sản phẩm"
        onSubmit={() => {
          handleDeleteProduct(
            {},
            {
              onSuccess: (response) => {
                if (validateStatus(response.code)) {
                  toast.success("Xóa sản phẩm thành công");
                  onCancel();
                  if (refreshProductList) {
                    refreshProductList();
                  }
                } else {
                  toast.error(response.message);
                  onCancel();
                }
              },
              onError: () => {
                toast.error(t("common.hasErrorTryAgainLater"));
                onCancel();
              },
            }
          );
        }}
        submitLabel="Đồng ý"
        cancelLabel="Hủy"
        onCancel={onCancel}
      >
        <p className="my-3">Bạn có chắc muốn xóa sản phẩm này?</p>
        <LabelValue label="ID sản phẩm:" value={product?._id} />
        <LabelValue label="Tên sản phẩm:" value={product?.name} />
        <LabelValue label="Giá:" value={formatCurrency(product?.price)} />
      </Dialog>
    </>
  );
};

export default DeleteDialog;
