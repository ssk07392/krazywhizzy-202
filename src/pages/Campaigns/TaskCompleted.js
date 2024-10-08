import React from "react";
import { Button, Stack } from "@mui/material";
import { Cross, Redo, RightStatus } from "../../svg";
import { useDispatch } from "react-redux";
import { CampaignApplicationStepper } from "../../actions/campaign";
import { toast } from "react-toastify";


const TaskCompleted = ({ id, setStoreStatus }) => {

  // const dispatch = useDispatch();

  // const handleClick = () => {
  //   const data = {
  //     id : id,
  //     applicationStatus : 6
  //   }
  //   dispatch(CampaignApplicationStepper(data))
  //   .then((res) => {
  //     console.log('res------>: ', res);
  //     toast.success(res.status);
  //     setStoreStatus(7)
  //   })
  //   .catch((err) => {
  //     toast.error(err);
  //   });
  // }

  return (
    <>
      <Stack direction="row" spacing={2} className="pending-btn-row">
        {/* <Button variant="contained" className="approved" onClick={() => handleClick()}><RightStatus svgFill="#B71C1C" />Mark as completed</Button> */}
        {/* <Button variant="outlined" className="rejected"><Cross svgFill="#B71C1C" />Stop working</Button>
        <Button variant="contained" className="approved"><Redo svgFill="#ffffff" />Redo</Button> */}
      </Stack>
    </>
  );
};

export default TaskCompleted;
