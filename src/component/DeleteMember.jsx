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
} from "@mui/material";
import "../styles/deleteMember.css";

const DeleteMember = () => {
  const { members, teams, setMembers } = useContext(TeamDataContext);
  const [selectedMember, setSelectedMember] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const { code } = useParams();
  const [teamId, setTeamId] = useState(null);
  const [openSelectDialog, setOpenSelectDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const team = teams.find((team) => team.team_code === code);
        if (team) {
          setTeamId(team.id);
          const filtered = members.filter(
            (member) => member.team_id === team.id
          );
          setFilteredMembers(filtered);
        } else {
          console.error(`Team with code '${code}' not found.`);
          setFilteredMembers([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [code, teams, members]);

  const handleOpenSelectDialog = () => {
    setOpenSelectDialog(true);
  };

  const handleCloseSelectDialog = () => {
    setOpenSelectDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleDeleteMember = async () => {
    handleCloseSelectDialog();
    handleOpenConfirmDialog();
  };

  const confirmDeleteMember = async () => {
    try {
      const response = await fetch(apiPath("/members"), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedMember }),
      });

      if (response.ok) {
        const updatedMembers = filteredMembers.filter(
          (member) => member.id !== Number(selectedMember)
        );
        setFilteredMembers(updatedMembers);
        alert("Member deleted successfully");
        setMembers(updatedMembers);
        handleCloseConfirmDialog();
      } else {
        alert("Failed to delete member. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const handleMemberChange = (e) => {
    setSelectedMember(e.target.value);
  };

  return (
    <div className="deleteMember-container">
      <Button
        className="button"
        variant="contained"
        onClick={handleOpenSelectDialog}
        sx={{
          "&:hover": {
            backgroundColor: "#f44336",
            color: "#f5f5f5",
          },
        }}
      >
        Delete Member
      </Button>

      <Dialog
        open={openSelectDialog}
        onClose={handleCloseSelectDialog}
        className="dialog"
      >
        <DialogTitle
          sx={{ fontFamily: "Fira Sans, sans-serif", color: "#f44336" }}
        >
          Delete Member
        </DialogTitle>
        <DialogContent
          sx={{ fontFamily: "Fira Sans, sans-serif", color: "#98908d" }}
        >
          <label htmlFor="memberSelect">Select Member: </label>
          <select
            className="deleteMember-select"
            id="memberSelect"
            value={selectedMember}
            onChange={handleMemberChange}
          >
            <option value="">Members</option>
            {filteredMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {`${member.first_name} ${member.last_name}`}
              </option>
            ))}
          </select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseSelectDialog}
            sx={{
              fontFamily: "Fira Sans, sans-serif",
              color: "#f44336",
              "&:hover": {
                backgroundColor: "#ff480069",
                color: "#f5f5f5",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteMember}
            sx={{
              backgroundColor: "#d32f2f !important",
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

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        className="dialog"
      >
        <DialogTitle
          sx={{ fontFamily: "Fira Sans, sans-serif", color: "#f44336" }}
        >
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          Are you sure you want to delete this member?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseConfirmDialog}
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
            onClick={confirmDeleteMember}
            sx={{
              backgroundColor: "#f44336 !important",
              color: "#f5f5f5 !important",
              "&:hover": {
                backgroundColor: "#fc5858 !important",
                color: "#f5f5f5",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteMember;
