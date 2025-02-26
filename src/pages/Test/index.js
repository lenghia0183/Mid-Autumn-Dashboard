import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup"; // Import Yup
import RadioGroup from "../../components/RadioGroup";
import FormikRadio from "../../components/Formik/FormikRadio";
import { api } from "../../service/api";
import AutoComplete from "../../components/AutoComplete";
import FormikCheckBox from "./../../components/Formik/FormikCheckBox";
import FormikTextField from "./../../components/Formik/FormikTextField";
import FormikAutoComplete from "../../components/Formik/FormikAutoComplete";

const validationSchema = Yup.object().shape({
  test: Yup.string().required("Bạn phải chọn một giá trị"), // Thêm validate
});

const Test = () => {
  const getCategoryList = () => {
    return api.get("v1/category");
  };

  return (
    <div className="h-screen">
      <Formik
        initialValues={{
          test: "",
          callApi: "haha",
          category: {
            _id: "67af3317f5819066168dd964",
            name: "Bánh trăng vàng cao cấp",
            image:
              "https://res.cloudinary.com/lenghia0183/image/upload/v1739535126/mid-autumn/qy5jyahzwbvtxysdpxyf.png",
          },
        }}
        validationSchema={validationSchema} // Thêm schema vào Formik
        onSubmit={(values) => {
          console.log("Giá trị đã chọn:", values.test);
        }}
      >
        {({}) => (
          <Form className="grid grid-cols-4 gap-5">
            <div></div>

            <FormikTextField name="callApi" label="call api" />

            <FormikAutoComplete
              name="category"
              className="mt-10"
              asyncRequest={getCategoryList}
              asyncRequestHelper={(res) => {
                console.log("res", res);
                return res.data.categories;
              }}
              getOptionsLabel={(opt) => opt?.name}
              isEqualValue={(val, opt) => val._id === opt._id}
              label="Danh sách danh mục"
              autoFetch={true}
              filterActive={true}
            />
            <div></div>
            <div></div>
            <div></div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Gửi
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Test;
