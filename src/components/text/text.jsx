import React from "react";

const Text = ({ children }) => {
    return (
      <p className="text-xl text-primary-white mb-4">
        {children}
      </p>
    );
  };
  
  export default Text;