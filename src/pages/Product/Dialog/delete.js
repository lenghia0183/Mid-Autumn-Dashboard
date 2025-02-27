import { toast } from "react-toastify";
import Dialog from "../../../components/Diaglog";
import LabelValue from "../../../components/LabelValue";
import { useTranslation } from "react-i18next";
import formatCurrency from "../../../utils/formatCurrency";

const DeleteDialog = ({
  isOpen,
  onCancel,
  product,
  handleSubmitDeleteProduct,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        open={isOpen}
        title="Xóa sản phẩm"
        onSubmit={() => {
          handleSubmitDeleteProduct();
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
