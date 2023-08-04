import React, { useState } from 'react';

const Dropdown = ({ options, onChange, msg }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleOnChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <select value={selectedValue} onChange={handleOnChange}>
      {msg !== undefined && <option value="">{msg}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;