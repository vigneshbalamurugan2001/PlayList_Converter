import './StatusMessage.css';

function StatusMessage({ type, message, onClose }) {
  return (
    <div className={`status-message ${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
}

export default StatusMessage;
