import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  /** A single todo row with complete, edit, save/cancel and delete actions. */
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      setDraft(title);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isEditing, title]);

  const startEdit = () => setIsEditing(true);

  const cancelEdit = () => {
    setDraft(title);
    setIsEditing(false);
  };

  const saveEdit = () => {
    const text = draft.trim();
    if (!text) return;
    const ok = onEdit?.(id, text);
    if (ok !== false) setIsEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isEditing) saveEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (isEditing) cancelEdit();
    }
  };

  const confirmDelete = () => {
    // eslint-disable-next-line no-alert
    const yes = window.confirm("Delete this todo?");
    if (yes) onDelete?.(id);
  };

  return (
    <li className="todo-item" role="listitem" aria-label={`Todo item: ${title}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={!!completed}
        aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
        onChange={() => onToggle?.(id)}
        title={completed ? "Mark as incomplete" : "Mark as complete"}
      />
      <div>
        {!isEditing ? (
          <p className={`todo-title ${completed ? "completed" : ""}`} style={{ margin: 0 }}>
            {title}
          </p>
        ) : (
          <input
            ref={inputRef}
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Edit todo title"
          />
        )}
      </div>
      <div className="actions">
        {!isEditing ? (
          <>
            <button type="button" className="btn btn-outline" onClick={startEdit} aria-label="Edit todo">
              ✏️ Edit
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={confirmDelete}
              aria-label="Delete todo"
            >
              🗑️ Delete
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn btn-primary" onClick={saveEdit} aria-label="Save changes">
              ✅ Save
            </button>
            <button type="button" className="btn btn-outline" onClick={cancelEdit} aria-label="Cancel edit">
              ✖️ Cancel
            </button>
          </>
        )}
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
