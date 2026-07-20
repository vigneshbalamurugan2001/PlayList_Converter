import './StatusMessage.css';

function StatusIcon({ type }) {
  if (type === 'success') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 13l4 4L19 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusMessage({ type, message, onClose }) {
  return (
    <div className={`status-message ${type}`}>
      <span className="status-content">
        <StatusIcon type={type} />
        {message}
      </span>
      <button className="close-btn" onClick={onClose} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}

export default StatusMessage;
