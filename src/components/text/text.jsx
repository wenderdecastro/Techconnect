import React from "react";

const Text = ({ children, style }) => {
    return (
      <p className={`lg:text-xl text-primary-white mb-4 ${style}`}>
        {children}
      </p>
    );
  };
  
  export default Text;