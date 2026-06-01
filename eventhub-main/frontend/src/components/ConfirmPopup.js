import './ConfirmPopup.css';

export default function ConfirmPopup({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay active">
      <div className="modal-box">
        <h3>Confirm Event Creation</h3>
        <p>Are you sure you want to create this event?</p>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Yes, Create
          </button>
        </div>
      </div>
    </div>
  );
}