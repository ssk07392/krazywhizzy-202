import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { ActionArrow, RightStatus, SearchIcon, SparkFill, SparkOutline } from "../../svg";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { CampaignListing } from "../../actions/campaign";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Visibility } from "@mui/icons-material";
import "./Campaigns.scss";

const Campaigns = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    limit: 10,
    page: 0
  })

  const history = useLocation();
  const pathname = history.pathname;
  console.log("pathname", pathname);
  const [campaignList, setCampaignList] = useState([]);
  const [search, setSearched] = useState("");

  const columns = [
    {
      field: "id",
      headerName: "Sr No.",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "brand_logo_url",
      headerName: "Brand Logo",
      flex: 1.5,
      align: "left",
      renderCell: (params) => <div className="overflow-hide w-100 h-100 obj-content-inside">
        <img src={params.value} alt="" />
      </div>,
      sortable: false,
      filterable: false,
    },
    {
      field: "brand_name",
      headerName: "Brand Name",
      flex: 1.5,
      sortable: false,
    },
    {
      field: "campaign_title",
      headerName: "Campaign Title",
      flex: 1.5,
      sortable: false,
    },
    {
      field: "campaign_price_range",
      headerName: "Price Range",
      flex: 0.9,
      sortable: false,
    },
    {
      field: "campaign_description",
      headerName: "Campaign Description",
      flex: 1.8,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Live/ Paused",
      flex: 1,
      sortable: false,
      align: 'center',
      renderCell: (params) =>
        params.value === 1 ? (<SparkFill />) : params.value === 3 ? (<RightStatus />) : (<SparkOutline />),
    },
    // {
    //   field: "viewApplication",
    //   headerName: "View Application",
    //   flex: 0.4,
    //   renderCell: (params, row) => {
    //     const onClick = (e) => {
    //       console.log('params, row: ', params, row);
    //       e.stopPropagation();

    //       const api = params.api;
    //       const thisRow = {};

    //       api
    //         .getAllColumns()
    //         .filter((c) => c.field !== "__check__" && !!c)
    //         .forEach(
    //           (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
    //         );
    //         if(pathname === "/hyperlocal"){
    //           navigate({
    //             pathname: `/hyper-applications/${thisRow.id}`,
    //             search: `?${createSearchParams({
    //               name: params.row.brand_name+" "+ params.row.campaign_title
    //             })}`
    //           });
    //         }
    //         else{
    //           navigate({
    //             pathname: `/campaign-applications/${thisRow.id}`,
    //             search: `?${createSearchParams({
    //               name: params.row.brand_name+" "+ params.row.campaign_title
    //             })}`
    //           });
    //         }
    //         }

    //     return (
    //       <IconButton aria-label="fingerprint" onClick={(e) => onClick(e)}>
    //         <Visibility />
    //       </IconButton>
    //     );
    //   },
    // },
    // {
    //   field: "action",
    //   headerName: "",
    //   flex: 0.4,
    //   renderCell: (params) => {
    //     const onClick = (e) => {
    //       e.stopPropagation();
    //       const api = params.api;
    //       const thisRow = {};
    //       api
    //         .getAllColumns()
    //         .filter((c) => c.field !== "__check__" && !!c)
    //         .forEach(
    //           (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
    //         );

    //         if(pathname === "/hyperlocal"){
    //           navigate({
    //             pathname: `/hyper-applications/${params.id}`,
    //             search: `?${createSearchParams({
    //               name: params.row.brand_name+" "+ params.row.campaign_title
    //             })}`
    //           });
    //         }
    //         else{
    //           navigate({
    //             pathname: `/campaign-applications/${params.id}`,
    //             search: `?${createSearchParams({
    //               name: params.row.brand_name+" "+ params.row.campaign_title
    //             })}`
    //           });
    //         }
    //     };

    //     return (
    //       <IconButton aria-label="fingerprint" onClick={(e) => onClick(e)}>
    //         <ActionArrow />
    //       </IconButton>
    //     );
    //   },
    // },

  ];

  const columns1 = [
    {
      field: "id",
      headerName: "Sr No.",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "brand_logo_url",
      headerName: "Brand Logo",
      flex: 1.5,
      align: "left",
      renderCell: (params) => <div className="overflow-hide w-100 h-100 obj-content-inside">
        <img src={params.value} alt="" />
      </div>,
      sortable: false,
      filterable: false,
    },
    {
      field: "brand_name",
      headerName: "Brand Name",
      flex: 1.5,
      sortable: false,
    },
    {
      field: "campaign_title",
      headerName: "Campaign Title",
      flex: 1.5,
      sortable: false,
    },
    {
      field: "campaign_price_range",
      headerName: "Price Range",
      flex: 0.9,
      sortable: false,
    },
    {
      field: "campaign_description",
      headerName: "Campaign Description",
      flex: 1.8,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Live/ Paused",
      flex: 1,
      align: 'center',
      sortable: false,
      renderCell: (params) =>
        params.value === 1 ? (<SparkFill />) : params.value === 3 ? (<RightStatus />) : (<SparkOutline />),
    },
    // {
    //   field: "viewApplication",
    //   headerName: "View Application",
    //   flex: 0.4,
    //   renderCell: (params, row) => {
    //     const onClick = (e) => {
    //       console.log('params, row: ', params, row);
    //       e.stopPropagation();

    //       const api = params.api;
    //       const thisRow = {};

    //       api
    //         .getAllColumns()
    //         .filter((c) => c.field !== "__check__" && !!c)
    //         .forEach(
    //           (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
    //         );
    //         if(pathname === "/hyperlocal"){
    //           navigate({
    //             pathname: `/hyper-applications/${thisRow.id}`,
    //             search: `?${createSearchParams({
    //               name: params.row.brand_name+" "+ params.row.campaign_title
    //             })}`
    //           });
    //         }
    //         else{
    //           navigate({
    //             pathname: `/campaign-applications/${thisRow.id}`,
    //             search: `?${createSearchParams({
    //               name: params.row.brand_name+" "+ params.row.campaign_title
    //             })}`
    //           });
    //         }
    //         }

    //     return (
    //       <IconButton aria-label="fingerprint" onClick={(e) => onClick(e)}>
    //         <Visibility />
    //       </IconButton>
    //     );
    //   },
    // },
    {
      field: "action",
      headerName: "",
      flex: 0.4,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          const api = params.api;
          const thisRow = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
            
            if(pathname === "/hyperlocal"){
              navigate({
                pathname: `/hyper-applications/${params.id}`,
                search: `?${createSearchParams({
                  name: params.row.brand_name+" "+ params.row.campaign_title
                })}`
              });
            }
            else{
              navigate({
                pathname: `/campaign-applications/${params.id}`,
                search: `?${createSearchParams({
                  name: params.row.brand_name+" "+ params.row.campaign_title
                })}`
              });
            }
        };

        return (
          <IconButton aria-label="fingerprint" onClick={(e) => onClick(e)}>
            <ActionArrow />
          </IconButton>
        );
      },
    },
    
  ];

  const getAllCampaignListing = () => {
    setPageState(old => ({ ...old, isLoading: true }))
    if (pathname === '/hyperlocal') {
      dispatch(CampaignListing(`?page=${pageState.page}&limit=${pageState.limit}&hyperLocalTrue=1`))
        .then((res) => {
          toast.success(res.message);
          setPageState(old => ({ ...old, isLoading: false, data: res.data.data, total: res.data.total }))
          setCampaignList(res.data);
        })
        .catch((err) => { });
    } else {
      dispatch(CampaignListing(`?page=${pageState.page}&limit=${pageState.limit}`))
        .then((res) => {
          toast.success(res.message);
          setPageState(old => ({ ...old, isLoading: false, data: res.data.data, total: res.data.total }))
          setCampaignList(res.data);
        })
        .catch((err) => { });
    }
  };

  useEffect(() => {
    getAllCampaignListing();
  }, [pathname, pageState.page, pageState.limit]);

  const handleRedirection = (e) => {
    if (pathname === '/hyperlocal') {
      navigate("/hyper-local-campaign");
    }
    else {
      navigate("/add-campaign");

    }
  };

  const onMutate = (e, value) => {
    setSearched(value);
  };

  useEffect(() => {
    if (search !== null || search !== "" || search !== undefined) {
      if (search === null) {
        getAllCampaignListing();
      } else {
        setPageState(old => ({
          ...old,
          data: pageState.data.filter((column) =>
            search.includes(column.campaign_title)
          ),
          total: pageState.data.filter((column) =>
            search.includes(column.campaign_title)).length
        })
        );
      }
    }
  }, [search]);

  return (
    <>
      <div className="search-row">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={9}>
            <Stack spacing={2} sx={{ width: 630 }}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                size="small"
                options={pageState.data.map((option) => option.campaign_title)}
                onChange={(e, value) => onMutate(e, value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search for campaign"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          {" "}
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Button variant="contained" onClick={handleRedirection}>
              + Create New Campaign
            </Button>
          </Grid>
        </Grid>
      </div>
      <Box sx={{ height: 632, width: "100%" }}>
        <DataGrid
          // rows={campaignList}
          // columns={ columns1 }
          // pageSize={10}
          // disableColumnMenu
          // rowsPerPageOptions={[5]}
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
          pagination
          page={pageState.page}
          pageSize={pageState.limit}
          paginationMode="server"
          onPageChange={(newPage) => setPageState(old => ({ ...old, page: newPage }))}
          onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, limit: newPageSize }))}
          columns={pathname.includes('view-applications') ? columns1 : columns}
          disableSelectionOnClick={true}
          onRowClick={(item) => {
            if (pathname === "/hyperlocal") {
              navigate(`/view-hyper/${item.id}`);
            }
            else {
              navigate(`/view-campaign/${item.id}`);
            }
          }}
        />
      </Box>
    </>
  );
};

export default Campaigns;
