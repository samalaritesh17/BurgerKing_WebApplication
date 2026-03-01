import { useEffect } from "react";

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="ui-modal-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="ui-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="ui-modal-header">
          <div>
            <h2 className="ui-modal-title">{title}</h2>
            {description ? <p className="ui-modal-subtitle">{description}</p> : null}
          </div>
        </div>

        <div className="ui-modal-actions">
          <button type="button" className="secondary-btn" onClick={onCancel}>
            {cancelText}
          </button>
          <button
            type="button"
            className={danger ? "danger-btn" : "primary-btn"}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
