import React from "react";
import { Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { CampaignApplicationStepper } from "../../actions/campaign";


const UserStatus = ({ id, setStoreStatus }) => {

  const dispatch = useDispatch();

  const handleClick = (status) => {
    const data = {
      id : id,
      applicationStatus : status
    }
    dispatch(CampaignApplicationStepper(data))
    .then((res) => {
      toast.success(res.status);
      setStoreStatus(2);
    })
    .catch((err) => {
      toast.error(err);
    });
  }

  return (
    <>
      <Stack direction="row" spacing={2} className="pending-btn-row">
        <Button variant="outlined" className="rejected" onClick={() => handleClick(0)}>Rejected</Button>
        <Button variant="contained" className="approved" onClick={() => handleClick(1)}>Approved</Button>
      </Stack>
    </>
  );
};

export default UserStatus;
