import React, { useState } from "react";
import { loginFields } from "../../constants/formFields.js";
import {FormExtra, FormAction, InputForm} from '../Form'

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => {
  fieldsState[field.id] = "";
});

function SigninForm() {
  const [login, setLogin] = useState(fieldsState);

  const handleChange = (e) => {
    setLogin({...login, [e.target.id]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    authenticateUser()
  }
  
  // API Đăng nhập
  const authenticateUser = () => {

  }
  return (
    <div>
      <form action="" className="mt-4 ">
        <div className="">
          {
              fields.map(field => (
                  <InputForm 
                      key={field.id}
                      onChange={handleChange}
                      value={field.value}
                      labelText={field.labelText}
                      labelFor={field.lableFor}
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      isrequired={field.isRequired}
                      placeHolder={field.placeHolder}
                  />
              ))
          }
          <FormExtra/>
          <FormAction customStyle='mt-4 bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 ease-in-out' onSubmit={handleSubmit} text='Đăng nhập'/>
        </div>
      </form>
    </div>
  );
}

export default SigninForm;
