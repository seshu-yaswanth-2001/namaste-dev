import { useRef } from "react";
import "./focus.css";

function InputFocus() {
  const refUse = useRef(null);

  const handleClick = () => {
    // console.log(refUse.current.focus());
    refUse.current.focus();
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Type here"
        style={{ padding: "8px", fontSize: "16px", marginRight: "10px" }}
        ref={refUse}
      />
      <button style={{ padding: "8px 12px" }} onClick={handleClick}>
        Focus Input
      </button>
    </div>
  );
}

export default InputFocus;
