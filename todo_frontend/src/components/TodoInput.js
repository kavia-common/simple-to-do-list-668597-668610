import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
export default function TodoInput({ onAdd }) {
  /** Controlled input with Enter-to-add; prevents empty/whitespace-only values. */
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setError("");
  }, [value]);

  const handleAdd = () => {
    const title = value.trim();
    if (!title) {
      setError("Please enter a task title.");
      inputRef.current?.focus();
      return;
    }
    const ok = onAdd?.(title);
    if (ok) setValue("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="card" aria-label="Add todo form">
      <div className="input-row">
        <input
          ref={inputRef}
          type="text"
          className="input"
          placeholder="What do you need to do?"
          aria-label="Todo title"
          aria-invalid={!!error}
          aria-describedby={error ? "todo-input-error" : undefined}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button type="button" className="btn btn-primary" onClick={handleAdd} aria-label="Add todo">
          ➕ Add
        </button>
      </div>
      {error ? (
        <div id="todo-input-error" role="alert" style={{ color: "var(--error)", marginTop: 8 }}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

TodoInput.propTypes = {
  onAdd: PropTypes.func.isRequired
};
