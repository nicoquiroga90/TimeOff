import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { apiPath } from "../api";
import { TeamDataContext } from "../component/Context";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import "../styles/createMember.css";

function CreateMember() {
  const { code } = useParams();
  const { teams, refreshTeamData } = useContext(TeamDataContext);

  const [teamId, setTeamId] = useState(null);
  const [memberData, setMemberData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    color: "#000000",
    allowed_dayoff: 0,
  });

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const team = teams.find((team) => team.team_code === code);
    if (team) {
      setTeamId(team.id);
    } else {
      console.error(`Team with code_team '${code}' not found.`);
    }
  }, [code, teams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiPath("/members"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...memberData,
          team_id: teamId,
          assigned_dayoff: 0,
        }),
      });

      if (response.ok) {
        alert("Member created successfully!");
        refreshTeamData();
        setMemberData({
          first_name: "",
          last_name: "",
          email: "",
          color: "#000000",
          allowed_dayoff: 0,
        });
        handleCloseDialog();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to create member. Please try again.");
      }
    } catch (error) {
      console.error("Error creating member:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button
        className="button"
        sx={{
          color: "#f5f5f5",
          bgcolor: "#83c5ab",
          "&:hover": {
            backgroundColor: "#47a67e",
            color: "#f5f5f5",
          },
        }}
        variant="contained"
        onClick={handleOpenDialog}
      >
        Create Member
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        className="dialog"
        fullWidth
      >
        <DialogTitle
          className="dialog-title"
          sx={{ fontFamily: "Fira Sans, sans-serif", color: "#47a67e" }}
        >
          Create New Member
        </DialogTitle>
        <DialogContent className="dialog-content">
          <form onSubmit={handleSubmit} className="member-form">
            <div className="text-field">
              <TextField
                className="field-first-name"
                label="First Name"
                name="first_name"
                value={memberData.first_name}
                onChange={handleChange}
                fullWidth
              />
            </div>
            <div className="text-field">
              <TextField
                className="field-last-name"
                label="Last Name"
                name="last_name"
                value={memberData.last_name}
                onChange={handleChange}
                fullWidth
              />
            </div>
            <div className="text-field">
              <TextField
                className="field-email"
                label="Email"
                name="email"
                type="email"
                value={memberData.email}
                onChange={handleChange}
                fullWidth
              />
            </div>
            <div className="text-field">
              <TextField
                className="field-color"
                label="Color"
                name="color"
                type="color"
                value={memberData.color}
                onChange={handleChange}
                fullWidth
              />
            </div>
            <div className="text-field">
              <TextField
                className="field-allowed"
                label="Allowed Dayoff"
                name="allowed_dayoff"
                type="number"
                value={memberData.allowed_dayoff}
                onChange={handleChange}
                fullWidth
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            className="button-cancel"
            onClick={handleCloseDialog}
            sx={{
              fontFamily: "Fira Sans, sans-serif",
              color: "#47a67e",
              "&:hover": {
                backgroundColor: "#ff480069",
                color: "#f5f5f5",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            className="button-create"
            onClick={handleSubmit}
            sx={{
              fontFamily: "Fira Sans, sans-serif",
              color: "#f5f5f5",
              bgcolor: "#83c5ab",
              "&:hover": {
                backgroundColor: "#47a67e;",
                color: "#f5f5f5",
              },
            }}
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateMember;
