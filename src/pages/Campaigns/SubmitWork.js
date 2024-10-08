import React, { useState } from "react";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import UploadHere from "../../components/UploadFile";
import { Link } from "react-router-dom";
import { CampaignApplicationStepper } from "../../actions/campaign";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const defaultFormField = {
  link : ""
};

const SubmitWork = ({ id, setStoreStatus }) => {

  const dispatch = useDispatch();

  const [fileupload, setFileupload] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [fileupload1, setFileupload1] = useState();
  const [fileupload2, setFileupload2] = useState();
  const [fileupload3, setFileupload3] = useState();
  const [fileupload4, setFileupload4] = useState();
  const [linkError, setLinkError] = useState(false);
  const [formField, setFormField] = useState(defaultFormField);

  const {
    link
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
    setLinkError(false);
    if(link === "" || !fileupload){
     return setLinkError(true);
    }
    const formData = new FormData();
    formData.append("id",id);
    formData.append("submissionLink",link)
    formData.append("submission_media_link",fileupload)
    formData.append("applicationStatus",4)
    const data = {
      id : id,
      submissionLink : link ? link : '',
      submission_media_link : fileupload ? fileupload : [],
      applicationStatus : 1
    }
    console.log('data: ', data);
    dispatch(CampaignApplicationStepper(formData))
    .then((res) => {
      console.log('res------>: ', res);
      toast.success(res.status);
      setStoreStatus(5);
    })
    .catch((err) => {
      toast.error(err);
    });
  }
  return (
    <>
      <Stack direction="row" spacing={2} className="pending-btn-row">
        <FormControl variant="filled">
          <TextField id="filled-multiline-static"
           label="Type here..."
            variant="filled"
          name="link" 
          onChange={onMutate}/>
        </FormControl>
        <Button variant="contained" className="approved" onClick={onFinish}>Approved</Button>
      </Stack>
      {linkError && (
          <p style={{ color: "red", marginTop: "5px" }}>
            Media file or Link is required
          </p>
        )}
      {/* <Link to="/">https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwiGl-zUvtr6AhUuxTgGHWxBAxUQPAgI</Link> */}
      <Stack direction="row" spacing={1}>
        {/* <UploadHere uploadLabel="" uploadText="" uploadBtn="+" uplaodWidth={166} uplaodHeight={248} setFileupload={setFileupload} imageUrl={imageUrl} setImageUrl={setImageUrl} /> */}
        <UploadHere uploadLabel="" uploadText="" uploadBtn="+" uplaodWidth={166} uplaodHeight={248} setFileupload1={setFileupload1} setFileupload2={setFileupload2} setFileupload3={setFileupload3} setFileupload4={setFileupload4} fileupload1={fileupload1} fileupload2={fileupload2} fileupload3={fileupload3} fileupload4={fileupload4} imageUrl={imageUrl}  setImageUrl={setImageUrl} imgselect={1} />
        {/* <UploadHere uploadLabel="" uploadText="" uploadBtn="+" uplaodWidth={166} uplaodHeight={248} setFileupload2={setFileupload2} fileupload2={fileupload2} imageUrl={imageUrl} setImageUrl={setImageUrl} imgselect={2} />
        <UploadHere uploadLabel="" uploadText="" uploadBtn="+" uplaodWidth={166} uplaodHeight={248} setFileupload3={setFileupload3} fileupload3={fileupload3} imageUrl={imageUrl} setImageUrl={setImageUrl} imgselect={3} />
        <UploadHere uploadLabel="" uploadText="" uploadBtn="+" uplaodWidth={166} uplaodHeight={248} setFileupload4={setFileupload4} fileupload4={fileupload4} imageUrl={imageUrl} setImageUrl={setImageUrl} imgselect={4} /> */}
      </Stack>
    </>
  );
};

export default SubmitWork
