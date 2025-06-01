import { toast } from "react-toastify";
import { validateStatus } from "../../../../utils/api";
import { PATH } from "../../../../constants/path";

export const handleInventoryUpdate = (
  updateInventoryTrigger,
  values,
  inventoryId,
  navigate,
  t
) => {
  updateInventoryTrigger(
    {
      _id: values?._id,
      body: {
        productId: values?.productId?._id,
        quantity: values?.quantity,
        reason: values?.reason,
        note: values?.note,
      },
    },
    {
      onSuccess: (response) => {
        if (validateStatus(response.code)) {
          toast.success(t("inventory.edit.success"));
          navigate(PATH.INVENTORY_DETAIL.replace(":inventoryId", inventoryId));
        } else {
          toast.error(response.message);
        }
      },
      onError: () => {
        toast.error(t("common.toast.hasErrorTryAgainLater"));
      },
    }
  );
};
