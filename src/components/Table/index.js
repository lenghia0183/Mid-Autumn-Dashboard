import React from "react";
import FormikAutoComplete from "../Formik/FormikAutoComplete";
import { Form, Formik } from "formik";
import { useQueryState } from "../../hooks/useQueryState";
import { useTranslation } from "react-i18next";

const SkeletonRow = ({ columns }) => (
  <tr>
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="border p-2 text-center">
        <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
      </td>
    ))}
  </tr>
);

const Table = ({
  headers,
  rows,
  className = "",
  isLoading = false,
  isShowPageSize = true,
}) => {
  const options = [
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ];

  const { t } = useTranslation();
  const { pageSize, setPageSize } = useQueryState({ limit: 10 });

  return (
    <div className="w-full overflow-x-auto">
      {isShowPageSize && (
        <Formik initialValues={{ row: { value: 10, label: "10" } }}>
          {() => (
            <Form className="mb-5 w-[180px] ml-auto">
              <FormikAutoComplete
                name="row"
                options={options}
                label={t("common.rowPerPage")}
                labelWidth="140px"
                labelClassName="font-normal text-base"
                className="mt-10"
                getOptionLabel={(opt) => opt.label}
                isEqualValue={(val, otp) => val.value === otp.value}
                onChange={(val) => setPageSize(val.value)}
                isCloseAfterSelect={true}
              />
            </Form>
          )}
        </Formik>
      )}

      <table className={`w-full border-collapse table-auto ${className}`}>
        <thead>
          <tr className="bg-emerald text-white">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 p-2 font-semibold whitespace-nowrap text-center"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: pageSize }).map((_, i) => (
              <SkeletonRow key={i} columns={headers.length} />
            ))
          ) : rows && rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border border-gray-300 p-2 whitespace-nowrap text-center"
                  >
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
