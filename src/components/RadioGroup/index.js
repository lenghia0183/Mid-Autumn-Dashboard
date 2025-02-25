import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useField } from "formik";

const RadioGroup = ({ name, children, vertical = true, className }) => {
  const [field, meta, helpers] = useField(name);

  const enhanceChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      if (child.type?.name === "FormikRadio") {
        return React.cloneElement(child, {
          name,
        });
      }

      if (child.props?.children) {
        return React.cloneElement(child, {
          children: enhanceChildren(child.props.children),
        });
      }

      return child;
    });
  };

  if (vertical)
    return (
      <>
        <div className={clsx("flex flex-col", className)}>
          {enhanceChildren(children)}
          {meta.error && (
            <div className="text-red-500 text-sm mt-1 text-left">
              {meta.error}
            </div>
          )}
        </div>
      </>
    );

  return (
    <>
      <div className={clsx("flex", className)}>{enhanceChildren(children)}</div>
      {meta.error && (
        <div className="text-red-500 text-sm mt-1 text-left">{meta.error}</div>
      )}
    </>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default RadioGroup;
