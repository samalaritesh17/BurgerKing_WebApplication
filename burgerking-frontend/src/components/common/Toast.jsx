import { useEffect } from "react";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (!onClose) return;
    const t = setTimeout(() => onClose(), 10000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="ui-toast" role="status" aria-live="polite">
      <div className="ui-toast-message">{message}</div>
      <button className="ui-toast-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>
  );
};

export default Toast;
