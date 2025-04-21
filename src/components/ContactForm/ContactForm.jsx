"use client";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { addContact } from "../../redux/contactsSlice.js";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        "Name may contain only letters, apostrophe, dash and spaces."
      )
      .required("Name is required"),
    number: Yup.string()
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      )
      .required("Number is required"),
  });

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const isContactExist = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isContactExist) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    dispatch(
      addContact({
        id: nanoid(),
        name: values.name,
        number: values.number,
      })
    );

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label className={css.label} htmlFor="name">
              Name
            </label>
            <Field className={css.input} type="text" name="name" id="name" />
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label className={css.label} htmlFor="number">
              Number
            </label>
            <Field className={css.input} type="tel" name="number" id="number" />
            <ErrorMessage name="number" component="div" className={css.error} />
          </div>

          <button
            className={css.button}
            type="button"
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
