import React from "react";
import clsx from "clsx";
import { ErrorMessage, Field } from "formik";

import { scrollIntoView } from "../../utils";

function FormTextArea(props) {
  const {
    disabled,
    label,
    name,
    onChange,
    placeholder,
    parentWrapClassName,
    isUpperCase = false,
    isRequired = true,
    ...rest
  } = props;
  return (
    <div className={clsx(parentWrapClassName, "relative mb-4")}>
      <div
        className={clsx(
          "border border-solid border-[#C6C9C4] rounded-lg p-4 relative flex",
          disabled && "opacity-50 pointer-events-none text-[#999C98]"
        )}
      >
        <label
          className="text-sm text-[#383937] font-light absolute -top-3 bg-white px-2"
          htmlFor={name}
        >
          {label}
          {isRequired && <b className="text-red-700">*</b>}
        </label>
        <Field name={name}>
          {(fieldProps) => {
            const { field } = fieldProps;
            return (
              <textarea
                className={clsx(
                  "text-[#383937] font-medium w-full bg-transparent placeholder:text-typo-placeholder placeholder:font-medium min-h-[90px]",
                  isUpperCase && "uppercase"
                )}
                {...rest}
                placeholder={placeholder || ""}
                id={name}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  if (onChange) onChange(e);
                }}
                onFocus={(e) => scrollIntoView(e)}
                disabled={disabled}
              />
            );
          }}
        </Field>
      </div>
      <ErrorMessage
        render={(msg) => (
          <div
            data-testid="errorText"
            className="text-xs text-[#E53B3B] text-left mt-[5px]"
          >
            {msg}
          </div>
        )}
        name={name}
      />
    </div>
  );
}

export default FormTextArea;
