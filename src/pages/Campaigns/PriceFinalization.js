import React, { useState } from "react";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { CampaignApplicationStepper } from "../../actions/campaign";
import { toast } from "react-toastify";

const defaultFormField = {
  price : ""
};


const PriceFinalization = ({ id, setStoreStatus }) => {

  const dispatch = useDispatch();

  const [formField, setFormField] = useState(defaultFormField);
  const [priceError, setPriceError] = useState(false);


  const {
    price
  } = formField;

  const onMutate = (e) => {
    const { value, name } = e.target;
    setFormField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const onFinish = (e) => {
    e.preventDefault();
    setPriceError(false)

    if (price === '') {
      return setPriceError(true);
    }

    const data = {
      id : id,
      price : price,
      applicationStatus : 2
    }
    dispatch(CampaignApplicationStepper(data))
    .then((res) => {
      console.log('res------>: ', res);
      toast.success(res.status);
      setStoreStatus(3);
    })
    .catch((err) => {
      toast.error(err);
    });
  }

  return (
    <>
      <Stack direction="row" spacing={2} className="pending-btn-row">
        <FormControl variant="filled">
          <TextField
           id="filled-multiline-static"
            label="Type here..."
             variant="filled"
             name="price" 
             onChange={onMutate}/>
        </FormControl>
        <Button variant="contained" className="approved" onClick={onFinish}>Approved</Button>
      </Stack>
        {priceError && (
          <p style={{ color: "red", marginTop: "5px" }}>
            Price is required
          </p>
        )}
    </>
  );
};

export default PriceFinalization;
