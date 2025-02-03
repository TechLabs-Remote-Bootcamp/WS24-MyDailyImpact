import { useState, useRef, useEffect } from "react";
import dropdownStyles from "./Dropdown.module.scss";

const CustomSelect = ({
  options = ["Option 1", "Option 2", "Option 3"],
  defaultValue = null,
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultValue || (options.length > 0 ? options[0] : "")
  );
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div ref={dropdownRef} className={dropdownStyles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        className={{
          ...dropdownStyles.button,
          ...(isButtonHovered ? dropdownStyles.buttonHover : {}),
        }}
      >
        <span>{selectedOption || "Select an option"}</span>
        <svg style={dropdownStyles.arrow} viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>

      {isOpen && options.length > 0 && (
        <div style={dropdownStyles.dropdown}>
          {options.map((option, index) => (
            <div
              key={index}
              className={{
                ...dropdownStyles.option,
                ...(hoveredOption === index ? dropdownStyles.optionHover : {}),
              }}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHoveredOption(index)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Beispielkomponente
const DefaultExample = () => {
  const handleChange = (selectedOption) => {
    console.log("Selected:", selectedOption);
  };

  return <CustomSelect onChange={handleChange} />;
};

export default DefaultExample;
