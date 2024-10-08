import React from "react";
import { Avatar, Box, Grid, Stack, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { toAbsoluteUrl } from "../../utils";
import OverviewCard from "./OverviewCard";
import { Comments, Eye, Heart } from "../../svg";
import InstagramOverview from "./InstagramOverview";
import ChartContentPerformance from "./ChartContentPerformanceBenchmark";
import ChartGrowthRate from "./ChartGrowthRate";
import EngagementSplit from "./EngagementSplit";
import YouTubeOverview from "./YouTubeOverview";


const DashboardOverview = () => {
  
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="avtar-header">
        <div className="avtar-info">
          <Avatar alt="Remy Sharp" src={toAbsoluteUrl('/images/profile_place.jpg')} sx={{ width: 78, height: 78 }} />
          <h4 className="user-name">Harley Quinn</h4>
        </div>
      </div>
      <Box className="botdered-tab">
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Instagram" value="1" />
            <Tab label="YouTube" value="2" />
          </TabList>
          <TabPanel value="1">
            <InstagramOverview />
          </TabPanel>
          <TabPanel value="2">
            <YouTubeOverview />
          </TabPanel>
        </TabContext>
      </Box>
      <h6 className="overview-heading"><img src={toAbsoluteUrl("/images/ovrer-view-plus.svg")} alt="" />Posts Overview</h6>
      <div className="border-paper padd-24">
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
            cardHeading="Average Views"
            averageView="7.6 Million+"
            cardIcon={<Eye />}
          />
        </Stack>
      </div>
      <h6 className="overview-heading"><img src={toAbsoluteUrl("/images/ovrer-view-plus.svg")} alt="" />Reels Overview</h6>
      <div className="border-paper padd-24">
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
            cardHeading="Average Views"
            averageView="7.6 Million+"
            cardIcon={<Eye />}
          />
        </Stack>
      </div>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2} className='mar-bottom-40'>
        <Grid item xs={4}>
          <h6 className="overview-heading flex-100"><img src={toAbsoluteUrl("/images/ovrer-view-plus.svg")} alt="" />Content Performance & Benchmark</h6>
          <div className="border-paper padd-24">
            <ChartContentPerformance />
          </div>
        </Grid>
        <Grid item xs={4}>
          <h6 className="overview-heading flex-100"><img src={toAbsoluteUrl("/images/ovrer-view-plus.svg")} alt="" />Followers Growth Rate</h6>
          <div className="border-paper padd-24">
            <ChartGrowthRate />
          </div>
        </Grid>
        <Grid item xs={4}>
          <h6 className="overview-heading flex-100"><img src={toAbsoluteUrl("/images/ovrer-view-plus.svg")} alt="" />Engagement Split</h6>
          <div className="border-paper padd-24">
            <EngagementSplit />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardOverview;
