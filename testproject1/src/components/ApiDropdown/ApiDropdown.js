import React, { useState, useRef, useEffect } from "react";
import "./ApiDropdown.css";

const ApiDropdown = ({ apiList = [], selectedApi, onApiSelect = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [hasConfirmedSelection, setHasConfirmedSelection] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // ✅ Filter the list based on search input
  const filteredApis = searchTerm
    ? apiList.filter((api) =>
        api.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : apiList;

  // ✅ Handle item selection (mouse click or keyboard enter)
  const handleSelect = (api) => {
    onApiSelect(api);
    setSearchTerm(api.name);
    setIsOpen(false);
    setHasConfirmedSelection(true);
  };

  // ✅ Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredApis.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredApis.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && filteredApis[highlightedIndex]) {
        handleSelect(filteredApis[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      if (!hasConfirmedSelection) {
        setSearchTerm("");
        onApiSelect(null);
      }
    }
  };

  // ✅ Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutside =
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target);

      if (clickedOutside) {
        setIsOpen(false);

        // if user has NOT selected anything, reset input
        if (!hasConfirmedSelection) {
          setSearchTerm("");
          onApiSelect(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [hasConfirmedSelection, onApiSelect]);

  // ✅ Handle input focus and typing
  const handleFocus = () => {
    setIsOpen(true);
    setHasConfirmedSelection(false);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    setHasConfirmedSelection(false);
  };

  return (
    <div className="api-dropdown" ref={dropdownRef}>
      <input
        ref={inputRef}
        type="text"
        value={
          hasConfirmedSelection && selectedApi
            ? selectedApi.name
            : searchTerm
        }
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder="Type to search or select an API"
        className="api-search-input"
      />

      {isOpen && (
        <ul className="dropdown-list" role="listbox">
          {filteredApis.length > 0 ? (
            filteredApis.map((api, index) => (
              <li
                key={api.path}
                onClick={() => handleSelect(api)}
                className={`dropdown-item ${
                  index === highlightedIndex ? "selected" : ""
                }`}
              >
                {api.name}
              </li>
            ))
          ) : (
            <li className="error-text">No matching APIs found</li>
          )}
        </ul>
      )}

      {hasConfirmedSelection && selectedApi && (
        <div className="api-description-box">
          {selectedApi.description || "No description available."}
        </div>
      )}
    </div>
  );
};

export default ApiDropdown;
