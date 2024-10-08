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
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ActionArrow, RightStatus, SearchIcon, SparkFill, SparkOutline } from "../../svg";
import { PaymentPendingListing } from "../../actions/Payment";


const Payments = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [campaignList, setCampaignList] = useState([]);
  const [search, setSearched] = useState("");

  // useEffect(() => {
  //   getAllCampaignListing();
  // }, []);

  useEffect(() => {
    if (!!search) {
      setCampaignList(
        campaignList?.filter((column) =>
          search?.includes(column?.campaign_title)
        )
      );
    } else {
      getAllCampaignListing();
    }
  }, [search]);

  const getAllCampaignListing = () => {
    dispatch(PaymentPendingListing())
      .then((res) => {
        setCampaignList(res.data || []);
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
       });
  };

  const onMutate = (e, value) => {
    setSearched(value);
  };

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
    {
      field: "viewApplication",
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

          navigate(`/payments-approved/${thisRow.id}`);
        };

        return (
          <IconButton aria-label="fingerprint" onClick={(e) => onClick(e)}>
            <ActionArrow />
          </IconButton>
        );
      },
    },
  ];

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
                options={campaignList?.map((option) => option?.campaign_title)}
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
        </Grid>
      </div>
      <Box sx={{ height: 632, width: "100%" }}>
        <DataGrid
        getRowId={(row) => row.id}
          rows={campaignList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableColumnMenu
        />
      </Box>
    </>
  );
};

export default Payments;
