import React, { useState } from 'react';

const emailDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];

const CustomInput = ({ type = 'text', placeholder, size = 'md', value, onChange, handleKey }) => {
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'lg:p-4 lg:text-lg',
  };

  const [inputValue, setInputValue] = useState(value || ''); // Inicializa com o valor passado
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Atualizando o valor de input quando o valor vindo das props muda
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(e); // Chama a função onChange para atualizar o estado no componente pai

    if (type === 'email' && value.includes('@')) {
      const inputDomain = value.split('@')[1];
      const filteredSuggestions = emailDomains.filter((domain) =>
        domain.startsWith(inputDomain)
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (domain) => {
    const emailPrefix = inputValue.split('@')[0];
    const newValue = `${emailPrefix}@${domain}`;
    setInputValue(newValue);
    onChange({ target: { value: newValue } }); // Atualiza o valor no componente pai
    setShowSuggestions(false);
  };

  return (
    <div className="relative lg:w-full w-max lg:left-0 md:left-[12%] -left-[40%]">
      <input
        type={type}
        onKeyDown={handleKey}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full max-md:w-[125%] bg-[#191919] text-white border border-[#74BDE8] rounded-full focus:outline-none focus:ring-2 focus:ring-[#74BDE8] ${sizeClasses[size]} p-3 text-sm placeholder-neutral-light_gray ${type === "date" ? "custom-datepicker" : ""
          }`}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-lg max-h-60">
          {suggestions.map((domain, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(domain)}
            >
              {`${inputValue.split('@')[0]}@${domain}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomInput;
