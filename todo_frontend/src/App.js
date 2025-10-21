import React, { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import theme from "./theme";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";

// PUBLIC_INTERFACE
function App() {
  /**
   * App shell: header, optional theme toggle (light only visuals), input and list.
   * Uses useTodos for state and persistence.
   */
  const [mode, setMode] = useState("light");
  const { todos, addTodo, toggleComplete, editTodo, deleteTodo, clearCompleted, stats } = useTodos();

  useEffect(() => {
    document.title = "Ocean Todos";
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const completedBadge = (
    <span className="badge badge-success" aria-label={`Completed ${stats.completed} of ${stats.total}`}>
      ✅ {stats.completed} done
    </span>
  );

  return (
    <div className="app-shell">
      <header className="header" role="banner">
        <div className="header-inner">
          <div className="brand">
            <h1 className="title" aria-label="Ocean Todos">Ocean Todos</h1>
            <p className="subtitle">Stay on top of your work</p>
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setMode((m) => (m === "light" ? "light" : "light"))}
            aria-label="Theme toggle (disabled - light mode)"
            title={`${theme.name} theme`}
            disabled
          >
            🌊 {theme.name}
          </button>
        </div>
      </header>

      <main className="container" role="main">
        <section aria-labelledby="add-todo-section">
          <h2 id="add-todo-section" className="visually-hidden" style={{ position: "absolute", left: "-9999px" }}>
            Add todo
          </h2>
          <TodoInput onAdd={addTodo} />
        </section>

        <section aria-labelledby="todo-list-section" style={{ marginTop: 14 }}>
          <div className="footer-row" style={{ marginBottom: 8 }}>
            <div>
              <span className="badge" aria-label={`Total tasks ${stats.total}`}>📋 {stats.total} total</span>
              <span style={{ marginLeft: 8 }}>{completedBadge}</span>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              onClick={clearCompleted}
              disabled={stats.completed === 0}
              aria-label="Clear completed tasks"
            >
              🧹 Clear completed
            </button>
          </div>

          <TodoList
            todos={todos}
            onToggle={toggleComplete}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
