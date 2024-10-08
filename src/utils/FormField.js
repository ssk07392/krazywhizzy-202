// import { TextField, Select, FormControl, InputLabel, MenuItem, Input, Autocomplete } from '@mui/material'
// import { DatePicker, LocalizationProvider } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import SearchIcon from '@mui/icons-material/SearchRounded'
// import { toAbsoluteUrl } from '.';
// import SelectMulti from "react-select";
// import Grid from '@mui/material/Grid'
// import SearchBar from "material-ui-search-bar"


// export const renderInput = ({ input, type, placeholder, containerClasses, inputClasses, labelClasses, max, Type, labelName, disabled, meta: { touched, error, }}) => (
//   <>
//     <div className={containerClasses}>
//       <Input {...input} className={inputClasses} min={Type === 'number' ? 1 : null}
//         max={Type === 'number' ? 2 : null} type={Type} placeholder={placeholder} />
//       <label htmlFor={labelName} className={labelClasses} data-content={labelName}><span className="hidden--visually">{labelName}</span></label>
//     </div>
//     <div className="input-error">
//       {(touched && error) && <span className="mb-0 text-right text-danger" >{error}</span>}
//     </div>
//   </>
// )

// export const RenderSearchBar = ({ }) => (
  // <Grid item xs={8}>
  //   <SearchBar
  //     placeholder="Search"
  //     value={searched}
  //     onChange={(searchVal) => { setSearched(searchVal); requestSearch(searchVal) }}
  //     onCancelSearch={() => cancelSearch()}
  //     searchIcon={null}
  //   />
  // </Grid>
// )

// export const renderTextFieldInput = ({ input, containerClasses, labelName, Type, max, CHARACTER_LIMIT, disabled, meta: { touched, error, }}) => (
//   <>
//     <div className={containerClasses}>
//       <TextField {...input} label={labelName}
//         inputProps={{
//           min: Type === 'Number' ? 1 : null, max: Type === 'Number' ? max : null,
//           maxLength: CHARACTER_LIMIT ? CHARACTER_LIMIT : ""
//         }}
//         helperText={CHARACTER_LIMIT ? `${input.value.length}/${CHARACTER_LIMIT}` : ""}
//         type={Type} disabled={disabled} variant="standard" />
//     </div>
//     <div className={labelName === "Contact Number" ? "input-error flex-100 pad-left" : "input-error"}>
//       {(touched && error) && <span className="mb-0 text-right text-danger" >{error}</span>}
//     </div>
//   </>
// )

// export const renderUnitInput = ({ input, containerClasses, labelName, Type, putDecimal, disabled, meta: { touched, error, }}) => (
//   <>
//     <div className={containerClasses}>
//       <TextField {...input} label={labelName}
//         inputProps={{
//           min: Type === 'Number' ? 1 : null, step: putDecimal ? "any" : null,
//         }}
//         type={Type} disabled={disabled} variant="standard" />
//     </div>
//     <div className="input-error">
//       {(touched && error) && <span className="mb-0 text-right text-danger" >{error}</span>}
//     </div>
//   </>
// )

// export const renderTextAreaInput = ({ input, containerClasses, labelName, Type, disabled, CHARACTER_LIMIT, meta: { touched, error, }}) => (
//   <>
//     <div className="form-group">
//       <TextField id="outlined-multiline-static" inputProps={{
//         maxLength: CHARACTER_LIMIT
//       }}
//         helperText={`${input.value.length}/${CHARACTER_LIMIT}`}
//         {...input} fullWidth label={labelName} multiline rows={4} className="character-counter" />
//       <div className="input-error">
//         {(touched && error) && <span className="mb-0 text-right text-danger" >{error}</span>}
//       </div>
//     </div>
//   </>
// )

// export const renderTextAreaSingle = ({ input, containerClasses, labelName, Type, disabled, meta: { touched, error, }}) => (
//   <>
//     <div className="form-group">
//       <TextField id="outlined-multiline-static" {...input} fullWidth label={labelName} multiline rows={1} className="character-counter" variant="standard" />
//       <div className="input-error">
//         {(touched && error) && <span className="mb-0 text-right text-danger" >{error}</span>}
//       </div>
//     </div>

