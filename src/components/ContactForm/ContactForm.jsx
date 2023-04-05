import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import {
  FormField,
  Form,
  FormButton,
  ErrorMessage,
} from 'components/ContactForm/ContactForm.styled';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
      message:
        "Invalid name. Name may contain only letters, apostrophe, dash and spaces.",
    })
    .required('Please, enter contact name'),
  number: Yup.string()
    .matches(phoneRegExp, {
      message:
        'Phone number is not valid.',
    })
    .required('Please, enter phone number'),
});

export const ContactForm = ({ onSubmit }) => (
  <div>
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={ContactSchema}
      onSubmit={(values, actions) => {
        onSubmit({
          ...values,
          id: nanoid(),
        });
        actions.resetForm();
      }}
    >
      <Form>
        <FormField>
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField>
          Number
          <Field type="tel" name="number" />
          <ErrorMessage name="number" component="span" />
        </FormField>
        <FormButton type="submit">Add contact</FormButton>
      </Form>
    </Formik>
  </div>
);

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
