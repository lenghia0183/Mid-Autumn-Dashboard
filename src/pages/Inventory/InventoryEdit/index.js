import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  useGetInventoryDetail,
  useUpdateInventory,
} from "../../../service/https/inventory";
import { validateSchema } from "./schema";

// Import components
import InventoryEditHeader from "./components/InventoryEditHeader";
import InventoryEditForm from "./components/InventoryEditForm";

// Import utilities
import { handleInventoryUpdate } from "./utils/inventoryHandlers";

const InventoryEdit = () => {
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: inventoryDetailResponse } = useGetInventoryDetail(
    params.inventoryId
  );
  const inventoryDetail = inventoryDetailResponse?.data;

  const { trigger: handleUpdateInventory } = useUpdateInventory();

  return (
    <div>
      <InventoryEditHeader inventoryId={params.inventoryId} />

      <Formik
        initialValues={{
          _id: inventoryDetail?._id,
          productId: inventoryDetail?.productId,
          quantity: inventoryDetail?.quantity,
          reason: inventoryDetail?.reason,
          note: inventoryDetail?.note,
        }}
        validationSchema={validateSchema(t)}
        onSubmit={(values) => {
          handleInventoryUpdate(
            handleUpdateInventory,
            values,
            params.inventoryId,
            navigate,
            t
          );
        }}
        enableReinitialize
      >
        {({ resetForm, values }) => {
          return (
            <Form>
              <InventoryEditForm
                inventoryDetail={inventoryDetail}
                resetForm={resetForm}
                values={values}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default InventoryEdit;
