import React, { useState } from "react";
import { apiPath } from "../api";

function DeleteTimeOff({ eventId, onDelete }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(apiPath(`/timeoff`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: eventId }),
      });
      onDelete();
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <button className="delete-button" onClick={handleDeleteClick}>
        Delete Event
      </button>
      {showConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this event?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </>
  );
}

export default DeleteTimeOff;
