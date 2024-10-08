import React from "react";
import { Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { CampaignApplicationStepper } from "../../actions/campaign";
import { toast } from "react-toastify";


const WorkingOnTask = ({ id, setStoreStatus, step }) => {

  const dispatch = useDispatch();

  const handleClick = (status) => {
    const data = {
      id : id,
      applicationStatus : status
    }
    dispatch(CampaignApplicationStepper(data))
    .then((res) => {
      console.log('res------>: ', res);
      toast.success(res.status);
      setStoreStatus(4);
    })
    .catch((err) => {
      toast.error(err);
    });
  }

  return (
    <>
      <Stack direction="row" spacing={2} className="pending-btn-row">
        <Button variant="contained" className="approved" onClick={() => handleClick(3)}>Work in process</Button>
      </Stack>
    </>
  );
};

export default WorkingOnTask;
