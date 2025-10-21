import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";

// PUBLIC_INTERFACE
export default function TodoList({ todos, onToggle, onEdit, onDelete }) {
  /** Renders the list of todos or an EmptyState. */
  if (!todos || todos.length === 0) {
    return (
      <div className="card" aria-label="Todo list empty">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="card">
      <ul className="todo-list" role="list" aria-label="Todo list">
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
