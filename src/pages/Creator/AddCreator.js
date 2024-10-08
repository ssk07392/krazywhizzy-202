import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Stack from '@mui/material/Stack';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createSearchParams, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CampaignApplicationListing } from "../../actions/campaign";
import { SearchIcon } from "../../svg";
import { toast } from "react-toastify";

const AddCreator = () => {
  
  // const [status, setStatus] = React.useState('');
  const [campaignList, setCampaignList] = useState([]);
  const [search, setSearched] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { creatorId } = useParams();
  
  const onMutate = (e, value) => {
    setSearched(value);
  };

  const columns = [
    {
      field: "creator_id",
      headerName: "Sr No.",
      minWidth: 60,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Creator Name",
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "followers",
      headerName: "Followers",
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "address",
      headerName: "State",
      minWidth: 180,
      sortable: false,
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "contact",
      headerName: "Contact",
      minWidth: 180,
      sortable: false,
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "categoriesArrayList",
      headerName: "Category",
      minWidth: 110,
      sortable: false,
      renderCell: (params) => {
        const value = params.value;
        console.log('value: ', value);
        return (
          <Chip
            label={`${value.length > 0 ? value[0].name : "Not Data"}`}
            variant="outlined"
          />
        );
      },
    },
    {
      field: "application_status",
      headerName: "Status",
      minWidth: 110,
      sortable: false,
      renderCell: (params) => {
        const value = params.value;
        return (
          <>
            {value === 0 ? 'Applied' : value === 1 ? 'Approved' : value === 2 ? 'Price final' : value === 3 ? 'In process' : value === 4 ? 'Work submitted' : value === 5 ? 'Rejected' : value === 6 ? 'Completed' : '-'}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 110,
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
          navigate(`/application-status/${params.row.id}/${thisRow.creator_id}`);
          // navigate({
          //   pathname: "/application-status",
          //   search: `?${createSearchParams({
          //     id: params.row.id,
          //     creatorId : thisRow.creator_id
          //   })}`
          // });
        };

        return (
          <IconButton aria-label="fingerprint" onClick={(e) => onClick(e)}>
            <VisibilityIcon />
          </IconButton>
        );
      },
    },
  ];
  
  const handleChangeStaus = (event) => {
        dispatch(CampaignApplicationListing(`?applicationType=${(event.target.value).toString()}&campaignId=${creatorId}`))
          .then((res) => {
            console.log('res------>: ', res);
            setCampaignList(res.data);
          })
          .catch((err) => {
            toast.error(err);
          });
      // }
  };

  const getAllCampaignListing = () => {
    dispatch(CampaignApplicationListing(`?campaignId=${creatorId}`))
      .then((res) => {
        setCampaignList(res.data);
      })
      .catch((err) => {
      });
  };

  useEffect(() => {
    getAllCampaignListing();
  }, []);

  useEffect(() => {
    if (search !== null || search !== "" || search !== undefined) {
      if (search === null) {
        getAllCampaignListing();
      } else {
        setCampaignList(
          campaignList.filter((column) => search.includes(column.name))
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
          <Grid item xs={8}>
            <Stack spacing={2} sx={{ width: 630 }}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                size='small'
                options={campaignList.map((option) => option.name)}
                onChange={(e, value) => onMutate(e, value)}
                renderInput={(params) => (
                  <TextField {...params} label="Search for creators" 
                  placeholder="Search for campaign"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}/>
                )}
                />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <FormControl variant="filled" sx={{ m: 1, maxWidth: 400 }}>
              <Select
                // value={status}
                onChange={handleChangeStaus}
                displayEmpty
                size='small'
                // placeholder="Status"
                required
                >
                {/* <MenuItem value="">
                  <em>Status</em>
                </MenuItem> */} 
                <MenuItem value={0}>Applied</MenuItem>
                <MenuItem value={1}>Approved</MenuItem>
                <MenuItem value={2}>Price final</MenuItem>
                <MenuItem value={3}>In-Process</MenuItem>
                <MenuItem value={4}>Work submitted</MenuItem>
                <MenuItem value={5}>Rejected</MenuItem>
                <MenuItem value={6}>Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      {/* <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        >
        <Grid item xs={7}>
          <Stack direction="row" spacing={2} className="filter-row">
            <Button variant="contained" className="filter-btn active">C1 (3K-10K)</Button>
            <Button variant="contained" className="filter-btn">C2(10K-30K)</Button>
            <Button variant="contained" className="filter-btn">C3 (30K- 150/200K)</Button>
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Stack direction="row" spacing={2}>
            <InputLabel id="demo-simple-select-label" className='extra-label mar-top-8'>Follower Range</InputLabel>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              size='small'
              sx={{ width: 140 }}
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} label="From" />}
            />
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              size='small'
              sx={{ width: 140 }}
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} label="to" />}
            />
          </Stack>
        </Grid>
      </Grid> */}
      <Box sx={{ height: 632, width: "auto" }}>
        <DataGrid
          rows={campaignList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableColumnMenu
          // checkboxSelection
        />
      </Box>
    </>
  );
};

export default AddCreator;
