import React from "react";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { CampaignApplicationStepper } from "../../actions/campaign";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ApproveWork = ({ id, setStoreStatus }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (status) => {
    if(status === 5){
      const data = {
        id : id,
        applicationStatus : status
      }
      dispatch(CampaignApplicationStepper(data))
      .then((res) => {
        console.log('res------>: ', res);
        toast.success(res.status);
        setStoreStatus(6);
      })
      .catch((err) => {
        toast.error(err);
      });
    }
    else{
      // reject from stepper
      const data = {
        id : id,
        applicationStatus : status
      }
      dispatch(CampaignApplicationStepper(data))
      .then((res) => {
        console.log('res------>: ', res);
        toast.success(res.status);
        // setStoreStatus(6);
        navigate('/campaigns');
      })
      .catch((err) => {
        toast.error(err);
      });
    }
  }

  return (
    <>
      <Stack direction="row" spacing={2} className="pending-btn-row">
        <Button variant="outlined" className="rejected" onClick={() => handleClick(5)}>Reject Application</Button>
        <Button variant="contained" className="approved" onClick={() => handleClick(6)}>Approve Application</Button>
      </Stack>
      {/* <Stack direction="row" spacing={2} className="pending-btn-row">
        <FormControl variant="filled">
          <TextField id="filled-multiline-static" label="Type here..." variant="filled" />
        </FormControl>
        <Button variant="contained" className="approved">Approved</Button>
      </Stack> */}
    </>
  );
};

export default ApproveWork;
