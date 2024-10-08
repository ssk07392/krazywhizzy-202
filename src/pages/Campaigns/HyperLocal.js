import { Autocomplete, Box, Button, Grid, InputAdornment, InputLabel, Stack, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { SearchIcon } from '../../svg'

const columns = [
  {
    field: "id",
    headerName: "Sr No.",
    minWidth: 60,
    sortable: false,
  },
  {
    field: "creator_name",
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
    field: "contact",
    headerName: "Contact",
    minWidth: 180,
    sortable: false,
  },
  {
    field: "category",
    headerName: "Category",
    minWidth: 110,
    sortable: false,
  },
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

function HyperLocal() {

  const [kycList, setKycList] = useState([]);
  const [search, setSearched] = useState("");

  const onMutate = (e, value) => {
    setSearched(value);
  };

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003, },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
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
          <Grid item xs={8}>
            <Stack spacing={2} sx={{ width: 630 }}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                size="small"
                onChange={onMutate}
                options={kycList.map((option) => option.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=""
                    placeholder="Search for creators"
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
      </Grid>
      <Box sx={{ height: 632, width: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
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
            <Button variant="contained">Select</Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default HyperLocal