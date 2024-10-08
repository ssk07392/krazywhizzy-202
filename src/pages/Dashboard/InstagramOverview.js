import React from "react";
import { Box, Grid, Stack, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OverviewCard from "./OverviewCard";
import { Comments, Estimate, Heart, Rate } from "../../svg";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../utils";
import AgeRange from "./AgeRange";
import TopStates from "./TopStates";
import TopCities from "./TopCities";
import GenderDiversity from "./GenderDiversity";


const InstagramOverview = () => {

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box className="stack-button-tab no-inside-border-tab">
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" className="mar-bottom-30">
            <Tab label="Overview" value="1" />
            <Tab label="Audience" value="2" />
            <Tab label="Content" value="3" />
          </TabList>
          <TabPanel value="1">
            <h6 className="view-content flex-100"><Link to="/">@harleyquinn</Link>28M Followers</h6>
            <Stack direction="row" justifyContent="start" alignItems="center" className='w-100' spacing={3}>
              <OverviewCard
                cardHeading="Average Likes"
                averageView="8.5 Million+"
                cardIcon={<Heart />}
              />
              <OverviewCard
                cardHeading="Average Comments"
                averageView="6.3 Million+"
                cardIcon={<Comments />}
              />
              <OverviewCard
                cardHeading="Engagement Rate"
                averageView="2.23%"
                cardIcon={<Rate />}
              />
              <OverviewCard
                cardHeading="Estimated Reach"
                averageView="2 Million+"
                cardIcon={<Estimate />}
              />
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Grid container justifyContent="space-between" alignItems="center" spacing={2} className='mar-bottom-40'>
              <Grid item xs={6}>
                <h6 className="overview-heading flex-100"><img src={toAbsoluteUrl("/images/ovrer-view-plus.svg")} alt="" />Age Range</h6>
                <div className="border-paper padd-24">
                  <AgeRange />
                </div>
              </Grid>
              <Grid item xs={6}>
                <h6 className="overview-heading flex-100"><img src={toAbsoluteUrl("/images/ovrer-view-plus.svg")} alt="" />Top States</h6>
                <div className="border-paper padd-24">
                  <TopStates />
                </div>
              </Grid>
              <Grid item xs={6}>
                <h6 className="overview-heading flex-100"><img src={toAbsoluteUrl("/images/ovrer-view-plus.svg")} alt="" />Top Cities</h6>
                <div className="border-paper padd-24">
                  <TopCities />
                </div>
              </Grid>
              <Grid item xs={6}>
                <h6 className="overview-heading flex-100"><img src={toAbsoluteUrl("/images/ovrer-view-plus.svg")} alt="" />Gender Diversity</h6>
                <div className="border-paper padd-24">
                  <GenderDiversity />
                </div>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="3">
            Content
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default InstagramOverview;
