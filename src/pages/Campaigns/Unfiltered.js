import { Autocomplete, Box, Button, Chip, Grid, IconButton, InputAdornment, InputLabel, Stack, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreatorsAllListing, notification } from '../../actions/creators';
import { KycStatus, SearchIcon } from '../../svg'

function Unfiltered() {

  const dispatch = useDispatch();

  const [search, setSearched] = useState("");
  // const [creatorsList, setCreatorsList] = useState([]);
  const [creatorsId, setCreatorsId] = useState([]);
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    limit: 10,
    page: 0
  })

  const getAllCreatorsListing = () => {
    setPageState(old => ({ ...old, isLoading: true }))

    dispatch(CreatorsAllListing(`?page=${pageState.page}&limit=${pageState.limit}`))
      .then((res) => {
        if (res.code === 200) {
          toast.success("Creators Listing fetch successfully");
          setPageState(old => ({ ...old, isLoading: false, data: res.data.data, total: res.data.total }))
          // setCreatorsList(res.data);
        }
      })
      .catch((err) => {
        toast.success(err);
      });
  };

  const onMutate = (e, value) => {
    setSearched(value);
  };

  useEffect(() => {
    if (search === null || search === '' || search === undefined) {
      getAllCreatorsListing();
    } else {
      setPageState(old => ({
        ...old,
        data: pageState.data.filter((column) => search.includes(column.name)),
        total:  pageState.data.filter((column) => search.includes(column.name)).length
      }))
      // setCreatorsList(
      //   creatorsList.filter((column) => column.name.includes(search))
      // );
    }
  }, [search,pageState.page, pageState.limit]);

  const columns = [
    {
      field: "creator_id",
      headerName: "Sr No.",
      flex: 0.5,
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
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "address",
      headerName: "State",
      flex: 1.2,
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "phone_number",
      headerName: "Contact",
      flex: 1,
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "categoriesArrayList",
      headerName: "Category",
      flex: 1,
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
      renderCell: (params) => {
        if (params.value === null || params.value === "0") {
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
  ];

  const handleSelectLocation = () => {
    const newArray = [];
    // const datas = creatorsList.map(item => {
    //   newArray.push(item.creator_id);
    // })
    const data = {
      creatorsIds: newArray,
      campaignId: localStorage.getItem("campaignId")
    }
    dispatch(notification(data))
      .then((res) => {
        if (res.code === 200) {
          toast.success(res.message);
          newArray = [];
        }else{
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.success(err.message);
        newArray = [];
      });
  }

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
                options={pageState.data.map((option) => option.name)}
                // options={creatorsList.map((option) => option.name)}
                onChange={(e, value) => onMutate(e, value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search for campaign"
                    placeholder=""
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          {" "}
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
          columns={columns}
          // pageSize={10}
          // rowsPerPageOptions={[5]}
          onPageChange={(newPage) => setPageState(old => ({ ...old, page: newPage }))}
          onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, limit: newPageSize }))}
          // checkboxSelection
          // onSelectionModelChange={(newSelection) => {
          //   setCreatorsId(newSelection)
          // }}
        />
      </Box>
      <div className="mar-top-30">
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={3} textAlign="right" className="mar-top-30">
            <Button variant="contained" onClick={handleSelectLocation}>Select</Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Unfiltered