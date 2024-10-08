import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
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
];

const fromOption = ["3000", "10000", "30000"]
const toOption = ["10000", "30000", "150000"]

function FollowerRangeTab() {

    const dispatch = useDispatch();

    const [search, setSearched] = useState("");
    const [filterList, setFilterList] = useState(1);
    const [getListFilter, setGetListFilter] = useState([]);
    const [getFrom, setGetFrom] = useState('');
    const [getTo, setGetTo] = useState('');

    useEffect(() => {
        if (!!getTo && !!getFrom) {
            const data = {
                followerStartRange: getFrom,
                followerEndRange: getTo
            }
            dispatch(CreatorsFiletrList(data))
                .then((res) => {
                    setGetListFilter(res.data);
                    toast.success(res.message);
                })
                .catch((err) => {
                    toast.error(err);
                });
        } else {
            let data;
            if (filterList === 1) {
                data = {
                    followerStartRange: "3000",
                    followerEndRange: "10000"
                }
            }

            if (filterList === 2) {
                data = {
                    followerStartRange: "10000",
                    followerEndRange: "30000"
                }
            }

            if (filterList === 3) {
                data = {
                    followerStartRange: "30000",
                    followerEndRange: "150000"
                }
            }
            dispatch(CreatorsFiletrList(data))
                .then((res) => {
                    setGetListFilter(res.data);
                })
                .catch((err) => {
                    toast.error(err);
                });
        }
    }, [getFrom, getTo, filterList])

    useEffect(() => {
        if (search === null || search === '' || search === undefined) {
            //   getAllCreatorsListing();
        } else {
            setGetListFilter(
                getListFilter?.filter((column) => column?.name.includes(search))
            );
        }
    }, [search]);

    const handleListGetFilter = (item) => {
        setFilterList(item)
    }

    const onMutate = (e, value) => {
        setSearched(value);
    };

    const handleChangeFrom = (e, newValue) => {
        setGetFrom(newValue);
    }

    const handleChangeTo = (e, newValue) => {
        setGetTo(newValue);
    }

    const handleSelectLocation = () => {
        const newArray = [];
        const datas = getListFilter.map(item => {
            newArray.push(item.creator_id);
        })
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
                                        label="Search for Creators"
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
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={7}>
                    <Stack direction="row" spacing={2} className="filter-row">
                        <Button variant="contained" className={`filter-btn ${filterList === 1 && !getFrom && !getTo ? 'active' : ''}`} onClick={() => handleListGetFilter(1)} disabled={!getFrom && !getTo ? false : true}>C1 (3K-10K)</Button>
                        <Button variant="contained" className={`filter-btn ${filterList === 2 && !getFrom && !getTo ? 'active' : ''}`} onClick={() => handleListGetFilter(2)} disabled={!getFrom && !getTo ? false : true}>C2(10K-30K)</Button>
                        <Button variant="contained" className={`filter-btn ${filterList === 3 && !getFrom && !getTo ? 'active' : ''}`} onClick={() => handleListGetFilter(3)} disabled={!getFrom && !getTo ? false : true}>C3 (30K- 150/200K)</Button>
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
                            onChange={(e, value) => handleChangeFrom(e, value)}
                            options={fromOption.map((option) => option)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="From"
                                    placeholder=""
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {" "}
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            )}
                        // renderInput={(params) => <TextField {...params} label="From" onChange={(e) => handleChangeFrom(e)} />}
                        />
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            size='small'
                            sx={{ width: 140 }}
                            onChange={(e, value) => handleChangeTo(e, value)}
                            options={toOption.map((option) => option)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="To"
                                    placeholder=""
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {" "}
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            )}
                        // renderInput={(params) => <TextField {...params} label="to" onChange={(e) => handleChangeTo(e)} />}
                        />
                    </Stack>
                </Grid>
            </Grid>
            <Box sx={{ height: 632, width: "auto" }}>
                <DataGrid
                    getRowId={(row) => row.creator_id}
                    rows={!getListFilter?.length ? [] : getListFilter}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    disableColumnMenu
                // checkboxSelection
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