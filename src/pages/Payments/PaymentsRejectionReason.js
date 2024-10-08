import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, FormControl, Grid, InputLabel, TextField } from "@mui/material";
import PaymentCard from "./PaymentCard";
import { toAbsoluteUrl } from "../../utils";
import { paymentPayout } from "../../actions/Payment";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const PaymentsRejectionReason = () => {

  const dispatch = useDispatch();
  const {rejectId} = useParams();

  const [rejectData, setRejectData] = useState([]);

  useEffect(() => {
    getPaymentList();
  }, [])

  const getPaymentList = () => {
    dispatch(paymentPayout(`?id=${rejectId}`))
      .then((res) => {
        if (res.code === 200) {
          console.log("res", res);
          setRejectData(res.data)
          toast.success(res.message);
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  return (
    <>
      <div className="avtar-header">
        <div className="avtar-info">
          <Avatar alt="Remy Sharp" src={toAbsoluteUrl('/images/profile_place.jpg')} sx={{ width: 78, height: 78 }} />
          <h4 className="user-name">{rejectData?.name}</h4>
        </div>
        <h4 className="avtar-info rejection">Payment Status: Rejected</h4>
      </div>
      <div className='border-paper'>
        <Grid container direction="row" spacing={2} className='mar-bottom-40'>
          <PaymentCard
            cardHeadign="Brand"
            cardContent={rejectData?.brand_name}
          />
          <PaymentCard
            cardHeadign="Contact Number"
            cardContent={rejectData?.phone_number}
          />
          <PaymentCard
            cardHeadign="Email"
            cardContent={rejectData?.email}
          />
          <PaymentCard
            cardHeadign="Price"
            cardContent={rejectData?.amount}
          />
          <PaymentCard
            cardHeadign="Campaign Title"
            cardContent={rejectData?.campaign_title}
          />
          <PaymentCard
            cardHeadign="Submitted On"
            cardContent={rejectData?.submission_date}
          />
        </Grid>
        <Divider className='divide-mar-40--40' />
        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <InputLabel id="demo-simple-select-label" className='extra-label'>Enter reason for rejection</InputLabel>
            <FormControl variant="filled">
              <TextField disabled={true} value={rejectData?.note} id="filled-multiline-static" label="Type here..." multiline rows={4} variant="filled" />
            </FormControl>
            {/* <div className='btn-row mar-top-20'>
              <Button variant="contained" className='min-width-180-img'>Save</Button>
            </div> */}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PaymentsRejectionReason;
