import { useEffect, useRef } from "react";
import heart from "../assets/heart.png";

function ResultModal({ result, onClose, onReset }) {
  const dialogRef = useRef(null);

  // native <dialog>: gives focus trapping and Esc to close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (result && !dialog.open) dialog.showModal();
    if (!result && dialog.open) dialog.close();
  }, [result]);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="result-title"
      onClose={onClose}
      onClick={(event) => {
        // click on the dimmed backdrop closes the modal
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      {result && (
        <div className="modal-card glass">
          <img src={heart} alt="" />
          <h2 id="result-title">Prediction result</h2>
          <p className="modal-message">{result.message}</p>
          <p className="modal-note">
            This is an estimate from a model, not a diagnosis. Please talk to
            a doctor about your heart health.
          </p>
          <div className="modal-actions">
            <button className="button ghost" type="button" onClick={onClose}>
              Review answers
            </button>
            <button className="button" type="button" onClick={onReset}>
              New check
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default ResultModal;