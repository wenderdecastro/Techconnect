import React, { useState } from 'react';

const emailDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];

const CustomInput = ({ type = 'text', placeholder, size = 'md' , inputvalue , onChange}) => {
  // Definindo classes de tamanho com base na prop "size"
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };

  // Estados para gerenciar o valor do input, sugestões e a visibilidade das sugestões
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Função para lidar com a mudança no valor do input
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Se o tipo for 'email' e o valor contiver '@', iniciamos a lógica de autocomplete
    if (type === 'email' && value.includes('@')) {
      const inputDomain = value.split('@')[1]; // Obtém a parte do domínio
      const filteredSuggestions = emailDomains.filter((domain) =>
        domain.startsWith(inputDomain)
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false); // Se não houver '@', ocultar sugestões
    }
  };

  // Função para selecionar uma sugestão de domínio
  const handleSuggestionClick = (domain) => {
    const emailPrefix = inputValue.split('@')[0]; // Obtém a parte antes do '@'
    setInputValue(`${emailPrefix}@${domain}`);
    setShowSuggestions(false); // Oculta as sugestões após a seleção
  };

  return (
    <div className="relative w-full">
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full bg-[#191919] text-white border border-[#74BDE8] rounded-full focus:outline-none focus:ring-2 focus:ring-[#74BDE8] ${sizeClasses[size]} placeholder-white ${type === "date" ? "custom-datepicker" : ""
          }`}
      />

      {/* Renderiza as sugestões de domínio se houver e estiverem visíveis */}
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
