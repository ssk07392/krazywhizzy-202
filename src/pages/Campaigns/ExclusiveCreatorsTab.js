import { Autocomplete, Button, Grid, InputAdornment, TextField } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CreatorsFiletrList, notification } from '../../actions/creators'
import { SearchIcon } from '../../svg'

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
  },
  {
    field: "followers",
    headerName: "Followers",
    minWidth: 120,
    sortable: false,
  },
  {
    field: "state",
    headerName: "State",
    minWidth: 180,
    sortable: false,
  },
  {
    field: "phone_number",
    headerName: "Contact",
    minWidth: 180,
    sortable: false,
  },
  // {
  //     field: "category",
  //     headerName: "Category",
  //     minWidth: 110,
  // },
];

const rows = [
  { id: 1, creator_name: 'Johny Depp', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 2, creator_name: 'Cersei', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 3, creator_name: 'Jaime', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 4, creator_name: 'Arya', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 5, creator_name: 'Daenerys', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 6, creator_name: 'Bhautik', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 7, creator_name: 'Ferrara', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 8, creator_name: 'Rossini', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 9, creator_name: 'Harvey', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 10, creator_name: 'Daenerys', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 11, creator_name: 'Rahul', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 12, creator_name: 'Ferrara', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 13, creator_name: 'Rossini', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
  { id: 14, creator_name: 'Harvey', followers: '3.5M', state: 'Maharashtra', contact: '+91 0000000000', category: 'Beauty' },
];

function FollowerRangeTab() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [kycList, setKycList] = useState([]);
  const [search, setSearched] = useState("");
  // const [filter, /* setFilter */] = useState()
  const [filterList, setFilterList] = useState(1);
  const [getListFilter, setGetListFilter] = useState([]);
  console.log('getListFilter: ', getListFilter);
  const [getFrom, setGetFrom] = useState('');
  const [getTo, setGetTo] = useState('');
  const cellClickRef = React.useRef(null);
  const [selectionModel, setSelectionModel] = React.useState([]);
  console.log('selectionModel: ', selectionModel);
  const [selection, setSelection] = useState();

  // useEffect(() => {
  //   console.log("getTo", getTo, getFrom);
  //   if (getTo !== '' && getFrom !== '') {
  //     const data = {
  //       followerStartRange: getFrom,
  //       followerEndRange: getTo
  //     }
  //     dispatch(CreatorsFiletrList(data))
  //       .then((res) => {
  //         setGetListFilter(res.data);
  //       })
  //       .catch((err) => {
  //         toast.error(err);
  //       });
  //   } else {
  //     let data;
  //     if (filterList === 1) {
  //       data = {
  //         followerStartRange: "3000",
  //         followerEndRange: "10000"
  //       }
  //     }

  //     if (filterList === 2) {
  //       data = {
  //         followerStartRange: "10000",
  //         followerEndRange: "30000"
  //       }
  //     }

  //     if (filterList === 3) {
  //       data = {
  //         followerStartRange: "30000",
  //         followerEndRange: "150000"
  //       }
  //     }
  //     dispatch(CreatorsFiletrList(data))
  //       .then((res) => {
  //         setGetListFilter(res.data);
  //       })
  //       .catch((err) => {
  //         toast.error(err);
  //       });
  //   }
  // }, [getFrom, getTo, filterList])

  useEffect(() => {
    //   let data;
    //   if (filterList === 1) {
    //     data = {
    //       followerStartRange: "3000",
    //       followerEndRange: "10000"
    //     }
    //   }

    //   if (filterList === 2) {
    //     data = {
    //       followerStartRange: "10000",
    //       followerEndRange: "30000"
    //     }
    //   }

    //   if (filterList === 3) {
    //     data = {
    //       followerStartRange: "10000",
    //       followerEndRange: "30000"
    //     }
    //   }
    getAllCreatorsListing();
  }, [])

  const getAllCreatorsListing = () => {
    dispatch(CreatorsFiletrList())
    .then((res) => {
      setGetListFilter(res.data);
    })
    .catch((err) => {
      toast.error(err);
    });
  }

  const handleListGetFilter = (item) => {
    setFilterList(item)
  }

  const onMutate = (e, value) => {
    setSearched(value);
  };

  const handleChangeFilter = (e) => {
    // if (e.target.value == '5') {
    //   getAllKycListing();
    // } else {
    //   dispatch(KycFilterListing(`?kyc_filter=${e.target.value}`))
    //     .then((res) => {
    //       setKycList(res.data);
    //     })
    //     .catch((err) => {
    //       toast.error(err);
    //     });
    // }
  };
  const handleSelectLocation = () => {
    const newArray = [];
    const datas = getListFilter.map(item => {
      newArray.push(item.creator_id);
    })
    const data = {
      creatorsIds: selectionModel,
      campaignId: localStorage.getItem("campaignId")
    }
    dispatch(notification(data))
      .then((res) => {
        if (res.code === 200) {
          toast.success(res.message);
          navigate('/campaigns')
          newArray = [];
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.success(err.message);
        newArray = [];
      });
  }

  const handleChangeFrom = (e) => {
    setGetFrom(e.target.value);
  }

  const handleChangeTo = (e) => {
    setGetTo(e.target.value);
  }
  useEffect(() => {
    if (search !== null || search !== '' || search !== undefined) {
        //   getAllCreatorsListing();
        if (search === null) {
          getAllCreatorsListing();
        }
     else {
        setGetListFilter(
            getListFilter?.filter((column) => column?.name.includes(search))
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
                size="small"
                onChange={(e, value) => onMutate(e, value)}
                options={getListFilter?.map((option) => option?.name)}
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
          {/* <Grid item xs={4}>
                        <FormControl variant="filled" sx={{ m: 1, maxWidth: 400 }}>
                            <Select
                                value={filter}
                                onChange={handleChangeFilter}
                                displayEmpty
                                size='small'
                                required
                            >
                                <MenuItem value={5}>View all creators</MenuItem>
                                <MenuItem value={1}>KYC completed</MenuItem>
                                <MenuItem value={2}>KYC Not completed</MenuItem>
                                <MenuItem value={3}>Aadhar and Pan card verification</MenuItem>
                                <MenuItem value={4}>Bank Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid> */}
        </Grid>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        {/* <Grid item xs={7}>
          <Stack direction="row" spacing={2} className="filter-row">
            <Button variant="contained" className={`filter-btn ${filterList === 1 ? 'active' : ''}`} onClick={() => handleListGetFilter(1)}>C1 (3K-10K)</Button>
            <Button variant="contained" className={`filter-btn ${filterList === 2 ? 'active' : ''}`} onClick={() => handleListGetFilter(2)}>C2(10K-30K)</Button>
            <Button variant="contained" className={`filter-btn ${filterList === 3 ? 'active' : ''}`} onClick={() => handleListGetFilter(3)}>C3 (30K- 150/200K)</Button>
          </Stack>
        </Grid> */}
        {/* <Grid item xs={5}>
          <Stack direction="row" spacing={2}>
            <InputLabel id="demo-simple-select-label" className='extra-label mar-top-8'>Follower Range</InputLabel>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              size='small'
              sx={{ width: 140 }}
              // options={top100Films.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} label="From" onChange={(e) => handleChangeFrom(e)} />}
            />
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              size='small'
              sx={{ width: 140 }}
              // options={top100Films.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} label="to" onChange={(e) => handleChangeTo(e)} />}
            />
          </Stack>
        </Grid> */}
      </Grid>
      <Box sx={{ height: 632, width: "auto" }}>
        <DataGrid
          getRowId={(row) => row.creator_id}
          rows={getListFilter}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          disableColumnMenu
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

export default FollowerRangeTab