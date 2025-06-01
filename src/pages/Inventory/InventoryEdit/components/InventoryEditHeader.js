import { useTranslation } from "react-i18next";
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import { PATH } from "../../../../constants/path";

const InventoryEditHeader = ({ inventoryId }) => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-[28px] font-medium mb-4">
        {t("inventory.edit.title")}
      </h2>

      <div className="flex gap-3 justify-between w-[90%] my-5">
        <Button
          variant="outlined"
          borderColor="gray-500"
          textColor="gray-500"
          bgHoverColor="blue-200"
          textHoverColor="blue"
          borderHoverColor="blue"
          to={PATH.INVENTORY_HISTORY}
        >
          {t("common.backToList")}
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outlined"
            startIcon={<Icon name="eye" size={1.5} />}
            to={PATH.INVENTORY_DETAIL.replace(":inventoryId", inventoryId)}
          >
            {t("common.showDetail")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default InventoryEditHeader;
