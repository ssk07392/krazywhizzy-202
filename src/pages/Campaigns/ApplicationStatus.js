import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Divider, Grid, Paper, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import ApplicationCard from "./ApplicationCard";
import { toAbsoluteUrl } from "../../utils";
import UserStatus from "./UserStatus";
import PriceFinalization from "./PriceFinalization";
import SubmitWork from "./SubmitWork";
import ApproveWork from "./ApproveWork";
import TaskCompleted from "./TaskCompleted";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import { fetchCreator } from "../../actions/creators";
import { useDispatch } from "react-redux";
import WorkingOnTask from "./WorkingOnTask";
import { applicationStatusFetch } from "../../actions/campaign";


const ApplicationStatus = () => {

  const dispatch = useDispatch();
  const params = useParams();

  const [activeStep, setActiveStep] = React.useState(0);
  const [creatorDetail, setCreatorDetail] = React.useState();
  const [getActiveStep, setGetActiveStep] = React.useState(0);
  const [storeStatus, setStoreStatus] = React.useState(0);
  const [disableBtn, setDisableBtn] = React.useState(0);

  const steps = [
    {
      label: 'Approve or Reject Harley’s Application',
      description: <UserStatus id={params.id} setStoreStatus={setStoreStatus} step={0} setDisableBtn={setDisableBtn} disableBtn={disableBtn}/>,
    },
    {
      label: 'Price Finalization',
      description: <PriceFinalization id={params.id} setStoreStatus={setStoreStatus} step={2} setDisableBtn={setDisableBtn} disableBtn={disableBtn}/>,
    },
    {
      label: 'Working on task',
      description: <WorkingOnTask id={params.id} setStoreStatus={setStoreStatus} step={3} setDisableBtn={setDisableBtn} disableBtn={disableBtn}/>,
    },
    {
      label: 'Work Submission',
      description: <SubmitWork id={params.id} setStoreStatus={setStoreStatus} step={4} setDisableBtn={setDisableBtn} disableBtn={disableBtn}/>,
    },
    {
      label: 'Approve or Reject Harley’s Work',
      description: <ApproveWork id={params.id} setStoreStatus={setStoreStatus} step={5} setDisableBtn={setDisableBtn} disableBtn={disableBtn}/>,
    },
    {
      label: 'Completed',
      description: <TaskCompleted id={params.id} setStoreStatus={setStoreStatus} step={6} setDisableBtn={setDisableBtn}/>,
    },
    // {
    //   label: 'You submitted Harley’s work.',
    //   description: <SubmitWork />,
    // },
    // {
    //   label: 'Approve or Reject Harley’s Work',
    //   description: <ApproveWork />,
    // },
    // {
    //   label: 'Is task completed?',
    //   description: <TaskCompleted />,
    // },
  ];

  useEffect(() => {
    dispatch(applicationStatusFetch(`?id=${params.id}`))
      .then((res) => {
        if (res.code === 200) {
          if(res.data.application_status === 1){
            setActiveStep(res.data.application_status - 1);
            setGetActiveStep(1) 
          }
          else if(res.data.application_status === 0 ){
            setActiveStep(res.data.application_status - 1);
            setGetActiveStep(0) 
          }
          else{
            setActiveStep(res.data.application_status);
            setGetActiveStep(res.data.application_status)
          }
          setDisableBtn(res.data.application_status);
          toast.success(res.message);
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [storeStatus])
  
  const fetchCreatorDetailThroughId = () => {
    dispatch(fetchCreator(`?creator_id=${params.creatorId}`))
      .then((res) => {
        if (res.code === 200) {
          setCreatorDetail(res.data);
          toast.success(res.message);
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  useEffect(() => {
    fetchCreatorDetailThroughId();
  }, []);
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <div className="avtar-header">
        <div className="avtar-info">
          <Avatar alt="Remy Sharp" src={creatorDetail?.profile_pic_url ? creatorDetail?.profile_pic_url : toAbsoluteUrl('/images/profile_place.jpg')} sx={{ width: 78, height: 78 }} />
          <h4 className="user-name">{creatorDetail ? creatorDetail.name : '-'}</h4>
        </div>
      </div>
      <div className='border-paper'>
        <Grid container direction="row" spacing={2} className='mar-bottom-40'>
          <ApplicationCard
            cardHeadign="Followers"
            cardContent={creatorDetail ? creatorDetail.campaign_followers_range : '-'}
          />
          <ApplicationCard
            cardHeadign="Contact Number"
            cardContent={creatorDetail ? '+'.concat('', creatorDetail.phone_number) : '-'}
          />
          <ApplicationCard
            cardHeadign="Email"
            cardContent={creatorDetail ? creatorDetail.email : '-'}
          />
          <ApplicationCard
            cardHeadign="Category"
            chipList
            // chipItem={['chip 1', 'chip 2', 'chip 3', 'chip 4']}
            chipItem={creatorDetail?.categoriesArrayList !== undefined  ? creatorDetail?.categoriesArrayList : []}
          />
          <ApplicationCard
            cardHeadign="Address"
            cardContent={creatorDetail ? creatorDetail.address : '-'}
          />
          <ApplicationCard
            cardHeadign="City"
            cardContent="Pune"
          />
          <ApplicationCard
            cardHeadign="State"
            cardContent="Maharashtra"
          />
          <ApplicationCard
            cardHeadign="Gender"
            cardContent={creatorDetail ? creatorDetail.gender : '-'}
          />
          <ApplicationCard
            cardHeadign="Language"
            cardContent={creatorDetail ? creatorDetail.language : '-'}
          />
          <ApplicationCard
            cardHeadign="Genre"
            cardContent={creatorDetail ? creatorDetail.genre : '-'}
          />
          <ApplicationCard
            cardHeadign="Sub-Genre"
            cardContent={creatorDetail ? creatorDetail.sub_genre : '-'}
          />
          <ApplicationCard
            cardHeadign="Social Links"
            SocialIcon
            SocialIconList={['instagram', 'youtube', 'facebook', 'moj']}
          />
        </Grid>
        <Divider className='divide-mar-40--40' />
        <Box sx={{ maxWidth: 700 }}>
          <Stepper activeStep={getActiveStep} orientation="vertical" className="application-steps">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      {/* <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      {getActiveStep !== index &&
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                      } */}
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
            </Paper>
          )}
        </Box>
      </div>
    </>
  );
};

export default ApplicationStatus;
