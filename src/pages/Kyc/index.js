import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  Input,
} from "@mui/material";
import Stack from '@mui/material/Stack';
import { ActionArrow, KycStatus, SearchIcon } from "../../svg";
import { KycFilterListing, KycListing } from "../../actions/kyc";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const filterMenu = [
  {
    id: 1, name: "KYC Complete"
  }, { id: 2, name: "KYC Incomplete" }, { id: 3, name: "Aadhar verified" }, { id: 4, name: "Pan Card Verified" }, { id: 5, name: "Bank Details verified" },
  { id: 6, name: "Document verification pending" },{ id: 7, name: "Bank verification pending" }
]

const Kyc = () => {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    limit: 10,
    page: 0
  })
  const dispatch = useDispatch();
  const [kycList, setKycList] = useState([]);
  const [/* AllkycList, */ setAllKycList] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearched] = useState("");
  const navigate = useNavigate()

  const getAllKycListing = () => {
    let filterLink = filter ? `page=${pageState.page}&limit=${pageState.limit}&kyc_filter=${filter}` : `page=${pageState.page}&limit=${pageState.limit}`
    setPageState(old => ({ ...old, isLoading: true }))
    dispatch(KycListing(`?${filterLink}`))
      .then((res) => {
        console.log("response -----> ", res.data);
        toast.success(res.message);
        setPageState(old => ({ ...old, isLoading: false, data: res.data.data, total: res.data.total }))
      })
      .catch((err) => {
        toast.success(err);
      });
  };

  useEffect(() => {
    getAllKycListing();
  }, [pageState.page, pageState.limit, filter]);

  const columns = [
    {
      field: "id",
      headerName: "Sr No.",
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (params.id ? params.id : "-"),
    },
    {
      field: "creator_name",
      headerName: "Creator Name",
      flex: 1.6,
      sortable: false,
      filterable: false,
      renderCell: (params) => (params?.row?.name ? params?.row?.name : "-"),
    },
    {
      field: "followers",
      headerName: "Followers",
      flex: 0.8,
      sortable: false,
      renderCell: (params) => params?.row?.campaign_followers_range ? params?.row?.campaign_followers_range : "-",
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
      sortable: false,
      renderCell: (params) => params?.row?.address ? params?.row?.address : "-",
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
      sortable: false,
      renderCell: (params) =>
        params?.row?.phone_number ? params?.row?.phone_number : "-",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1.3,
      sortable: false,
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
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.6,
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
          navigate(`/view-kyc/${thisRow.id}`);
        };
        return (
          <IconButton aria-label="fingerprint" onClick={(e) => onClick(e)}>
            <ActionArrow />
          </IconButton>
        );
      },
    },
  ];

  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
    setPageState(old => ({ ...old, isLoading: true }))
    dispatch(KycFilterListing(`?page=${pageState.page}&limit=${pageState.limit}&kyc_filter=${e.target.value}`))
      .then((res) => {
        setPageState(old => ({ ...old, isLoading: false, data: res.data.data, total: res.data.total }))
      })
      .catch((err) => {
        toast.error(err);
      });

  };

  const onMutate = (e, value) => {
    setSearched(value);
  };

  useEffect(() => {
    if (search !== null || search !== "" || search !== undefined) {
      if (search === null) {
        getAllKycListing();
      } else {
        setPageState(old => ({ ...old, data: pageState.data.filter((column) => search.includes(column.name)), total: pageState.data.filter((column) => search.includes(column.name)).length }))
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
          <Grid item xs={8}>
            <Stack spacing={2} sx={{ width: 630 }}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                size="small"
                onChange={onMutate}
                options={pageState.data.map((option) => option.name)}
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
          <Grid item xs={4}>
            <FormControl variant="filled" sx={{ m: 1, maxWidth: 400 }}>
              <InputLabel htmlFor="name-multiple">Select KYC Filter</InputLabel>
              <Select
                value={filter}
                onChange={handleChangeFilter}
                displayEmpty
                size='small'
                required
                input={<Input id="name-multiple" />}
                defaultValue={1}
              >
                {/* <MenuItem value={5}>Bank Details verified</MenuItem>
                <MenuItem value={1}>KYC Complete</MenuItem>
                <MenuItem value={2}>KYC Incomplete</MenuItem>
                <MenuItem value={3}>Aadhar verified</MenuItem>
                <MenuItem value={4}>Pan Card verified</MenuItem> */}
                {filterMenu?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <em>{item.name}</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <Box sx={{ height: 632, width: "auto" }}>
        <DataGrid
          // rows={kycList}
          // columns={columns}
          // getRowId={(row) => row.id}
          // pageSize={10}
          // rowsPerPageOptions={[5]}
          // disableColumnMenu
          rows={pageState.data}
          // getRowId={(row) => row.creator_id}
          disableColumnMenu
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
        // checkboxSelection
        />
      </Box>
    </>
  );
};


export default Kyc;
