import React, { useState } from 'react'
import { Button, ButtonGroup, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, } from '@mui/material';
import { SparkFill, SparkOutline, RightStatus, DeleteRed } from '../../svg'
import { useDropzone } from 'react-dropzone';
import './Campaigns.scss'
// import Dropzone from 'react-dropzone';


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


function Previews(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt=""
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  // }, []);

  return (
    <section className="dropzone-sec">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <Button variant="contained" component="label" className='upload-video'>
          <span className='upload-plus-btn'>+</span>
        </Button>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}


const AddCampaign = () => {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

	return (
		<>
      <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2} className='mar-bottom-40'>
        <Grid item xs={6}>
          <h3 className='page-title'>Edit Campaign</h3>
        </Grid>
        <Grid item container direction="row" justifyContent="end" alignItems="center" xs={6} textAlign='right'>
          <Typography variant="button" display="block" style={{margin: '0 10px 0 0'}}>Campaign Status</Typography>
          <ButtonGroup className='campaign-status' variant="contained" aria-label="outlined primary button group">
            <Button className='active'><SparkFill /></Button>
            <Button><SparkOutline /></Button>
            <Button><RightStatus svgFill="#1B5E20" /></Button>
          </ButtonGroup>
          <Button variant="outlined" className='delete-outline mar-left-20'><DeleteRed />&nbsp;&nbsp;Delete Campaign</Button>
        </Grid>
      </Grid>
      <div className='border-paper'>
        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2} className='mar-bottom-40'>
          <Grid item xs={8}>
            <InputLabel id="demo-simple-select-label" className='extra-label'>Brand Name</InputLabel>
            <FormControl variant="filled" sx={{ m: 1, maxWidth: 400 }}>
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                size='small'
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Nykaa</MenuItem>
                <MenuItem value={2}>Netflix</MenuItem>
                <MenuItem value={3}>Amazon</MenuItem>
                <MenuItem value={4}>Pepsi</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <InputLabel id="demo-simple-select-label" className='extra-label'>Price Range</InputLabel>
            <FormControl variant="filled" sx={{ m: 1, maxWidth: 120 }}>
              <TextField id="filled-basic" label="8K-10K" variant="filled" size='small' />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <InputLabel id="demo-simple-select-label" className='extra-label'>Follower Range</InputLabel>
            <FormControl variant="filled" sx={{ m: 1, maxWidth: 120 }}>
              <TextField id="filled-basic" label="8K-10K" variant="filled" size='small' />
            </FormControl>
          </Grid>
        </Grid>
        <Divider className='divide-mar-40--40' />
        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <InputLabel id="demo-simple-select-label" className='extra-label'>Campaign Title</InputLabel>
            <FormControl variant="filled">
              <TextField id="filled-multiline-static" label="Multiline" multiline rows={4} variant="filled" />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="demo-simple-select-label" className='extra-label'>Category</InputLabel>
            <FormControl variant="filled">
              <TextField id="filled-multiline-static" label="Multiline" multiline rows={4} variant="filled" />
            </FormControl>
          </Grid>
        </Grid>
        <Divider className='divide-mar-40--40' />
        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <InputLabel id="demo-simple-select-label" className='extra-label'>Description</InputLabel>
            <FormControl variant="filled">
              <TextField id="filled-multiline-static" label="Multiline" multiline rows={4} variant="filled" />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="demo-simple-select-label" className='extra-label'>Requirements</InputLabel>
            <FormControl variant="filled">
              <TextField id="filled-multiline-static" label="Multiline" multiline rows={4} variant="filled" />
            </FormControl>
          </Grid>
        </Grid>
        <Divider className='divide-mar-40--40' />
        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <InputLabel id="demo-simple-select-label" className='extra-label'>Sample Submission</InputLabel>
            <Previews />
          </Grid>
        </Grid>
      </div>
      <div className='btn-row reverse mar-top-20'>
        <Button variant="contained" className='min-width-180-img'>Contained</Button>
      </div>
		</>
	);
}

export default AddCampaign;
