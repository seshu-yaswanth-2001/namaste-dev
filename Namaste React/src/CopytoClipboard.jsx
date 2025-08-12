import { useState } from "react";

const CopytoClipboard = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState(false);

  const handleClick = (value) => {
    setErr("");
    if (!value.trim()) {
      setErr("failed");
      return;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type Something"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => handleClick(text)}>Copy</button>
      {copied && <p>✓ Copied!</p>}
      {err && <p>{err}</p>}
    </div>
  );
};

export default CopytoClipboard;
