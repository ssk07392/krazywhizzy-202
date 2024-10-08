import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toAbsoluteUrl } from "../../utils";
import { Collapse, ListItem, Stack } from "@mui/material";
import Button from "@mui/material/Button";
// import { useTheme } from '@emotion/react';
import { Sidermenu } from "../../constants/DummyData";
import "./layout.scss";
import NestedList from "../../components/layout/Sidebar";

const drawerWidth = 232;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(props) {
  // const headerTitle = props.title
  const [open, setOpen] = React.useState(true);
  const [menuCollapse, setMenuCollapse] = React.useState(true);
  const [subMenuCollapse, setSubMenuCollapse] = React.useState(false);
  const [headerName, setHeaderName] = React.useState();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const history = useLocation();
  const searchParams = new URLSearchParams(history.search);
  const paramsName = searchParams.get("name");
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  React.useEffect(() => {
    if (params.campaignId || params.creatorId || params?.payment || params.kycId || params.brandId || params.backetId || params.rejectId) {
      if ((params.creatorId && paramsName) || (params.backetId && paramsName)) {
        setHeaderName(paramsName);
      } else {
        let pathname = location.pathname.split("/").filter((item) => item);
        const capatilize = (s) =>
          s.charAt(0).toUpperCase() + s?.slice(1)?.replace(/-/g, " ");
        const real = "Welcome " + capatilize(pathname[0]);
        setHeaderName(real);
      }
    } else {
      const capatilize = (s) =>
        s.charAt(0).toUpperCase() + s?.slice(1)?.replace(/-/g, " ");
      const real =
        "Welcome " +
        capatilize(
          location.pathname
            .split("/")
            .filter((item) => item)
            .pop()
        );
      setHeaderName(real);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const handlesetMenuClick = (e, path) => {
    if(path === '/payments'){
      setSubMenuCollapse(!subMenuCollapse);
    } else if (path === '/campaigns'){
      setSubMenuCollapse(!subMenuCollapse);
    }
    else{
      setMenuCollapse(!menuCollapse);
    }
    
  };

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  // const submenuShow = (menu) => {
  //   console.log("submenuShow", menu);
  //   return menu?.submenulist?.map((menubar) => (
  //     <Link to={menubar.menupath} key={menubar.id}>
  //       <ListItem disablePadding sx={{ display: "block" }} selected={selectedIndex == menubar.id} onClick={(e) => handleListItemClick(e, menubar.id)}>
  //         <ListItemButton onClick={handlesetMenuClick}>
  //           <ListItemIcon
  //             sx={{
  //               minWidth: 0,
  //               mr: open ? 2 : "auto",
  //               justifyContent: "center",
  //               fill: "#ffffff",
  //             }}
  //           >
  //             {menubar.icon}
  //           </ListItemIcon>
  //           {/* style={{backgroundColor: menubar.menupath.includes(location.pathname) ? 'white' : 'black'}} */}
  //           <ListItemText primary={menubar.name} />
  //           {menubar.submenu === true ? (
  //             <>
  //               {menuCollapse ? (
  //                 <ExpandLess sx={{ fill: "#ffffff" }} />
  //               ) : (
  //                 <ExpandMore sx={{ fill: "#ffffff" }} />
  //               )}
  //             </>
  //           ) : (
  //             ""
  //           )}
  //           {submenuShow(menubar)}
  //         </ListItemButton>
  //       </ListItem>
  //     </Link>
  //   ));
  // };

console.log(Sidermenu);

  return (
    <Box sx={{ display: "flex" }} className="page-layout">
      <AppBar
        position="fixed"
        open={open}
        className={`layout-header ${open ? "" : "sider-docked"}`}
      >
        {" "}
        {/* drawer */}
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            {open ? <img src={toAbsoluteUrl("/images/logo_full.svg")} alt="" /> : <img src={toAbsoluteUrl("/images/logo_icon.svg")} alt="" />}
          </IconButton> */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="w-100 pad-0-20"
            spacing={2}
          >
            <h6 className="page-title">{`${headerName}`}</h6>
            <Button
              variant="text"
              startIcon={<LogoutIcon />}
              onClick={(e) => handleLogout()}
            >
              Log Out
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        className={`layout-sider ${open ? "" : "sider-docked"}`}
      >
        <DrawerHeader>
          <IconButton
            onClick={(e) => handleDrawerClose() }
            sx={{
              marginRight: 5,
              ...(open && { padding: 0 }),
            }}
          >
            {open ? (
              <img src={toAbsoluteUrl("/images/logo_full.svg")} alt="" />
            ) : (
              <img src={toAbsoluteUrl("/images/logo_icon.svg")} alt="" />
            )}
          </IconButton>
        </DrawerHeader>
        <List
          sx={{ width: "100%", maxWidth: 360 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {/* <NestedList /> */}
          {Sidermenu.map((menubar) => (
            <>
              <Link to={menubar.menupath} key={menubar.id}>
                <ListItem disablePadding sx={{ display: "block" }} selected={selectedIndex === menubar.id} onClick={(e) => handleListItemClick(e, menubar.id)}>
                  <ListItemButton onClick={(e) => handlesetMenuClick(e, menubar.menupath)}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : "auto",
                        justifyContent: "center",
                        fill: "#ffffff",
                      }}
                    >
                      {menubar.menuicon}
                    </ListItemIcon>
                    <ListItemText primary={menubar.menulist} />
                    {menubar?.submenu === true && menubar?.submenulist[0]?.matchpath === location.pathname && menubar?.submenulist?.map ? (
                      <>
                        {menuCollapse ? (
                          <ExpandLess sx={{ fill: "#ffffff" }} />
                        ) : (
                          <ExpandMore sx={{ fill: "#ffffff" }}/>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    {/* {menuCollapse ? submenuShow(menubar) : ""}  */}
                  </ListItemButton>
                </ListItem>
              </Link>
              {menubar?.submenu === true && menubar?.submenulist[0]?.matchpath === location.pathname && menubar.submenulist.map((subMenubar) => (
                <Collapse in={subMenuCollapse} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to={subMenubar.submenupath} key={menubar.id}>
                      <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 4, }}>
                          <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', fill: '#ffffff', }}>
                            {subMenubar.icon}
                          </ListItemIcon>
                          <ListItemText primary={subMenubar.name} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
              ))}
            </>
          ))}
          {/* <NestedList /> */}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, padding: "0 20px 20px 20px", marginTop: "69px" }}
      >
        <div className="content-body">
          <div className="content-wrap">
            <Outlet />
          </div>
        </div>
      </Box>
    </Box>
  );
}
