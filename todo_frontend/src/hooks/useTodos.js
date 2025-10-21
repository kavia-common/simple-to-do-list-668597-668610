import { useCallback, useEffect, useMemo, useState } from "react";
import { getItem, setItem } from "../utils/storage";

const STORAGE_KEY = "todos";

// PUBLIC_INTERFACE
export function useTodos() {
  /**
   * Manage todo state with add, toggle, edit, delete, and clear completed.
   * Persists to localStorage and restores on mount.
   */
  const [todos, setTodos] = useState(() => {
    const stored = getItem(STORAGE_KEY);
    return Array.isArray(stored) ? stored : [];
  });

  // Save to storage whenever todos change
  useEffect(() => {
    setItem(STORAGE_KEY, todos);
  }, [todos]);

  const addTodo = useCallback((title) => {
    const text = String(title || "").trim();
    if (!text) return false;
    const now = new Date().toISOString();
    setTodos((prev) => [
      {
        id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
        title: text,
        completed: false,
        createdAt: now,
        updatedAt: now
      },
      ...prev
    ]);
    return true;
  }, []);

  const toggleComplete = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t
      )
    );
  }, []);

  const editTodo = useCallback((id, title) => {
    const text = String(title || "").trim();
    if (!text) return false;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: text, updatedAt: new Date().toISOString() } : t))
    );
    return true;
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    return { total, completed, remaining: total - completed };
  }, [todos]);

  return {
    todos,
    addTodo,
    toggleComplete,
    editTodo,
    deleteTodo,
    clearCompleted,
    stats
  };
}

export default useTodos;
