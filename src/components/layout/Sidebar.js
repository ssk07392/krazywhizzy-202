import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { ApplicationMenu, BrandMenu, BucketMenu, CampaignMenu, CreatorMenu, DashboardMenu, KycMenu, MasterMenu, PaymentsMenu, WhitePen } from '../../svg';

export default function NestedList() {

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [campopen, setCampOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
    navigate('/payments')
  };

  const handleClickCamp = () => {
    setCampOpen(!campopen);
    navigate('/campaigns')
  };

  return (
    <>
      <ListItemButton onClick={() => navigate('/dashboard')}>
        <ListItemIcon sx={{
          minWidth: 0,
          mr: 2,
          justifyContent: "center",
          fill: "#ffffff",
        }}>
          <DashboardMenu />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={(e) => handleClickCamp()}>
        <ListItemIcon sx={{
          minWidth: 0,
          mr: 2 ,
          justifyContent: "center",
          fill: "#ffffff",
        }}>
          <CampaignMenu />
        </ListItemIcon>
        <ListItemText primary="Campaigns" />
        {campopen ? <ExpandLess sx={{ fill: "#ffffff" }} /> : <ExpandMore sx={{ fill: "#ffffff" }} />}
      </ListItemButton>
      <Collapse in={campopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/view-applications')}>
            <ListItemIcon sx={{
              minWidth: 0,
              mr: 2,
              justifyContent: "center",
              fill: "#ffffff",
            }}>
              <ApplicationMenu />
            </ListItemIcon>
            <ListItemText primary="View Applications" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => navigate('/brands')}>
        <ListItemIcon sx={{
          minWidth: 0,
          mr: 2,
          justifyContent: "center",
          fill: "#ffffff",
        }}>
          <BrandMenu />
        </ListItemIcon>
        <ListItemText primary="Brands" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/creator')}>
        <ListItemIcon sx={{
          minWidth: 0,
          mr: 2,
          justifyContent: "center",
          fill: "#ffffff",
        }}>
          <CreatorMenu />
        </ListItemIcon>
        <ListItemText primary="Creators" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/kyc')}>
        <ListItemIcon sx={{
          minWidth: 0,
          mr: 2,
          justifyContent: "center",
          fill: "#ffffff",
        }}>
          <KycMenu svgFill="#ffffff" />
        </ListItemIcon>
        <ListItemText primary="KYCs" />
      </ListItemButton>
      <ListItemButton onClick={(e) => handleClick()}>
        <ListItemIcon sx={{
          minWidth: 0,
          mr: 2,
          justifyContent: "center",
          fill: "#ffffff",
        }}>
          <PaymentsMenu />
        </ListItemIcon>
        <ListItemText primary="payments" />
        {open ? <ExpandLess sx={{ fill: "#ffffff" }} /> : <ExpandMore sx={{ fill: "#ffffff" }} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/mastertransactionlist')}>
            <ListItemIcon sx={{
              minWidth: 0,
              mr: 2,
              justifyContent: "center",
              fill: "#ffffff",
            }}>
              <MasterMenu />
            </ListItemIcon>
            <ListItemText primary="Master Transaction" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/backet-list')}>
            <ListItemIcon sx={{
              minWidth: 0,
              mr: 2,
              justifyContent: "center",
              fill: "#ffffff",
            }}>
              <BucketMenu />
            </ListItemIcon>
            <ListItemText primary="Bucket Transaction" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => navigate('/hyperlocal')}>
        <ListItemIcon sx={{
          minWidth: 0,
          mr: 2,
          justifyContent: "center",
          fill: "#ffffff",
        }}>
          <CampaignMenu />
        </ListItemIcon>
        <ListItemText primary="Hyper Local" />
      </ListItemButton>
    </>
  );
}