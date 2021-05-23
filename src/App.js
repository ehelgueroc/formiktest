import React from "react";
import './App.css';
import { Formik, Field, Form, useField, FieldArray } from "formik";
import { Button, Checkbox, FormControlLabel, TextField, Radio, Select, MenuItem } from "@material-ui/core";
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
      <Formik initialValues={{ firstName: '', lastName: '', isTall: false, cookies: [], yogurth: "", pets: [{type: "cat", name: "Samuel", id: "" + Math.random()}]}} 
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
            <FieldArray name="pets">
              {arrayHelpers => (
                <div>
                  {values.pets.map((pet,index) => {
                    
                    return (
                      <div key={pet.id}>
                        <MyTextField palceholder="pet name" name={`pets.${index}.name`} />
                        <Field name={`pets.${index}.type`} type="select" as={Select}>
                          <MenuItem value="cat">Cat</MenuItem>
                          <MenuItem value="dog">Dog</MenuItem>
                          <MenuItem value="frog">Frog</MenuItem>
                        </Field>
                      </div>
                    )
                  })}
                </div>
              )}
            </FieldArray>
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
