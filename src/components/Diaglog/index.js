import clsx from "clsx";
import { Form, Formik } from "formik";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import Button from "../Button";
import IconButton from "../IconButton";

const Dialog = ({
  open,
  onCancel,
  title = "",
  children,
  onSubmit,
  cancelLabel = "",
  submitLabel = "",
  cancelProps = { bgColor: "gray-400" },
  submitProps = { bgColor: "crimson" },
  renderFooter,
  maxWidth = "max-w-md",
  fullWidth = true,
  disableBackdropClick = false,
  noBorderTop = false,
  noBorderBottom = false,
  formikProps,
  iconButtonProps = {},
  titleClassName,
  dialogClassName,
  titleContainerClassName,
  contentClassName,
  footerClassName,
  backdropClassName,
}) => {
  const handleBackdropClick = () => {
    if (!disableBackdropClick) {
      onCancel();
    }
  };

  const DialogWrapper = useCallback(
    ({ children }) =>
      !isEmpty(formikProps) ? (
        <Formik {...formikProps}>
          {() => (
            <Form className="flex flex-col overflow-y-auto">{children}</Form>
          )}
        </Formik>
      ) : (
        children
      ),
    [formikProps]
  );

  const DialogInner = () => (
    <>
      <div
        className={clsx("p-6", contentClassName, {
          "border-b-2 border-gray-200": !noBorderBottom,
          "border-t-2 border-gray-200": !noBorderTop,
        })}
      >
        {children}
      </div>
      {(cancelLabel || submitLabel || typeof renderFooter === "function") && (
        <div className={clsx("p-4 flex justify-end", footerClassName)}>
          {renderFooter ? (
            renderFooter()
          ) : (
            <div className="flex gap-2">
              {cancelLabel && (
                <Button onClick={onCancel} {...cancelProps}>
                  {cancelLabel}
                </Button>
              )}
              {submitLabel && (
                <Button
                  type={formikProps ? "submit" : "button"}
                  onClick={formikProps ? undefined : onSubmit}
                  {...submitProps}
                >
                  {submitLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );

  if (!open) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 text-xl",
        backdropClassName
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          "bg-white-100 rounded-lg shadow-lg w-full",
          dialogClassName,
          maxWidth,
          { "max-w-full": fullWidth },
          "max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={clsx(
            "p-4 flex items-center justify-between",
            titleContainerClassName
          )}
        >
          <div className={clsx("font-semibold", titleClassName)}>{title}</div>
          <IconButton
            iconName="close"
            onClick={onCancel}
            {...iconButtonProps}
          />
        </div>
        <DialogWrapper>
          <DialogInner />
        </DialogWrapper>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  title: PropTypes.string,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string,
  cancelProps: PropTypes.object,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  submitProps: PropTypes.object,
  disableBackdropClick: PropTypes.bool,
  children: PropTypes.node,
  renderFooter: PropTypes.func,
  noBorderBottom: PropTypes.bool,
  noBorderTop: PropTypes.bool,
  formikProps: PropTypes.object,
  titleClassName: PropTypes.string,
  dialogClassName: PropTypes.string,
  titleContainerClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  backdropClassName: PropTypes.string,
};

export default Dialog;
