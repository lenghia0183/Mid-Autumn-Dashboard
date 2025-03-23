import React, { useState, useRef } from "react";
import FormikAutoComplete from "../Formik/FormikAutoComplete";
import { Form, Formik } from "formik";
import { useQueryState } from "../../hooks/useQueryState";
import { useTranslation } from "react-i18next";

const SkeletonRow = ({ columns }) => (
  <tr>
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="border p-2">
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

  const [columnWidths, setColumnWidths] = useState(headers.map(() => 150));

  const resizingColumn = useRef(null);

  const handleMouseDown = (index, event) => {
    resizingColumn.current = {
      index,
      startX: event.clientX,
      startWidth: columnWidths[index],
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    if (!resizingColumn.current) return;

    const { index, startX, startWidth } = resizingColumn.current;
    const newWidth = Math.max(startWidth + (event.clientX - startX), 50);

    setColumnWidths((prevWidths) =>
      prevWidths.map((width, i) => (i === index ? newWidth : width))
    );
  };

  const handleMouseUp = () => {
    resizingColumn.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div>
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
      <table className={`w-full border-collapse ${className}`}>
        <thead>
          <tr className="bg-emerald text-white">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray p-2 font-semibold relative"
                style={{ width: `${columnWidths[index]}px` }}
              >
                {header}
                {/* Thanh kéo (resizer) */}
                <div
                  className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                  onMouseDown={(event) => handleMouseDown(index, event)}
                />
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
              <tr key={rowIndex} className="text-center">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border p-2"
                    style={{ width: `${columnWidths[cellIndex]}px` }}
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
