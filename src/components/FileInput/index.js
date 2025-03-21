import { useField, useFormikContext } from "formik";
import { useState, useEffect, useRef } from "react";
import Icon from "../Icon";
import Button from "../Button";
import IconButton from "../IconButton";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const FormikFileInput = ({
  className,
  name,
  label,
  multiple = false,
  maxFiles = 5,
  maxSize = 2 * 1024 * 1024,
  allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"],
  onPreviewsChange,
}) => {
  const { t } = useTranslation();

  const [, meta, helpers] = useField(name);
  const { setFieldValue, initialValues } = useFormikContext();
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (meta.value === initialValues[name]) {
      clearPreviews();
      const newFiles = meta.value || [];
      setSelectedFiles(newFiles);
      updatePreviews(newFiles);
    }
  }, [meta.value, initialValues]);

  const updatePreviews = (files) => {
    const validFiles = Array.isArray(files) ? files : [];
    const filePreviews = validFiles.map((file) => ({
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));
    setPreviews(filePreviews);
    if (onPreviewsChange) onPreviewsChange(filePreviews);
  };

  const clearPreviews = () => {
    previews.forEach((file) => URL.revokeObjectURL(file.previewUrl));
    setPreviews([]);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const existingFiles = Array.isArray(selectedFiles) ? selectedFiles : [];

    let newFiles;
    if (multiple) {
      newFiles = files.filter(
        (file) =>
          !existingFiles.some((existingFile) => existingFile.name === file.name)
      );
      newFiles = [...existingFiles, ...newFiles].slice(0, maxFiles);
    } else {
      newFiles = files.slice(-1);
    }

    const validFiles = newFiles.filter(
      (file) => file.size <= maxSize && allowedTypes.includes(file.type)
    );

    if (validFiles.length !== newFiles.length) {
      helpers.setError(
        "Một số file không hợp lệ (sai định dạng hoặc quá dung lượng)"
      );
    }

    setFieldValue(name, validFiles);
    setSelectedFiles(validFiles);
    updatePreviews(validFiles);
  };
  const handleRemoveFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    URL.revokeObjectURL(previews[index].previewUrl);
    setFieldValue(name, newFiles);
    setSelectedFiles(newFiles);
    updatePreviews(newFiles);
  };

  useEffect(() => {
    return clearPreviews;
  }, []);

  return (
    <div className={clsx("mb-4", className)}>
      {label && <label className="block font-medium mb-1">{label}</label>}
      <input
        type="file"
        multiple={multiple}
        onChange={handleFileChange}
        accept={allowedTypes.join(",")}
        ref={fileInputRef}
        className="hidden"
      />
      <Button
        onClick={() => fileInputRef.current.click()}
        variant="outlined"
        startIcon={<Icon name="upload" size={1.7} strokeWidth={3} />}
      >
        {t("common.selectFile")}
      </Button>
      {selectedFiles.length > 0 && (
        <div className="mt-3 bg-blue-100 p-3 rounded-md w-full">
          <h4 className="text-blue-600 font-semibold">Tệp đã chọn:</h4>
          <ul className="mt-2">
            {previews.map(({ name, previewUrl }, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-blue-200 px-3 py-1 rounded-md mb-2"
              >
                <span className="text-sm text-blue-900">{name}</span>
                <IconButton
                  onClick={() => handleRemoveFile(index)}
                  iconName="close"
                  textColor="crimson-100"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FormikFileInput;
