import { useState } from "react";
// import "./Leap.css";

const LeapYear = () => {
  const [year, setYear] = useState("");
  const [leapYear, setLeapYear] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [displayYear, setDisplayYear] = useState("");

  const handleClick = () => {
    if (!year) {
      setError(true);
      setChecked(true);
      return;
    }

    setError(false);

    const trimmedYear = year.trim().match(/\d+/g).join("") ?? "";
    const isLeap =
      (trimmedYear % 4 === 0 && trimmedYear % 100 !== 0) ||
      trimmedYear % 400 === 0;

    setDisplayYear(trimmedYear);
    setLeapYear(isLeap);
    setChecked(true);
  };

  return (
    <div className="container">
      <h1>Leap Year Checker</h1>
      <label>Enter a year:</label>
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <button onClick={handleClick}>Check</button>

      {checked &&
        !error &&
        (leapYear ? (
          <p className="result">{`${displayYear} is a leap year`}</p>
        ) : (
          <p className="result">{`${displayYear} is not a leap year`}</p>
        ))}

      {checked && error && <p className="error">Please enter a year</p>}
    </div>
  );
};

export default LeapYear;
