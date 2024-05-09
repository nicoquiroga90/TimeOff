import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiPath } from '../api';
import MemberDetails from "../component/MemberDetails";


const MemberPage = () => {
  const [member, setMember] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(apiPath(`/members/${id}`));
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }
        const memberData = await response.json();
        setMember(memberData);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMember();
  }, [id]);

  if (!member) {
    return <div>Member data cannot be retrieved...</div>;
  }

  return (
    <div>
      <MemberDetails member={member} /> 
    </div>
  );
};

export default MemberPage;
