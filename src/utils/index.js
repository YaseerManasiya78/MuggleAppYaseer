export const scrollIntoView = (e) =>
  e.target.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "start",
  });

export const ValidateInput = (fieldName, value, regex, formik, length) => {
  if (length && value.toString().length > length) {
    formik.setFieldValue(fieldName, formik.values[`${fieldName}`]);
    return;
  }
  if (!regex.test(value)) {
    formik.setFieldValue(fieldName, formik.values[`${fieldName}`]);
    return;
  }
  formik.setFieldValue(fieldName, value);
};

export function createArrayByrange(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function removeEmptyValues(data) {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([_, v]) => ![null, undefined, "", [], {}].includes(v)
    )
  );
}
