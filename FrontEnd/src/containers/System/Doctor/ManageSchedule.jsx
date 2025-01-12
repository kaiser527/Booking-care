import React from "react";
import { useSelector } from "react-redux";

const ManageSchedule = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return <div>Manage Schedule</div>;
};

export default ManageSchedule;
