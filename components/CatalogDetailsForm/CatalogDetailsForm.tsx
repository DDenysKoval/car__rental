import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import css from "./CatalogDetailsForm.module.css";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Flatpickr from "react-flatpickr";
import clsx from "clsx";
import ButtonComp from "../ButtonLink/Button";

export interface SubmitFormValues {
  name: string;
  email: string;
  date: string;
  comment: string;
}

const initialValues: SubmitFormValues = {
  name: "",
  email: "",
  date: "",
  comment: "",
};

const SumbitFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name is too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const CatalogDefaultForm = () => {
  const router = useRouter();
  const handleSubmit = (
    values: SubmitFormValues,
    actions: FormikHelpers<SubmitFormValues>
  ) => {
    const isValid = values.name.trim() !== "" && values.email.trim() !== "";

    if (isValid) {
      toast.success("Rent car was successfully!");
      actions.resetForm();
      router.push("/");
    } else {
      toast.error("Please enter correct data");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SumbitFormSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className={css.form}>
          <h2 className={css.formTitle}>Book your car now</h2>
          <p className={css.formText}>
            Stay connected! We are always ready to help you.
          </p>
          <div className={css.inputWrapper}>
            <Field
              className={css.input}
              type="name"
              name="name"
              placeholder="Name*"
            ></Field>
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>
          <div className={css.inputWrapper}>
            <Field
              className={css.input}
              type="email"
              name="email"
              placeholder="Email*"
            ></Field>
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>
          <div className={css.inputWrapper}>
            <Flatpickr
              name="date"
              options={{
                mode: "range",
                dateFormat: "Y-m-d",
              }}
              value={values.date}
              onChange={(selectedDates) => {
                setFieldValue("date", selectedDates);
              }}
              className={css.input}
              placeholder="Booking date"
            />
            <ErrorMessage name="date" component="span" className={css.error} />
          </div>
          <Field
            className={clsx(css.input, css.last)}
            as="textarea"
            name="comment"
            placeholder="Comment"
          ></Field>
          <ButtonComp type="submit" width={156} text="Send" />
        </Form>
      )}
    </Formik>
  );
};
export default CatalogDefaultForm;
