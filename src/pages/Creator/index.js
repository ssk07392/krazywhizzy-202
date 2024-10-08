import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Autocomplete,
  Box,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { ActionArrow, KycStatus, SearchIcon } from "../../svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreatorsAllListing, CreatorsListing } from "../../actions/creators";

const Creator = () => {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    limit: 10,
    page: 0
  })
  const [creatorsList, setCreatorsList] = useState([]);
  const [search, setSearched] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onMutate = (e, value) => {
    setSearched(value);
  };

  const getAllCreatorsListing = () => {
    setPageState(old => ({ ...old, isLoading: true }))
    dispatch(CreatorsAllListing(`?page=${pageState.page}&limit=${pageState.limit}`))
      .then((res) => {
        if (res.code === 200) {
          toast.success("Creators Listing fetch successfully");
          setPageState(old => ({ ...old, isLoading: false, data: res.data.data, total: res.data.total }))
          setCreatorsList(res.data);
        }
      })
      .catch((err) => {
        toast.success(err);
      });
  };

  useEffect(() => {
    getAllCreatorsListing();
  }, [pageState.page, pageState.limit]);

  const columns = [
    {
      field: "creator_id",
      headerName: "Sr No.",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Creator Name",
      flex: 1.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "campaign_followers_range",
      headerName: "Followers",
      flex: 1,
      sortable: false,
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "address",
      headerName: "State",
      flex: 1.2,
      sortable: false,
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "phone_number",
      headerName: "Contact",
      flex: 1, sortable: false,
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "categoriesArrayList",
      headerName: "Category",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const value = params.value;
        return (
          <Chip
            label={`${value.length > 0 ? value[0].name : "Not Data"}`}
            variant="outlined"
          />
        );
      },
    },
    {
      field: "kyc_status",
      headerName: "KYC",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        if (params.value === null || params.value === "0" || params.value === 0) {
          return (
            <Stack direction="row" spacing={2}>
              <KycStatus svgFill="red" />
            </Stack>
          );
        } else {
          return (
            <Stack direction="row" spacing={2}>
              <KycStatus svgFill="green" />
            </Stack>
          );
        }
      },
      // console.log("params", params.value)
    },
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
          navigate(`/view-creator/${thisRow.creator_id}`);
        };
        return (
          <IconButton aria-label="fingerprint" onClick={(e) => onClick(e)}>
            <ActionArrow />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    if (search !== null || search !== "" || search !== undefined) {
      if (search === null) {
        getAllCreatorsListing();
      } else {
        setPageState(old => ({
          ...old,
          data: pageState.data.filter((column) => search.includes(column.name)),
          total:  pageState.data.filter((column) => search.includes(column.name)).length
        }))
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
          <Grid item xs={12}>
            <Stack spacing={2} sx={{ width: 630 }}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                size="small"
                options={pageState.data.map((option) => option.name)}
                onChange={(e, value) => onMutate(e, value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search for creators"
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
      <Box sx={{ height: 632, width: "auto" }}>
        <DataGrid
          getRowId={(row) => row.creator_id}
          disableColumnMenu
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
          columns={columns}
        />
      </Box>
    </>
  );
};

export default Creator;
