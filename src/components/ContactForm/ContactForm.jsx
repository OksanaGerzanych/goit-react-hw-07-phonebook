import React from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import { useSelector } from 'react-redux/es/exports';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import {
  FormField,
  Form,
  FormButton,
  ErrorMessage,
} from 'components/ContactForm/ContactForm.styled';


const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
      message:
        'Invalid name. Name may contain only letters, apostrophe, dash and spaces.',
    })
    .required('Please, enter contact name'),
  number: Yup.string()
    .matches( /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
, {
      message: 'Phone number is not valid.',
    })
    .required('Please, enter phone number'),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
   
    const existstName = contacts.find(contact => contact.name === values.name);
  
    if (existstName) {
      return Notify.info(`This name is already in contacts!`);
    }
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
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
};
