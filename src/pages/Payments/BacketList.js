import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { ActionArrow, RightStatus, SearchIcon, SparkFill, SparkOutline } from "../../svg";
import { useDispatch } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CampaignListing } from "../../actions/campaign";
import { paymentTransactionBucket } from "../../actions/Payment";
import moment from "moment/moment";

const BacketList = () => {

  const [campaignList, setCampaignList] = useState([]);
  console.log('campaignList: ', campaignList);
  const [search, setSearched] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    {
      field: "campaign_id",
      headerName: "Sr No.",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "brand_logo_url",
      headerName: "Brand Logo",
      flex: 1.5,
      renderCell: (params) => <img src={params.value} alt="" />,
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
      field: "export_date",
      headerName: "Export  Date",
      flex: 0.9,
      sortable: false,
      renderCell : (params) => {
        const startT = new Date(params.value * 1000).toISOString();
        const exportDate = moment(startT).format('DD/MM/YYYY')
        return exportDate
        }
    },
    {
      field: "viewApplication",
      // headerName: "View Application",
      headerName: "",
      flex: 0.4,
      sortable: false,
      renderCell: (params, row) => {
        const onClick = (e) => {
          console.log('params, row: ', params, row);
          e.stopPropagation();

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

        //   navigate(`/backet-details/${params?.row?.bucket_id}`);
          navigate({
            pathname: `/backet-details/${params?.row?.bucket_id}/${params?.row?.campaign_id}`,
            search: `?${createSearchParams({
                name: params.row.brand_name+" "+ params.row.campaign_title
              })}`
          });
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
    dispatch(paymentTransactionBucket())
      .then((res) => {
        console.log('res: ', res.data);
        setCampaignList(res.data);
        toast.success(res.message);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllCampaignListing();
  }, []);

  // const handleRedirection = (e) => {
  //   navigate("/edit-campaign");
  // };

  const onMutate = (e, value) => {
    setSearched(value);
  };

  // useEffect(() => {
  //   if (search !== null || search !== "" || search !== undefined) {
  //     if (search === null) {
  //       getAllCampaignListing();
  //     } else {
  //       setCampaignList(
  //         campaignList.filter((column) =>
  //           search.includes(column.campaign_title)
  //         )
  //       );
  //     }
  //   }
  // }, [search]);

  return (
    <>
      {/* <div className="search-row">
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
                options={campaignList.map((option) => option.campaign_title)}
                onChange={(e, value) => onMutate(e, value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=""
                    placeholder="Search for campaign"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Stack>
          </Grid>
        </Grid>
      </div> */}
      <Box sx={{ height: 632, width: "100%" }}>
        <DataGrid
          rows={campaignList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row?.bucket_id}
          disableColumnMenu
        />
      </Box>
    </>
  );
};

export default BacketList;
