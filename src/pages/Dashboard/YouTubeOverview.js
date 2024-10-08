import React from "react";
import { Box, Stack, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OverviewCard from "./OverviewCard";
import { Comments, Estimate, Heart, Rate } from "../../svg";
import { Link } from "react-router-dom";


const YouTubeOverview = () => {

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
            <Tab label="Content" value="2" />
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
            
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default YouTubeOverview;
