import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup"; // Import Yup
import RadioGroup from "../../components/RadioGroup";
import FormikRadio from "../../components/Formik/FormikRadio";

const validationSchema = Yup.object().shape({
  test: Yup.string().required("Bạn phải chọn một giá trị"), // Thêm validate
});

const Test = () => {
  return (
    <div className="h-screen">
      <Formik
        initialValues={{
          test: "", // Giá trị ban đầu là rỗng để kiểm tra validate
        }}
        validationSchema={validationSchema} // Thêm schema vào Formik
        onSubmit={(values) => {
          console.log("Giá trị đã chọn:", values.test);
        }}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <RadioGroup name="test" vertical={false}>
              <FormikRadio label="nghia" value="nghia" />
              <FormikRadio label="le" value="le" />

              <FormikRadio
                label="nghia ten tao"
                value="nghia ten tao"
                vertical
              />
            </RadioGroup>

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
