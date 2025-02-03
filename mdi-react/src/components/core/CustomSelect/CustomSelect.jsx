import React, { useState, useRef, useEffect } from "react";

const dropdownStyles = {
  container: {
    position: "relative",
    display: "inline-block",
    width: "250px",
  },
  button: {
    fontSize: "1.2rem",
    width: "15rem",
    padding: "8px 16px",
    textAlign: "left",
    backgroundColor: "#e6e7f5",
    border: "1px solid #5055ba",
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    position: "relative",
  },
  buttonHover: {
    backgroundColor: "#e6e7f5",
  },
  arrow: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    fill: "#666",
  },
  dropdown: {
    position: "absolute",
    padding: "0.2em 0",
    // top: "calc(100% + 4px)",
    // left: "0",
    width: "15rem",
    backgroundColor: "#e6e7f5",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  option: {
    borderRadius: "10px",
    padding: "0.3em 1em",
    cursor: "pointer",
    transition: "background-color 0.2s",
    margin: "0",
  },
  optionHover: {
    backgroundColor: "#9b9ed7",
    color: "#fff",
  },
};

export default function CustomSelect({
  options = ["Option 1", "Option 2", "Option 3"],
  defaultValue = null,
  onChange = () => {},
}) {
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
    <div ref={dropdownRef} style={dropdownStyles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        style={{
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
              style={{
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
}
