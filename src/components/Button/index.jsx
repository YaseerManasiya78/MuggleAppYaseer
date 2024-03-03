import React from "react";
import clsx from "clsx";

export const Button = (props) => {
  const { variant = "contained" } = props;

  const btnVariant = {
    "bg-[#1677ff] text-white disabled:bg-[#869EC2]": variant === "contained",
    "bg-white text-primary disabled:text-[#869EC2] disabled:cursor-none disabled:border-[#869EC2]":
      variant === "outlined",
    "border border-solid border-[#23539A] disabled:border-[#869EC2] w-full":
      props.fullWidth,
  };

  const btnClassName = clsx(
    "rounded-full px-4 py-3 font-semibold",
    btnVariant,
    props.className
  );

  const { className, children, fullWidth, tag, buttonRef, ...otherProps } =
    props;
  return (
    <button className={btnClassName} ref={buttonRef} {...otherProps}>
      {children}
    </button>
  );
};
