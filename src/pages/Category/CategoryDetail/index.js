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
import {
  useDeleteCategory,
  useGetCategoryDetail,
} from "../../../service/https/category";

const CategoryDetail = () => {
  const params = useParams();

  const { data: categoryDetail } = useGetCategoryDetail(params.categoryId);

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  console.log("categoryDetail", categoryDetail);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  const { trigger: handleDeleteCategory } = useDeleteCategory();

  const handleSubmitDeleteCategory = () => {
    handleDeleteCategory(
      { _id: params.categoryId },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("category.delete.success"));
            navigate(PATH.CATEGORY_LIST, { replace: true });
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
        {t("category.detail.title")}
      </h2>
      <div className="flex gap-3 justify-between w-[90%] my-5">
        <Button
          variant="outlined"
          borderColor="gray-500"
          textColor="gray-500"
          bgHoverColor="blue-200"
          textHoverColor="blue"
          borderHoverColor="blue"
          to={PATH.CATEGORY_LIST}
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
            to={PATH.CATEGORY_EDIT.replace(":categoryId", params.categoryId)}
          >
            {t("common.edit")}
          </Button>
        </div>
      </div>
      <Formik>
        <Form>
          <div className="grid grid-cols-2 gap-3">
            <LabelValue
              labelWidth="150px"
              label={t("category.detail.ID")}
              value={categoryDetail?._id}
            />
            <LabelValue
              labelWidth="150px"
              label={t("category.detail.name")}
              value={categoryDetail?.name}
            />

            <h2 className="col-span-2 text-xl mt-3 font-medium">
              {t("category.detail.images")}
            </h2>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <Image
                key={categoryDetail?._id}
                src={categoryDetail?.image}
                alt={categoryDetail?.name}
                className="w-full rounded-md shadow-md transition-transform transform hover:scale-105"
              />
            </div>
          </div>
        </Form>
      </Formik>
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        category={categoryDetail}
        handleSubmitDeleteCategory={handleSubmitDeleteCategory}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default CategoryDetail;
