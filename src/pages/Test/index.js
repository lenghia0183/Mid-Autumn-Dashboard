import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { api } from "../../service/api";

import FormikAutoComplete from "../../components/Formik/FormikAutoComplete";
import FormikCheckBox from "../../components/Formik/FormikCheckBox";
import CheckBoxGroup from "../../components/CheckBoxGroup";

const validationSchema = Yup.object().shape({
  callApi: Yup.string().required("Vui lòng nhập call api"),
  checkBoxSingle: Yup.boolean().oneOf([true], "Bạn phải chọn checkBoxSingle"),
  arrayTest: Yup.array()
    .of(Yup.string())
    .min(1, "Bạn phải chọn ít nhất một checkbox trong group"),
  category: Yup.object()
    .nullable()
    .required("Bạn phải chọn danh mục")
    .test(
      "has-id",
      "Danh mục không hợp lệ",
      (value) => value && value._id !== undefined && value._id !== ""
    ),
});

const Test = () => {
  const getCategoryList = () => {
    return api.get("v1/category");
  };

  return (
    <div className="h-screen">
      <Formik
        initialValues={{
          checkBoxSingle: false,

          arrayTest: [],
          test: "",
          callApi: "haha",
          category: {
            _id: "67af3317f5819066168dd964",
            name: "Bánh trăng vàng cao cấp",
            image:
              "https://res.cloudinary.com/lenghia0183/image/upload/v1739535126/mid-autumn/qy5jyahzwbvtxysdpxyf.png",
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Giá trị đã chọn:", values);
        }}
      >
        {() => (
          <Form className="grid grid-cols-4 gap-5">
            <div>
              <FormikCheckBox
                name="checkBoxSingle"
                value="checkBoxSingle"
                label="checkBoxSingle"
              />
            </div>

            <CheckBoxGroup name="arrayTest">
              <FormikCheckBox
                name="checkBox1"
                value="checkBox1"
                label="checkBox1"
              />
              <FormikCheckBox
                name="checkBox2"
                value="checkBox2"
                label="checkBox2"
              />
              <FormikCheckBox
                name="checkBox3"
                value="checkBox3"
                label="checkBox3"
              />
              <FormikCheckBox
                name="checkBox4"
                value="checkBox4"
                label="checkBox4"
              />
            </CheckBoxGroup>

            <FormikAutoComplete
              name="category"
              className="mt-10"
              asyncRequest={getCategoryList}
              asyncRequestHelper={(res) => {
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
