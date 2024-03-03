import React from "react";
import clsx from "clsx";
import { ErrorMessage, Field } from "formik";

import { scrollIntoView } from "../../utils";

function FormInput(props) {
  const {
    disabled,
    label,
    name,
    onChange,
    parentWrapClassName,
    placeholder,
    wrapClassName,
    isUpperCase = false,
    isRequired = true,
    ...rest
  } = props;
  return (
    <div
      className={clsx(
        "relative rounded-lg mb-4",
        disabled ? "bg-[#F9F9F9]" : "",
        parentWrapClassName
      )}
    >
      <div
        className={clsx(
          "border border-solid border-[#C6C9C4] rounded-lg p-4 relative flex",
          wrapClassName
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
              <input
                {...rest}
                className={clsx(
                  "text-[#383937] font-medium w-full bg-transparent placeholder:text-typo-placeholder placeholder:font-medium",
                  isUpperCase && "uppercase"
                )}
                type="text"
                placeholder={placeholder || ""}
                id={name}
                autoComplete="off"
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

export default FormInput;
