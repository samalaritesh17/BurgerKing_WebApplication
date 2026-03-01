import { useEffect, useMemo, useState } from "react";

const PromptDialog = ({
  open,
  title,
  description,
  label,
  placeholder,
  initialValue = "",
  inputMode = "text",
  type = "text",
  confirmText = "Save",
  cancelText = "Cancel",
  danger = false,
  validate,
  onConfirm,
  onCancel,
}) => {
  const [value, setValue] = useState(String(initialValue ?? ""));
  const [error, setError] = useState("");

  const validationMessage = useMemo(() => {
    if (!validate) return "";
    try {
      return validate(value) || "";
    } catch {
      return "Invalid value";
    }
  }, [validate, value]);

  useEffect(() => {
    if (!open) return;
    setValue(String(initialValue ?? ""));
    setError("");
  }, [open, initialValue]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel?.();
      if (e.key === "Enter") {
        e.preventDefault();
        if (validationMessage) {
          setError(validationMessage);
          return;
        }
        onConfirm?.(value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel, onConfirm, validationMessage, value]);

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

        {label ? (
          <label style={{ display: "block", marginTop: 2, fontSize: 12, color: "rgba(229,231,235,0.70)" }}>
            {label}
          </label>
        ) : null}

        <input
          className="ui-field"
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError("");
          }}
          autoFocus
        />

        {(error || validationMessage) ? (
          <div style={{ marginTop: 10, color: "#fecaca", fontSize: 12, fontWeight: 700 }}>
            {error || validationMessage}
          </div>
        ) : null}

        <div className="ui-modal-actions">
          <button type="button" className="secondary-btn" onClick={onCancel}>
            {cancelText}
          </button>
          <button
            type="button"
            className={danger ? "danger-btn" : "primary-btn"}
            onClick={() => {
              if (validationMessage) {
                setError(validationMessage);
                return;
              }
              onConfirm?.(value);
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptDialog;
