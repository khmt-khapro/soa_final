import React from "react";

const customClass =
  "rounded-sm appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none";

const InputForm = ({
  labelText,
  labelFor,
  handleChange,
  id,
  value,
  name,
  type,
  isRequired = "false",
  placeHolder,
}) => {
  return (
    <div className="my-4">
      <label htmlFor={labelFor} className="text-neutral-500 text-md font-bold text-left block mb-2">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        type={type}
        name={name}
        id={id}
        value={value}
        isrequired={isRequired}
        placeholder={placeHolder}
        className={customClass}
      />
    </div>
  );
};

export default InputForm;