//   </>
// )

// function DateIcon(props) {
//   return (
//     <img src={toAbsoluteUrl("/images/calendar-icon.svg")} alt=""{...props} />
//   );
// }

// export const renderDateInput = ({ input, labelName, startDate, disabled, meta: { touched, error, warning } }) => {
//   return (
//     <>
//       <LocalizationProvider dateAdapter={AdapterDateFns} >
//         <div className='col-md-6'>

//           <DatePicker {...input} minDate={labelName === "End Date" ? new Date(startDate) : new Date()} /*minDate={new Date()}*/
//             label={labelName} disabled={disabled}
//             inputFormat="dd MMMM yyyy"
//             components={{ OpenPickerIcon: DateIcon }}
//             onChange={(newValue) => { input.onChange(newValue); }}
//             renderInput={(params) => <TextField variant="standard" {...params} helperText={params?.input?.placeholder} />}
//           />
//           <div className="input-error">
//             {(touched && error) && <span className="mb-0 text-right text-danger" >{error}</span>}
//           </div>
//         </div>
//       </LocalizationProvider>
//     </>
//   )
// }

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//     },
//   },
// };

// export const renderSelect = ({ input, labelName, className, selectMap, meta: { touched, error } }) => {
//   return (
//     <>
//       <div className={className}>
//         <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
//           <InputLabel id="demo-multiple-name-label">{labelName}</InputLabel>
//           <Select
//             {...input}
//             onChange={input.onChange}
//             labelId="demo-multiple-name-label"
//             id="demo-multiple-name"
//             MenuProps={MenuProps}
//             label={labelName} variant="standard" IconComponent={() => (<KeyboardArrowDownIcon />)}>
//             {selectMap?.length > 0 && selectMap?.map((data, i) => {
//               return (
//                 <MenuItem className={labelName === "Activity" ? "select-width-img" : ""} key={i} value={data.value}>{data.label}</MenuItem>
//               )
//             })}
//           </Select>
//         </FormControl>
//         <div className="text-error text-danger">
//           {(touched && error) && error}
//         </div>
//       </div>
//     </>
//   )
// }

// export const renderReactSelectMulti = ({ input, selectMap, className, labelName, disabled, meta: { touched, error } }) => {
//   return (
//     <>
//       <div className={className}>
//         <FormControl variant="standard">
//           <InputLabel id="demo-simple-select-standard-label">{labelName}</InputLabel>
//           <SelectMulti labelId="demo-simple-select-standard-label" id="demo-simple-select-standard"
//             {...input}
//             options={selectMap.length > 0 && selectMap}
//             className='mui-contact-num'
//             color={'#405a8b'}
//             isSearchable={true}
//             isDisabled={disabled}
//             onBlur={() => input.onBlur()}
//             onFocus={() => input.onFocus()}
//             onChange={(value) => { input.onChange(value) }}
//             noOptionsMessage={({ inputValue }) => !inputValue ? "All Selected" : "No results found"}
//           />
//           {(touched && error) && <h6 className="mb-0" style={{ color: 'red', width: '100%' }} >{error}</h6>}
//         </FormControl>
//       </div>
//     </>
//   );
// };

// export const renderSelectSearch = ({ input, labelName, selectMap, meta: { touched, error } }) => {
//   return (
//     <>
//       <div className="render-contry-select">
//         <Autocomplete
//           // multiple
//           {...input}
//           id="country-select-demo"
//           sx={{ width: 300 }}
//           options={selectMap}
//           autoHighlight
//           getOptionLabel={(option) => option.value || ""}
//           onChange={(event, value) => { input.onChange(value) }}
//           onBlur={() => input.onBlur()}
//           onFocus={() => input.onFocus()}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label={labelName}
//               variant="standard"
//               inputProps={{
//                 ...params.inputProps,
//                 autoComplete: 'new-password', // disable autocomplete and autofill
//               }}
//             />
//           )}
//         />
//         <div className="text-error text-danger">
//           {(touched && error) && error}
//         </div>
//       </div>
//     </>
//   )
// }
