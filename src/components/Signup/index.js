import React, { useState } from "react";
import { signupFields } from "../../constants/formFields.js";
import {FormAction, InputForm} from '../Form'

const fields = signupFields;
let fieldsState = {};
fields.forEach((field) => {
  fieldsState[field.id] = "";
});

function SignupForm() {
    const [signup, setSignup] = useState(fieldsState);

    const handleChange = (e) => {
        setSignup({...signup, [e.target.id]: e.target.value})
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
            <FormAction customStyle='bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 ease-in-out' onSubmit={handleSubmit} text='Đăng ký'/>
          </div>
        </form>
      </div>
    );
}

export default SignupForm