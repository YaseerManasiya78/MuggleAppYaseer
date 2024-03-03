import React from "react";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";

function FormControl(props) {
  const { type, options, ...rest } = props;

  switch (type) {
    case "input":
      return <FormInput {...rest} />;
    case "select":
      return <FormSelect options={options} {...rest} />;
    case "textarea":
      return <FormTextArea {...rest} />;
    default:
      return null;
  }
}

export default FormControl;
