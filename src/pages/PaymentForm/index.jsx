import useFetchPaymentFormData from "../../hooks/useFetchPaymentForm";
import { useMemo } from "react";
import { Form, Formik } from "formik";
import FormControl from "../../components/FormControl";
import {
  ValidateInput,
  createArrayByrange,
  removeEmptyValues,
} from "../../utils";
import { ALPHABET_ONLY_REGEX, EMAIL_REGEX } from "../../utils/regex";
import { Button } from "../../components/Button";
import * as Yup from "yup";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
function PaymentForm() {
  const { loading, data } = useFetchPaymentFormData();
  const { product, merchant, tokens, fields, custom_fields } = useMemo(
    () => data || {},
    [data]
  );
  const navigate = useNavigate();
  const tokenOptions = useMemo(() => {
    if (tokens?.length > 0) {
      const tokenOptions = tokens?.map((item) => ({
        key: item?.symbol,
        value: item?.id,
        icon: item?.image_url,
      }));
      return tokenOptions;
    }
    return [];
  }, [tokens]);
  const quantityOptions = useMemo(() => {
    if (!!fields?.requires_quantity) {
      const { min, max } = fields?.requires_quantity;
      const array = createArrayByrange(min, max);

      const tokenOptions = array?.map((item) => ({
        key: item,
        value: item,
        icon: item?.image_url,
      }));
      return tokenOptions;
    }
    return [];
  }, [fields]);
  const validationSchema = useMemo(() => {
    return Yup.object({
      token: Yup.string().required("Please select token"),
      full_name: fields?.requires_name
        ? Yup.string().required("Full name is required")
        : Yup.string().nullable(),
      email: fields?.requires_email
        ? Yup.string()
            .matches(EMAIL_REGEX, "Please enter email in proper format")
            .required("Email is required")
        : Yup.string().nullable(),
      country: fields?.requires_country
        ? Yup.string().required("Country is required")
        : Yup.string().nullable(),
      quantity: fields?.requires_quantity
        ? Yup.string().required("Quantity select quantity")
        : Yup.string().nullable(),
      billing_address: fields?.requires_billing_address
        ? Yup.string().required("Billing address is required")
        : Yup.string().nullable(),
      shipping_address: fields?.shipping_address
        ? Yup.string().required("Shipping address is required")
        : Yup.string().nullable(),
      ...(custom_fields || []).reduce((acc, item) => {
        acc[item?.field] = Yup.string().required(`${item?.name} is required`);
        return acc;
      }, {}),
    });
  }, [custom_fields, fields]);

  const formInitialValue = {
    token: "",
    full_name: "",
    email: "",
    country: "",
    quantity: "",
    billing_address: "",
    shipping_address: "",
    ...(!!custom_fields &&
      custom_fields.reduce((acc, item) => {
        acc[item.field] = "";
        return acc;
      }, {})),
  };
  const handleSubmit = (values) => {
    const data = removeEmptyValues(values);
    navigate("/success");
    console.log(data, "Values");
  };
  const params = new URLSearchParams(window.location.search);
  const queryParam = params.get("pid");
  if (!queryParam) {
    alert("Id is not provided");
    return;
  }

  if (queryParam && loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col xl:flex-row h-screen">
      <div
        className="xl:w-full xl:px-20 xl:h-full min-h-[50%] px-4 text-white flex items-center justify-center flex-col"
        style={{ background: merchant?.style?.colors?.primary }}
      >
        <div className="flex items-center w-full gap-2 mb-5">
          <img
            loading="lazy"
            className="rounded-full h-8 w-8"
            src={merchant?.image_url}
            height={32}
            width={32}
            alt="Avatar"
          />
          <p className="font-medium">{merchant?.name}</p>
        </div>
        <div className="flex items-center w-full justify-between mb-2">
          <p>{product?.name}</p>
          <img
            loading="lazy"
            src={product?.image_url}
            className="rounded-full h-16 w-16"
            alt="Avatar"
          />
        </div>
        <p className="w-full text-3xl font-extrabold mb-2">${product?.price}</p>
        <div className="flex items-center w-full gap-2 justify-between pb-4 border-b">
          <p>{product?.description}</p>
          <p>${product?.price}</p>
        </div>
        <div className="flex items-center w-full justify-between my-4">
          <span>Total</span>
          <span>${product?.price}</span>
        </div>
      </div>
      <div className="xl:w-full xl:px-20 xl:h-full h-max px-4 flex items-center justify-center flex-col">
        <h3 className="text-lg mt-2 mb-3 self-start">Pay with crypto</h3>
        <Formik
          initialValues={formInitialValue}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnBlur
        >
          {(formik) => (
            <Form className="w-full">
              <section>
                <div>
                  {!!tokenOptions && (
                    <FormControl
                      type="select"
                      name="token"
                      placeholder="Select token"
                      label="Token"
                      options={tokenOptions}
                      value={formik.values.token || ""}
                    />
                  )}
                  {fields?.requires_name && (
                    <FormControl
                      type="input"
                      name="full_name"
                      label="Full Name"
                      value={formik.values.full_name || ""}
                      placeholder="Enter your full name"
                      onChange={(e) =>
                        ValidateInput(
                          "full_name",
                          e.target.value,
                          ALPHABET_ONLY_REGEX,
                          formik,
                          50
                        )
                      }
                    />
                  )}
                  {fields?.requires_email && (
                    <FormControl
                      type="input"
                      name="email"
                      label="Email"
                      value={formik.values.email || ""}
                      placeholder="Enter your email"
                      onChange={(e) =>
                        ValidateInput(
                          "full_name",
                          e.target.value,
                          EMAIL_REGEX,
                          formik,
                          60
                        )
                      }
                    />
                  )}
                  {fields?.requires_name && (
                    <FormControl
                      type="input"
                      name="country"
                      label="Country"
                      value={formik.values.country || ""}
                      placeholder="Enter country"
                      onChange={(e) =>
                        ValidateInput(
                          "country",
                          e.target.value,
                          ALPHABET_ONLY_REGEX,
                          formik,
                          50
                        )
                      }
                    />
                  )}
                  {fields?.requires_quantity && (
                    <FormControl
                      type="select"
                      name="quantity"
                      placeholder="Select Quantity"
                      label="Quantity"
                      options={quantityOptions}
                      value={formik.values.quantity || ""}
                    />
                  )}
                  {fields?.requires_billing_address && (
                    <FormControl
                      type="textarea"
                      name="billing_address"
                      placeholder="Enter billing address"
                      label="Billing address"
                      value={formik.values.billing_address || ""}
                    />
                  )}
                  {fields?.requires_shipping_address && (
                    <FormControl
                      type="textarea"
                      name="shipping_address"
                      placeholder="Enter shipping address"
                      label="Shipping address"
                      value={formik.values.shipping_address || ""}
                    />
                  )}
                  {!!custom_fields &&
                    custom_fields?.map((item, index) => (
                      <FormControl
                        type="input"
                        key={index}
                        name={item?.field}
                        label={item?.name}
                        value={formik.values?.[item?.field] || ""}
                        placeholder={item?.caption}
                      />
                    ))}
                </div>
              </section>
              <Button
                fullWidth
                type="submit"
                style={{ background: merchant?.style?.colors?.primary }}
              >
                Pay
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PaymentForm;
