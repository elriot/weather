import React from 'react';
import classNames from 'classname';

function Label({ size = "medium", text, className, children }) {
  let textSize, fontWeight;

  switch(size) {
    case "small":
      textSize = "text-sm";
      fontWeight = "font-normal";
      break;
    case "large":
      textSize = "text-2xl";
      fontWeight = "font-bold";
      break;
    case "medium":
    default:
      textSize = "text-base";
      fontWeight = "font-medium";
  }
  const classes = classNames(textSize,fontWeight, "text-gray-800", className);
  return (
    <span className={classes}>
      {children}
    </span>
  );
}

export default Label;
