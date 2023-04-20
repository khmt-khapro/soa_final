import React, { useState } from "react";
import { forgetPassField } from "../../constants/formFields.js";
import {FormAction, InputForm} from '../Form/index.js'

const fields = forgetPassField;
let fieldsState = {};
fields.forEach((field) => {
  fieldsState[field.id] = "";
});

function ForgotPassword() {
    const [forgetPass, setForgetPass] = useState(fieldsState);

    const handleChange = (e) => {
        setForgetPass({...forgetPass, [e.target.id]: e.target.value})
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
            <FormAction customStyle='bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 ease-in-out' onSubmit={handleSubmit} text='Lấy lại mật khẩu'/>
          </div>
        </form>
      </div>
    );
}

export default ForgotPassword