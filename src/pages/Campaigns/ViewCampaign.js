import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, InputLabel } from "@mui/material";
import { DeleteRed, WhitePen } from "../../svg";
import { toAbsoluteUrl } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteCampaign, fetchCampaign } from "../../actions/campaign";
import "./Campaigns.scss";


const ViewCampaign = () => {

  const [viewCampaign, setViewCampaign] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const chackMediaType = viewCampaign?.campaign_submission?.split('.');
  const mediaType = chackMediaType?.at(-1)

  const fetchCampaignDetailThroughId = () => {
    dispatch(fetchCampaign(`?campaign_id=${params.campaignId}`))
      .then((res) => {
        if (res.code === 200) {
          setViewCampaign(res.data);
          toast.success("View campaign details fetch successfully");
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  useEffect(() => {
    fetchCampaignDetailThroughId();
  }, []);

  const handleDelete = () => {
    dispatch(deleteCampaign(params.campaignId))
      .then((res) => {
        if (res.code === 200) {
          setViewCampaign({});
          navigate("/campaigns");
          toast.success(res.message);
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleRedirect = () => {
    navigate(`/edit-campaign/${params.campaignId}`);
    console.log(`/edit-campaign/${params.campaignId}`);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        className="mar-bottom-40"
      >
        <Grid item xs={6}>
          <h3 className="page-title">
            <div className="brand-logo">
              <img src={ viewCampaign.brand_logo_url ? viewCampaign.brand_logo_url : toAbsoluteUrl("/images/brand_logo/nykaa-removebg-preview.png")} alt={viewCampaign.brand_name ? viewCampaign.brand_name : ""} />
            </div>
            {viewCampaign.campaign_title ? viewCampaign.campaign_title : "--"}
          </h3>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="end"
          alignItems="center"
          xs={6}
          textAlign="right"
        >
          <Button
            variant="outlined"
            className="delete-outline"
            onClick={handleDelete}
          >
            <DeleteRed />
            &nbsp;&nbsp;Delete Campaign
          </Button>
          <Button variant="contained" onClick={handleRedirect}>
            <WhitePen />
            &nbsp;&nbsp;Edit Campaign
          </Button>
        </Grid>
      </Grid>
      <div className="border-paper">
        <Grid container spacing={2} className="mar-bottom-40">
          <Grid item xs={6}>
            <span className="extra-label w-100">Description</span>
            <p className="description">
              {viewCampaign.campaign_description
                ? viewCampaign.campaign_description
                : "--"}
            </p>
          </Grid>
          <Grid item xs={2}>
            <span className="extra-label w-100">Price Range</span>
            <p className="description">
              <b>
                {viewCampaign.campaign_price_range
                  ? viewCampaign.campaign_price_range
                  : "--"}
              </b>
            </p>
          </Grid>
          <Grid item xs={2}>
            <span className="extra-label w-100">Followers</span>
            <p className="description">
              <b>
                {viewCampaign.campaign_followers_range
                  ? viewCampaign.campaign_followers_range
                  : "--"}
              </b>
            </p>
          </Grid>
          {/* <Grid item xs={2}>
            <span className="extra-label w-100">Categories</span>
            <Stack direction="row" spacing={1} className="chip-row flex-wrap">
              <Chip label="Chip" variant="outlined" />
              <Chip label="Chip" variant="outlined" />
              <Chip label="Chip" variant="outlined" />
              <Chip label="Chip" variant="outlined" />
              <Chip label="Chip" variant="outlined" />
            </Stack>
          </Grid> */}
        </Grid>
        <Divider className="divide-mar-40--40" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <span className="extra-label w-100">Requirements</span>
            <p className="description">
              {viewCampaign.campaign_requirements
                ? viewCampaign.campaign_requirements
                : "--"}
            </p>
          </Grid>
          <Grid item xs={6}>
            <span className="extra-label w-100">Steps</span>
            <p className="description">
              {viewCampaign.campaign_steps ? viewCampaign.campaign_steps : "--"}
            </p>
          </Grid>
        </Grid>
        <Divider className="divide-mar-40--40" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <span className="extra-label w-100">Guidelines</span>
            <p className="description">
              campaign_guidelines
              {viewCampaign.campaign_guidelines ? viewCampaign.campaign_guidelines : "--"}
            </p>
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="demo-simple-select-label" className="extra-label">
              Sample Submission
            </InputLabel>
            <div className="uploaded-content">
             { mediaType !== 'mp4' ?
              <img src={viewCampaign?.campaign_submission} alt="" />
              :
              <video controls width={166} height={248}>
                 <source src={viewCampaign?.campaign_submission} type="video/mp4" />
              </video>
             }
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ViewCampaign;
