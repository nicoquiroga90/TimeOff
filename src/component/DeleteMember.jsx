import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { apiPath } from "../api";

function DeleteTimeOff({ eventId, onDelete }) {
  const [showConfirmation, setShowConfirmation] = useState(false);


  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = async () => {
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

  return (
    <>
      <Dialog open={showConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this event?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteTimeOff;
