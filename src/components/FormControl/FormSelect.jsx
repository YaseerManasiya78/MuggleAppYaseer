import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ErrorMessage, Field, useFormikContext } from "formik";
import CaretIcon from "../../assets/images/caretIcon.svg";

const FormSelect = ({
  disabled,
  label,
  name,
  onChange,
  options,
  parentWrapClassName,
  placeholder,
  wrapClassName,
  isRequired = true,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const selectRef = useRef(null);
  const { validateField } = useFormikContext();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = (value, onChange, icon = "") => {
    onChange({ target: { name, value } });
    setIsOpen(false);
    setSelectedIcon(icon);
  };

  return (
    <div className={clsx("relative mb-4 cursor-pointer", parentWrapClassName)}>
      <div
        className={clsx(
          "border border-solid border-[#C6C9C4] rounded-lg p-4 relative",
          disabled && "opacity-50 pointer-events-none text-[#999C98]",
          wrapClassName
        )}
        ref={selectRef}
      >
        <label
          className="text-sm text-[#383937] font-light absolute -top-3 bg-white px-2"
          htmlFor={name}
        >
          {label}
          {isRequired && <b className="text-red-700">*</b>}
        </label>
        <div className="relative">
          <Field name={name}>
            {(fieldProps) => {
              const { field } = fieldProps;
              return (
                <>
                  <div
                    className="relative"
                    onClick={() => {
                      validateField(name);
                      if (!disabled) setIsOpen(!isOpen);
                    }}
                  >
                    <div className="flex items-center">
                      {!!selectedIcon && (
                        <img
                          src={selectedIcon}
                          className="h-6 w-6 -mt-2 mr-2"
                          alt="Icon"
                        />
                      )}
                      <input
                        {...rest}
                        type="text"
                        id={name}
                        className="border-0 p-0 appearance-none w-full cursor-pointer bg-transparent font-medium text-[#383937] invalid:text-[#C6C9C4] pointer-events-none grow"
                        placeholder={placeholder}
                        value={field.value}
                        readOnly
                        onChange={(e) => field.onChange(e)}
                        disabled={disabled}
                        required
                      />
                    </div>
                    <span className="absolute top-0 right-4 h-full flex items-center pointer-events-none">
                      <small className="text-[#383937]">
                        <img src={CaretIcon} alt="Caret Icon" />
                      </small>
                    </span>
                  </div>
                  {isOpen && (
                    <ul className="absolute top-full left-0 right-0 border border-solid border-[#C6C9C4] bg-white z-10 rounded-lg mt-1 overflow-y-scroll max-h-[200px]">
                      {options?.map((option, index) => (
                        <li
                          key={option.value}
                          className="cursor-pointer px-4 py-2 text-[#383937] hover:bg-gray-100 flex items-center"
                          onClick={() =>
                            handleSelect(
                              option.value,
                              field.onChange,
                              option?.icon
                            )
                          }
                        >
                          {option?.icon && (
                            <img
                              src={option?.icon}
                              className="h-6 w-6 -mt-2 mr-2"
                              alt="Icon"
                            />
                          )}
                          <div>{option.key}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              );
            }}
          </Field>
        </div>
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
};

export default FormSelect;
