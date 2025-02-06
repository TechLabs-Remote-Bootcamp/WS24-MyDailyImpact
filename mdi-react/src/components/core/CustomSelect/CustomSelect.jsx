import { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.scss";
import form from "../../../styles/forms.module.scss";

export default function CustomSelect({
  options = ["Option 1", "Option 2", "Option 3"],
  defaultValue = null,
  onSelectChange,
  onChange = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultValue || (options.length > 0 ? options[0] : "")
  );

  const [hoveredOption, setHoveredOption] = useState(null);
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
    setIsOpen(false);
    setSelectedOption(option);
    setIsOpen(false);
    onSelectChange(option); // Ruft die Callback-Funktion der Elternkomponente auf
    onChange(option); // Ruft die onChange-Funktion auf, falls vorhanden
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdown} ${form.inputSection}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${form.input} ${styles.dropdownButton} ${
          isOpen ? styles.active : ""
        }`}
      >
        <span className={styles.selectedOption}>
          {selectedOption || "Select an option"}
        </span>
        <svg className={styles.arrow} viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>

      {isOpen && options.length > 0 && (
        <div className={styles.optionsList}>
          {options.map((option, index) => (
            <div
              key={index}
              className={`${styles.option} ${
                hoveredOption === index ? styles.optionHovered : ""
              }`}
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
