import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { apiPath } from "../api";

const DeleteTimeOff = ({
  eventId,
  eventDescription,
  memberName,
  onDelete,
  onCloseDialog,
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleCloseConfirmation = () => {
    setShowDeleteConfirmation(false);
    onCloseDialog();
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
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const renderActions = () => (
    <DialogActions>
      <Button
        onClick={handleCloseConfirmation}
        sx={{
          fontFamily: "Fira Sans, sans-serif",
          color: "#f44336",
          "&:hover": {
            backgroundColor: "#83c5ab !important",
            color: "#f5f5f5",
          },
        }}
      >
        Back
      </Button>
      <Button
        onClick={() => setShowDeleteConfirmation(true)}
        sx={{
          backgroundColor: "#f44336 !important",
          color: "#f5f5f5 !important",
          "&:hover": {
            backgroundColor: "#fc5858 !important",
            color: "#f5f5f5",
          },
        }}
      >
        Delete
      </Button>
    </DialogActions>
  );

  return (
    <>
      <Dialog open={true} onClose={handleCloseConfirmation}>
        <DialogTitle
          sx={{ fontFamily: "Fira Sans, sans-serif", color: "#47a67e" }}
        >
          {memberName}
        </DialogTitle>
        <DialogContent
          sx={{ fontFamily: "Fira Sans, sans-serif", fontWeight: 500 }}
        >
          <p>{eventDescription}</p>
        </DialogContent>
        {renderActions()}
      </Dialog>
      <DeleteConfirmationDialog
        open={showDeleteConfirmation}
        onClose={handleCloseConfirmation}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

const DeleteConfirmationDialog = ({ open, onClose, onConfirmDelete }) => {
  const handleConfirm = () => {
    onConfirmDelete();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle   sx={{ fontFamily: "Fira Sans, sans-serif", color: "#f44336" }}>Delete Event</DialogTitle>
      <DialogContent   sx={{ fontFamily: "Fira Sans, sans-serif"}}>
        <p>Are you sure you want to delete this event?</p>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            fontFamily: "Fira Sans, sans-serif",
            color: "#f44336",
            "&:hover": {
              backgroundColor: "#83c5ab !important",
              color: "#f5f5f5",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          autoFocus
          sx={{
            backgroundColor: "#f44336 !important",
            color: "#f5f5f5 !important",
            "&:hover": {
              backgroundColor: "#fc5858 !important",
              color: "#f5f5f5",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTimeOff;
