import React, { useState } from 'react';
import classNames from 'classname';

const Dropdown = ({ options, initialValue, onChange, msg, className }) => {
  // console.log(className);
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleOnChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  const classes = classNames("border-2 bg-slate-200 rounded", className);
  return (
    <select className={classes} value={selectedValue} onChange={handleOnChange} >
      {msg !== undefined && <option value="" disabled>{msg}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value} >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;