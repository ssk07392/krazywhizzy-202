import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SparkFill, SparkOutline, RightStatus, DeleteRed } from "../../svg";
import { BrandsListing } from "../../actions/brands";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  AddCampaign,
  EditCampaignDetails,
  fetchCampaign,
} from "../../actions/campaign";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toAbsoluteUrl } from "../../utils";
import ReactPlayer from "react-player";
import "./Campaigns.scss";

const defaultFormField = {
  campaign_name: "",
  campaign_description: "",
  campaign_requirements: "",
  campaign_steps: "",
  campaign_price_range: "",
  campaign_guidelines: "",
  campaign_followers_range: "",
  status: 1,
  video_name: "",
  buffervideo: "",
  videoUrl: "",
  mediaType: "",
};

const EditCampaign = () => {
  const [brandList, setBrandList] = useState([]);
  const [selectedBrandValue, setSelectedBrandValue] = useState("");
  const [formField, setFormField] = useState(defaultFormField);
  const [fileupload, setFileupload] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const history = useLocation();
  const pathname = history.pathname;
  console.log("pathname: ", pathname);
  const {
    campaign_name,
    campaign_description,
    campaign_requirements,
    campaign_steps,
    campaign_price_range,
    campaign_guidelines,
    campaign_followers_range,
    status,
    video_name,
    buffervideo,
    videoUrl,
    mediaType,
  } = formField;

  const [brandNameError, setBrandNameError] = useState(false);
  const [campaignNameError, setCampaignNameError] = useState(false);
  const [campaignDescriptionError, setCampaignDescriptionError] =
    useState(false);
  const [campaignRequirementError, setCampaignRequirementError] =
    useState(false);
  const [campaignStepsError, setCampaignStepsError] = useState(false);
  const [campaignPriceRangeError, setCampaignPriceRangeError] = useState(false);
  const [campaignGuideLinesError, setCampaignGuideLinesError] = useState(false);
  const [campaignFollowersRangeError, setCampaignFollowersRangeError] =
    useState(false);
  const [imageError, setImageError] = useState(false);

  const fetchCampaignDetailThroughId = () => {
    dispatch(fetchCampaign(`?campaign_id=${params.campaignId}`))
      .then((res) => {
        if (res.code === 200) {
          setSelectedBrandValue(res.data.brand_id.toString());
          setFormField(() => ({
            campaign_name: res.data.campaign_title,
            campaign_description: res.data.campaign_description,
            campaign_price_range: res.data.campaign_price_range,
            campaign_followers_range: res.data.campaign_followers_range,
            campaign_requirements: res.data.campaign_requirements,
            campaign_steps: res.data.campaign_steps,
            campaign_guidelines: res.data.campaign_guidelines,
            status: res.data.status,
            videoUrl:
              res.data.media_type == "video/mp4"
                ? res.data.campaign_submission
                : "",
            mediaType: res.data.media_type.toString(),
          }));
          res.data.media_type !== "video/mp4" &&
            videoUrl == "" &&
            setImageUrl(res.data.campaign_submission);
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  useEffect(() => {
    if (params.campaignId) {
      fetchCampaignDetailThroughId();
    }
  }, []);

  const getAllBrandListing = () => {
    dispatch(BrandsListing(`?page=0&limit=10000`))
      .then((res) => {
        setBrandList(res.data.data);
      })
      .catch((err) => {
        toast.success(err);
      });
  };

  useEffect(() => {
    getAllBrandListing();
  }, []);

  const handleChange = (event) => {
    setSelectedBrandValue(event.target.value.toString());
  };

  // const handleChangeImage = (e) => {
  //   setFileupload(e.target.files[0]);
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     setImageUrl(reader.result);
  //   });
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  const UploadVideo = (e) => {
    console.log("e.target.files[0].type", e.target.files[0].type);
    setFormField((prevState) => ({
      ...prevState,
      mediaType: e.target.files[0].type,
    }));
    if (e.target.files[0].type !== "video/mp4") {
      setFileupload(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageUrl(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    } else {
      let videosrc = window.URL.createObjectURL(e.target.files[0]);

      console.log(videosrc);
      setFormField((prevState) => ({
        ...prevState,
        videoUrl: videosrc,
        buffervideo: e.target.files[0],
        video_name: e.target.files[0].name,
      }));
    }
  };

  console.log("path", pathname);
  const onFinish = (e) => {
    e.preventDefault();
    setCampaignNameError(false);
    setCampaignDescriptionError(false);
    setCampaignFollowersRangeError(false);
    setCampaignGuideLinesError(false);
    setCampaignPriceRangeError(false);
    setCampaignStepsError(false);
    setCampaignRequirementError(false);
    setBrandNameError(false);
    setImageError(false);

    if (campaign_name === "") {
      return setCampaignNameError(true);
    }
    if (campaign_description === "") {
      return setCampaignDescriptionError(true);
    }
    if (campaign_price_range === "") {
      return setCampaignPriceRangeError(true);
    }
    if (campaign_followers_range === "") {
      return setCampaignFollowersRangeError(true);
    }
    if (campaign_steps === "") {
      return setCampaignStepsError(true);
    }
    if (campaign_requirements === "") {
      return setCampaignRequirementError(true);
    }
    if (campaign_guidelines === "") {
      return setCampaignGuideLinesError(true);
    }

    if (selectedBrandValue === "") {
      console.log("Helllo");
      return setBrandNameError(true);
    }

    if (mediaType == "") {
      return setImageError(true);
    }

    const formData = new FormData();

    console.log(" selectedBrandValue", fileupload);

    formData.append("brand_id", selectedBrandValue);
    formData.append("campaign_title", campaign_name);
    formData.append("campaign_description", campaign_description);
    formData.append("campaign_requirements", campaign_requirements);
    formData.append("campaign_steps", campaign_steps);
    (fileupload || buffervideo) &&
      formData.append(
        "campaign_submission",
        mediaType == "image/png" || mediaType == "image/jpeg"  ? fileupload : buffervideo
      );
    formData.append("campaign_price_range", campaign_price_range);
    formData.append("campaign_guidelines", campaign_guidelines);
    formData.append("campaign_followers_range", campaign_followers_range);
    formData.append("status", status);
    formData.append("mediaType", mediaType);
    pathname !== "/add-campaign"
      ? formData.append("hyperLocal", "1")
      : formData.append("hyperLocal", "0");
    if (params.campaignId) {
      formData.append("campaign_id", params.campaignId);
      dispatch(EditCampaignDetails(formData))
        .then((res) => {
          if (res.code === 200) {
            toast.success(res.message);
            if (pathname === "/hyper-local-campaign") {
              localStorage.setItem("campaignId", res.data.id);
              navigate("/select-creators-location");
            } else if (pathname === "/add-campaign") {
              localStorage.setItem("campaignId", res.data.id);
              navigate("/select-creators-by");
            }else if (pathname.includes("/edit-campaign")) {
              localStorage.setItem("campaignId", res.data.id);
              navigate("/select-creators-by");
            }  
            else {
              navigate("/campaigns");
            }
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      dispatch(AddCampaign(formData))
        .then((res) => {
          if (res.code === 201) {
            toast.success(res.message);
            if (pathname === "/hyper-local-campaign") {
              localStorage.setItem("campaignId", res.data.id);
              navigate("/select-creators-location");
            } else if (pathname === "/add-campaign") {
              localStorage.setItem("campaignId", res.data.id);
              navigate("/select-creators-by");
            } else {
              navigate("/campaigns");
            }
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const handleStatus = (e, value) => {
    setFormField((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  const onMutate = (e) => {
    const { value, name } = e.target;
    setFormField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {/* <Grid item xs={6} style={{ marginTop: "20px" }}>
        <h3 className="page-title">
          {params.campaignId ? "Edit Campaign" : "Add Campaign"}
        </h3>
      </Grid> */}
      <Grid
        container
        direction="row-reverse"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        className="mar-bottom-40"
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="end"
          alignItems="center"
          xs={12}
          textAlign="right"
        >
          <InputLabel
            id="demo-simple-select-label"
            className="extra-label"
            required
            error={brandNameError}
            style={{ margin: "4px 10px 0 0" }}
          >
            Campaign Status
          </InputLabel>
          <ButtonGroup
            className="campaign-status"
            variant="contained"
            aria-label="outlined primary button group"
            // disabled={status !== 3 ? false : true}
          >
            <Button
              className={`${status == 1 ? "active" : ""}`}
              onClick={(e) => handleStatus(e, 1)}
            >
              <SparkFill />
            </Button>
            <Button
              className={`${status == 2 ? "active" : ""}`}
              onClick={(e) => handleStatus(e, 2)}
            >
              <SparkOutline />
            </Button>
            <Button
              className={`${status == 3 ? "active" : ""}`}
              onClick={(e) => handleStatus(e, 3)}
            >
              <RightStatus svgFill="#1B5E20" />
            </Button>
          </ButtonGroup>
          {/* <Button variant="outlined" className="delete-outline mar-left-20">
            <DeleteRed />
            &nbsp;&nbsp;Edit Campaign
          </Button> */}
        </Grid>
      </Grid>
      <div className="border-paper">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          className="mar-bottom-40"
        >
          <Grid item xs={6}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              required
              error={brandNameError}
            >
              Brand Name
            </InputLabel>
            <FormControl variant="filled">
            {/* <InputLabel htmlFor="name-multiple">Select Brand</InputLabel> */}
              <Select
                value={selectedBrandValue}
                onChange={handleChange}
                displayEmpty
                size="small"
                required
                // placeholder="Select Brand"
                input={<Input id="name-multiple" />}
              >
                <MenuItem disabled value="">
                  <em>Brand Name</em>
                </MenuItem>
                {brandList.map((item) => (
                  <MenuItem value={item.id}>{item.brand_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {brandNameError && (
              <p style={{ color: "red", marginTop: "5px" }}>
                Brand is required
              </p>
            )}
          </Grid>
          <Grid item xs={3}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              required
              error={campaignPriceRangeError}
            >
              Price Range
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-basic"
                placeholder="Price Range"
                variant="filled"
                size="small"
                onChange={onMutate}
                name="campaign_price_range"
                value={campaign_price_range}
              />
            </FormControl>
            {campaignPriceRangeError && (
              <p style={{ color: "red", marginTop: "5px" }}>
                Campaign Price Range is required
              </p>
            )}
          </Grid>
          <Grid item xs={3}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              required
              error={campaignFollowersRangeError}
            >
              Follower Range
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-basic"
                placeholder="Follower Range"
                variant="filled"
                size="small"
                name="campaign_followers_range"
                value={campaign_followers_range}
                onChange={onMutate}
              />
            </FormControl>
            {campaignFollowersRangeError && (
              <p style={{ color: "red", marginTop: "5px" }}>
                Follower Range is required
              </p>
            )}
          </Grid>
        </Grid>
        <Divider className="divide-mar-40--40" />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              error={campaignNameError}
              required
            >
              Campaign Title
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-multiline-static"
                placeholder="Enter Campaign Title"
                multiline
                rows={4}
                variant="filled"
                value={campaign_name}
                name="campaign_name"
                onChange={onMutate}
              />
            </FormControl>
            {campaignNameError && (
              <p style={{ color: "red", marginTop: "5px" }}>
                Campaign title is required
              </p>
            )}
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              error={campaignDescriptionError}
              required
            >
              Description
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-multiline-static"
                placeholder="Enter Description"
                multiline
                rows={4}
                variant="filled"
                name="campaign_description"
                value={campaign_description}
                onChange={onMutate}
              />
            </FormControl>
            {campaignDescriptionError && (
              <p style={{ color: "red", marginTop: "5px" }}>
                Campaign Description is required
              </p>
            )}
          </Grid>
        </Grid>
        <Divider className="divide-mar-40--40" />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              required
              error={campaignRequirementError}
            >
              Requirements
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-multiline-static"
                placeholder="Enter Requirements"
                multiline
                rows={4}
                variant="filled"
                name="campaign_requirements"
                value={campaign_requirements}
                onChange={onMutate}
              />
            </FormControl>
            {campaignRequirementError && (
              <p style={{ color: "red", marginTop: "5px" }}>
                Campaign Requirements is required
              </p>
            )}
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              required
              error={campaignStepsError}
            >
              Steps
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-multiline-static"
                placeholder="Add Steps"
                multiline
                rows={4}
                variant="filled"
                name="campaign_steps"
                value={campaign_steps}
                onChange={onMutate}
              />
            </FormControl>
            {campaignStepsError && (
              <p style={{ color: "red", marginTop: "5px" }}>
                Campaign Steps is required
              </p>
            )}
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              error={campaignGuideLinesError}
              required
            >
              Guidelines
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-multiline-static"
                placeholder="Add Guidelines"
                multiline
                rows={4}
                variant="filled"
                name="campaign_guidelines"
                value={campaign_guidelines}
                onChange={onMutate}
              />
            </FormControl>
            {campaignGuideLinesError && (
              <p style={{ color: "red", marginTop: "5px" }}>
                Campaign guide lines is required
              </p>
            )}
          </Grid>
        </Grid>
        <Divider className="divide-mar-40--40" />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}>
            {/* <FileUploader
              uploadLabel="Sample Submission"
              uploadText=""
              uploadBtn="+"
              setFileupload={setFileupload}
              fileupload={fileupload}
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
            /> */}
            <div className="uplaod-ui" style={{ width: 290, height: 250 }}>
              <Button
                variant="contained"
                component="label"
                className="upload-video "
              >
                {videoUrl && fileupload == undefined ? (
                  <ReactPlayer
                    url={videoUrl}
                    controls
                    width={"480px"}
                    height={"240px"}
                  />
                ) : imageUrl ? (
                  <img src={imageUrl} alt="" />
                ) : (
                  <>
                    <span className="upload-plus-btn">+</span>
                    <input
                      type="file"
                      name="video"
                      id="video"
                      onChange={(e) => {
                        UploadVideo(e);
                        // handleChangeImage(e)
                      }}
                      accept="image/*,video/*"
                      multiple
                      required
                    />
                  </>
                )}
              </Button>
              <span className="uplaod-span">
                <img src={toAbsoluteUrl("/images/uplaod-icon.svg")} alt="" />
                <br />
              </span>
            </div>
          </Grid>
        </Grid>
        {imageError && (
          <p style={{ color: "red", marginTop: "5px" }}>
            Campaign image or video is required
          </p>
        )}
      </div>
      <div className="btn-row reverse mar-top-20">
        <Button
          variant="contained"
          className="min-width-180-img"
          onClick={onFinish}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default EditCampaign;
