import React from 'react';

const CustomInput = ({ type = 'text', placeholder, size = 'md' }) => {
  // Definindo classes de tamanho com base na prop "size"
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full bg-[#191919] text-white border border-[#74BDE8] rounded-full focus:outline-none focus:ring-2 focus:ring-[#74BDE8] ${sizeClasses[size]} placeholder-white`}
    />
  );
};

export default CustomInput;
