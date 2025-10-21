import PropTypes from "prop-types";

// PUBLIC_INTERFACE
export default function EmptyState({ title = "No tasks yet", subtitle = "Add your first todo above to get started." }) {
  /** Friendly empty state to guide the user. */
  return (
    <div className="empty" role="status" aria-live="polite">
      <div className="empty-emoji" aria-hidden="true">📝</div>
      <div style={{ fontWeight: 700, color: "var(--text)" }}>{title}</div>
      <div style={{ marginTop: 4 }}>{subtitle}</div>
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};
