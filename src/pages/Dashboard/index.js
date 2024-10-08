import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Grid, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CreatorsListing } from '../../actions/creators';
import { ActionArrow, SearchIcon } from '../../svg';


const Dashboard = () => {

	const dispatch = useDispatch();
	const [creatorsList, setCreatorsList] = useState([])
	const [search, setSearched] = useState("")

	const columns = [
		{
			field: "id",
			headerName: "Sr No.",
			flex: 0.7,
			sortable:false
		},
		{
			field: "name",
			headerName: "Creator Name",
			flex: 1.4,
			sortable:false,
			renderCell: (params) => params.value ? params.value : '-'
		},
		{
			field: "campaign_followers_range",
			headerName: "Followers",
			flex: 1,
			sortable:false,
			renderCell: (params) => params.value ? params.value : '-'
		},
		{
			field: "address",
			headerName: "State",
			flex: 1.4,
			sortable:false,
			renderCell: (params) => params.value ? params.value : '-'
		},
		{
			field: "phone_number",
			headerName: "Contact",
			flex: 1.2,
			sortable:false,
			renderCell: (params) => params.value ? params.value : '-'
		},
		{
			field: "action",
			headerName: "",
			align: "right",
			flex: 0.3,
			sortable:false,
			renderCell: (params) => {
				return (
					<IconButton aria-label="fingerprint">
						<ActionArrow />
					</IconButton>
				);
			},
		},
	];

	const getAllCreatorsListing = () => {
		dispatch(CreatorsListing())
			.then((res) => {
				console.log("response -----> ", res.data)
				toast.success(res.message);
				setCreatorsList(res.data);
			})
			.catch((err) => {
				toast.success(err);
			});
	};

	useEffect(() => {
		getAllCreatorsListing()
	}, [])

	const onMutate = (e, value) => {
		setSearched(value);
	};
	useEffect(() => {
		if (search !== null || search !== "" || search !== undefined) {
		  if (search === null) {
			getAllCreatorsListing();
		  } else {
			setCreatorsList(
			  creatorsList.filter((column) => search.includes(column.name))
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
					<Grid item xs={9}>
						<Stack spacing={2} sx={{ width: 630 }}>
							<Autocomplete
								id="free-solo-demo"
								freeSolo
								size="small"
								options={creatorsList.map((option) => option.name)}
								onChange={(e, value) => onMutate(e, value)}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="Search for campaign"
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
				</Grid>
			</div>
			<Box sx={{ height: 632, width: "auto" }}>
				<DataGrid
					rows={creatorsList}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[5]}
					disableColumnMenu
				// checkboxSelection
				/>
			</Box>
		</>
	);
}

export default Dashboard;