// src/components/Table.js
import React from "react";
import FormikAutoComplete from "../Formik/FormikAutoComplete";
import { Form, Formik } from "formik";

const Table = ({ headers, rows, className = "" }) => {
  const options = [
    {
      value: 10,
      label: "10",
    },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ];

  return (
    <div>
      <Formik
        initialValues={{
          row: {
            value: 10,
            label: "10",
          },
        }}
      >
        {() => {
          return (
            <Form className="mb-5 w-[180px]">
              <FormikAutoComplete
                name="row"
                options={options}
                label="Số dòng mỗi trang"
                labelWidth="140px"
                labelClassName="font-normal text-base"
                className="mt-10"
                getOptionLabel={(opt) => {
                  return opt.label;
                }}
                isEqualValue={(val, otp) => {
                  return val.value === otp.value;
                }}
              />
            </Form>
          );
        }}
      </Formik>
      <table className={`w-full border-collapse ${className}`}>
        <thead>
          <tr className="bg-emerald text-white">
            {headers.map((header, index) => (
              <th key={index} className="border border-gray p-2 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows && rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-center">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border p-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="border p-2 text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
