import { useState } from "react";
import { apiPath } from "../api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import Loading from "./Loading";
import "../styles/createTeam.css"

const CreateTeam = ({ setTeamsDatabase }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [teamCode, setTeamCode] = useState("");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleCreateTeam = async () => {
    try {
      setIsLoading(true);
      const randomCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      const response = await fetch(apiPath("/teams"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ team_name: newName, team_code: randomCode }),
      });

      if (!response.ok) {
        throw new Error("Failed to create team");
      }

      setTeamsDatabase((prevTeams) => [
        ...prevTeams,
        { id: prevTeams.length + 1, name: newName, code: randomCode },
      ]);
      setTeamCode(randomCode);
      setSuccessDialogOpen(true);
      handleCloseDialog()
    } catch (error) {
      console.error("Error creating team:", error);
      setErrorDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  return (
    <div>
      <button className="button-create-team" onClick={handleOpenDialog}>
        Create Team
      </button>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle className="dialog-title"
          sx={{ fontFamily: "Fira Sans, sans-serif", color: "#47a67e" }}
        >
          Create New Team
        </DialogTitle>
        <DialogContent>
          <TextField 
          className="input-team-name"
            label="Team Name"
            value={newName}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            sx={{
              color: "#ff480069 !important",
              "&:hover": {
                backgroundColor: "#ff480069",
                color: "#f5f5f5 !important",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateTeam}
            color="primary"
            sx={{
              fontFamily: "Fira Sans, sans-serif",
              color: "#f5f5f5",
              bgcolor: "#83c5ab",
              "&:hover": {
                backgroundColor: "#47a67e;",
                color: "#f5f5f5",
              },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Alert severity="error">
            Failed to create team. Please try again.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
        <DialogTitle>Team Created</DialogTitle>
        <DialogContent>
          <div>
            <p>Team created successfully!</p>
            <p>Team Code: {teamCode}</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {isLoading && <Loading open={true}/>}
    </div>
  );
};

export default CreateTeam;
