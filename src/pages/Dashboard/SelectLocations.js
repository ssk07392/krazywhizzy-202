import { Autocomplete, Button, Chip, Grid, Stack, TextField } from "@mui/material";
import React from "react";
import './OverviewCard.scss'


const SelectLocations = () => {

  return (
    <>
      <Grid item xs={7}>
        <Stack direction="row" spacing={2} className="filter-row">
          <Button variant="contained" className="filter-btn active">Select Creators from All Over India</Button>
          <Button variant="contained" className="filter-btn">Select Creators by States</Button>
          <Button variant="contained" className="filter-btn">Select Creators by cities</Button>
          <Button variant="contained" className="filter-btn">Hyper Local</Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} sx={{ width: 630 }}>
          <Autocomplete
            multiple
            id="tags-filled"
            options={top100Films.map((option) => option.title)}
            defaultValue={[top100Films[13].title]}
            className='multiple-chip'
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                placeholder="Search Location"
              />
            )}
          />
        </Stack>
      </Grid>
    </>
  );
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

export default SelectLocations;
