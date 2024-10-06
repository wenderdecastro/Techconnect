import React, { useState } from 'react';

const emailDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];

const CustomInput = ({ type = 'text', placeholder, size = 'md', value, onChange }) => {
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
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
    <div className="relative w-full">
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full bg-[#191919] text-white border border-[#74BDE8] rounded-full focus:outline-none focus:ring-2 focus:ring-[#74BDE8] lg:${sizeClasses[size]} p-2 text-sm placeholder-white ${type === "date" ? "custom-datepicker" : ""
          }`}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-60 overflow-auto">
          {suggestions.map((domain, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
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
