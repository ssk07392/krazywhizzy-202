import React, { useState } from 'react'
import {  Box, Button, ButtonGroup, Chip, FilledInput, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { SearchIcon } from '../../svg';
import { Autocomplete, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './Campaigns.scss'
import { useDispatch } from 'react-redux';
import { latLongCamp } from '../../actions/campaign';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import Dropzone from 'react-dropzone';

const categoriesList = ['Surat', 'Maharashtra']


const containerStyle = {
  width: '100%',
  height: '100%'
};

const placesLibrary = ['places']

const SelectCreatorsLocation = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [kycList, setKycList] = useState([]);
  const [multiSelect, setMultiSelect] = useState([])
  const [search, setSearched] = useState("")
  const [filter, /* setFilter */] = useState()
  const [map, setMap] = React.useState(null)
  const [searchResult, setSearchResult] = useState('');
  const [activeMarker, setActiveMarker] = useState(null);
  console.log('activeMarker: ', activeMarker);

  const [center, setCenter] = useState({
    lat: 23.0225,
    lng: 72.5714
  });

  const [markers, setMarker] = useState(
    [])
    
  const handleSelect = (e) => {
    const {
      target: { value },
    } = e;
    setMultiSelect(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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

  const onMutate = (e, value) => {
    setSearched(value);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB3qfOgTiJdEa5hv_l03saH8RMne_sQzqM",
    libraries: placesLibrary
  })

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onLoaded = (autocomplete) =>  {
    console.log('autocomplete: ', autocomplete);
    setSearchResult(autocomplete)
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      //variable to store the result
      const place = searchResult.getPlace();
      //variable to store the name from place details result 
      const name = place.name;
      //variable to store the status from place details result
      const status = place.business_status;
      //variable to store the formatted address from place details result
      const formattedAddress = place.formatted_address;
      // lat and lng
      const latData = place.geometry.location.lat();
      const lngData = place.geometry.location.lng();
      // console.log(place);
      //console log all results
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
      console.log('place: ', place.geometry.location);
      setCenter({lat : latData , lng : lngData })
    setMarker([...markers, { lat: latData, lng: lngData }])

    } else {
      alert("Please enter text");
    }
  }

  const handleClickMarker = (marker) => {
    console.log('marker:', marker);
    console.log('marker: ', marker.latLng.lat());
    const latData = marker.latLng.lat();
    const lngData = marker.latLng.lng();
    setCenter({lat : latData , lng : lngData })
    setMarker([...markers, { lat: latData, lng: lngData }])
  }

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleSelectLocation = () => {
    const data = {
      // latLongArray : [{lat : center.lat , long : center.lng }],
      latLongArray : markers,
      campaignId : localStorage.getItem("campaignId")
    }
    dispatch(latLongCamp(data))
    .then((res) => {
      if (res.code === 200) {
        toast.success(res.message);
        navigate('/hyperlocal')
      }
    })
    .catch((err) => {
      toast.success(err);
    });
  }


  const handleActiveMarkerRemove = (item) => {
    const filter = markers.filter((list, i) => list.lat !== item.lat && list.lng !== item.lng)
    setMarker(filter);
  }

  return (
    <>
      <div className="select-creators-by-sec">
        <ButtonGroup className='campaign-select-row' variant="contained" aria-label="outlined primary button group">
          {/* <Button >Unfiltered</Button>
          <Button>Location</Button>
          <Button>Follower Range</Button>
          <Button>Exclusive Creators</Button> */}
          <Button className='active'>Hyper Local</Button>
        </ButtonGroup>
      </div>
      <div className="search-row mar-top-30">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={8}>
            <Stack spacing={2} sx={{ width: 630 }}>
             {isLoaded && 
            //  <Autocomplete
            //     id="free-solo-demo"
            //     freeSolo
            //     size="small"
            //     // onChange={onMutate}
            //     onPlaceChanged={onPlaceChanged} 
            //     onLoad={onLoaded}
            //     // options={kycList.map((option) => option.name)}
            //     renderInput={(params) => (
            //       <TextField
            //         {...params}
            //         label=""
            //         placeholder="Search for creators"
            //         InputProps={{
            //           startAdornment: (
            //             <InputAdornment position="start">
            //               <SearchIcon />
            //             </InputAdornment>
            //           )
            //         }}
            //       />
            //     )}
            //   />
            <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoaded}>
          <TextField
                    // {...params}
                    label=""
                    placeholder="Search for location"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      )
                    }}
                  />
        </Autocomplete>
      
          }
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
      <div className="map-section">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            // zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            style={{width: '100%'}}
            onClick={handleClickMarker}
          >
            { /* Child components, such as markers, info windows, etc. */}
            {/* <Marker position={center} clickable={true}/> */}
            {Array.isArray(markers) && markers.map((item) => {
            console.log('item: ', item);

            return (
              <Marker
                key={item?.id}
                position={{lat:item.lat,lng:item.lng}}
                onClick={() => handleActiveMarker(item?.id)}
                clickable={true}
                onDblClick={() => handleActiveMarkerRemove(item)}
              >
                {/* {activeMarker === item?.id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{item.id}</div>
                </InfoWindow>
              ) : null} */}
              </Marker>
            )
          })}
          </GoogleMap>
        ) : <></>}
      </div>
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
  );
}

export default SelectCreatorsLocation;
