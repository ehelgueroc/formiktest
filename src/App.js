import React from "react";
import './App.css';
import { Formik, Field, Form, useField } from "formik";
import { Button, Checkbox, FormControlLabel, TextField, Radio } from "@material-ui/core";
import * as yup from 'yup';

const MyRadio = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <FormControlLabel {...field} control={<Radio/>} label={label} />
  )
}

const MyTextField = ({placeholder, ...props}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText}/>
  )
}

const validationSchema = yup.object({
  firstName: yup.string().required().max(10)
});

function App() {
  return (
    <div className="App">
      <Formik initialValues={{ firstName: '', lastName: '', isTall: false, cookies: []}} 
      // validate={(values) => {
      //   const errors = {};
      //   if (values.firstName.includes('bob')){
      //     errors.firstName = 'no bob';
      //   }

      //   return errors;
      // }}
      validationSchema={validationSchema}
      onSubmit={(data, {setSubmitting}) => {
        setSubmitting(true);
        console.log(data);
        setSubmitting(false);
      }}>
        {({ values, isSubmitting, errors }) => (
          <Form>
            <MyTextField name="firstName" placeholder="Firstname" type="input" />
            
            <Field name="lastName" placeholder="Lastname" type="input" as={TextField}/>
            <Field name="istall" type="checkbox" as={Checkbox}/>
            <p>Cookies</p>
            <Field name="cookies" type="checkbox" value="chocolate" as={Checkbox}/>
            <Field name="cookies" type="checkbox" value="dulce de leche" as={Checkbox}/>
            <Field name="cookies" type="checkbox" value="chips" as={Checkbox}/>
            <p>Yogurth</p>
            <MyRadio name="yogurth" type="radio" label="Peach" value="peach" />
            <MyRadio name="yogurth" type="radio" label="Apple" value="apple" />
            <MyRadio name="yogurth" type="radio" label="Banana" value="banana" />
            <div>
              <Button disabled={isSubmitting} type="submit">Submit</Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
      
    </div>
  );
}

export default App;
