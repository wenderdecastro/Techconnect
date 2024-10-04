import React from "react";


const Title = ({ children, style }) => {
    return (
      <h1 className={`font-bold text-primary-white mb-6 ${style}`}>
        {children}
      </h1>
    );
  };
  
  export default Title;
  