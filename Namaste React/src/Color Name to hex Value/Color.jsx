import React, { useState } from "react";
import { colorNameToHex } from "color-transformer-ui";
import "./color.css";

const Color = () => {
  // const [colorName, setColorName] = useState("");
  // const [hexValue, setHexValue] = useState("");
  // const [displyaColorName, setDisplayColorName] = useState("");
  // const [error, setError] = useState(false);

  // const handleClick = () => {
  //   const trimmedName = colorName.trim();

  //   if (!trimmedName) {
  //     setError(true);
  //     setHexValue("");
  //     setDisplayColorName("");
  //     return;
  //   }

  //   setDisplayColorName(trimmedName);
  //   try {
  //     const hex = colorNameToHex(trimmedName);
  //     setHexValue(hex);
  //     setError(false);
  //   } catch (e) {
  //     setError(true);
  //     setHexValue("");
  //   }
  //   setColorName("");
  // };

  const [input, setInput] = useState("");
  const [color, setColor] = useState(null);
  const [error, setError] = useState(false);

  const handleClick = () => {
    try {
      const hex = colorNameToHex(input.trim().toLowerCase());
      if (hex) {
        setColor({
          name: input.trim(),
          hex,
        });
        setError(false);
      }
    } catch {
      setError(true);
      setColor(null);
    }
  };

  return (
    <div className="container">
      <h1>Color Explorer</h1>
      <div className="input-section">
        <input
          type="text"
          data-testid="color-input"
          placeholder="Type a color name e.g. lavender"
          // value={colorName}
          // onChange={(e) => {
          //   setColorName(e.target.value);
          //   setError(false);
          // }}

          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button data-testid="search-button" onClick={handleClick}>
          🔍
        </button>
      </div>
      {error ? (
        <p className="error">Sorry, I couldn't recognize that color.</p>
      ) : (
        <div className="color-box" data-testid="color-box">
          <div
            className="preview"
            style={{ ...(color?.hex && { backgroundColor: color?.hex }) }}
            role="presentation"
            data-testid="color-preview"
          ></div>
          <p data-testid="color-name">
            <strong>Name: {color?.name}</strong>
          </p>
          <p data-testid="color-hex">
            <strong>Hex: {color?.hex}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Color;
