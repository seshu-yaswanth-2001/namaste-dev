import { useState } from "react";

const FieldValidation = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    location: false,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: name.trim() === "",
      location: location.trim() === "",
    };
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.location) {
      setSuccessMessage(
        `Submitted Successfully! \n Name: ${name} \n Location: ${location}`
      );
      setName("");
      setLocation("");
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name" className="label">
            Name <span className="asterisk">*</span>
          </label>
          <input
            className="input"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">Name is required</span>}
        </div>
        <div className="input-group">
          <label htmlFor="location" className="label">
            Name <span className="asterisk">*</span>
          </label>
          <input
            className="input"
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && (
            <span className="error">Location is required</span>
          )}
        </div>
        <button className="submit-button">Submit</button>
      </form>
      {successMessage && (
        <pre className="success-message">{successMessage}</pre>
      )}
    </div>
  );
};

export default FieldValidation;
