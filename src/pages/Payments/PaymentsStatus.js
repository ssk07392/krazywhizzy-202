import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Modal,
  TextareaAutosize,
  FormControl,
  InputLabel
} from "@mui/material";
import Stack from '@mui/material/Stack';
import { ActionArrow, SearchIcon } from "../../svg";
import { useNavigate, useParams } from "react-router-dom";
import { PaymentListing, paymentUpdate, paymentCreateBucket } from "../../actions/Payment";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

const PaymentsStatus = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [paymentList, setPaymentList] = useState([]);
  const [fiterNumber, setFilterNumber] = useState(0);
  const [selection, setSelection] = useState();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState();

  const cellClickRef = React.useRef(null);
  const [selectionModel, setSelectionModel] = React.useState([]);
  console.log('selectionModel: ', selectionModel);

  useEffect(() => {
    getPaymentList();
  }, [fiterNumber])

  const getPaymentList = () => {
    dispatch(PaymentListing(`?campaignId=${params?.payment}&payoutFilter=${fiterNumber}`))
      .then((res) => {
        if (res.code === 200) {
          setPaymentList(res.data)
          toast.success(res.message);
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }
  // const columns = [
  //   { field: "id", headerName: "Sr No.", width: 80 },
  //   {
  //     field: "brand_logo_url",
  //     headerName: "Brand Logo",
  //     width: 150,
  //     renderCell: (params) => <img src={params.value} alt="" />,
  //     sortable: false,
  //     filterable: false,
  //   },
  //   {
  //     field: "brand_name",
  //     headerName: "Brand Name",
  //     width: 150,
  //   },
  //   {
  //     field: "campaign_title",
  //     headerName: "Campaign Title",
  //     width: 180,
  //   },
  //   {
  //     field: "campaign_price_range",
  //     headerName: "Price Range",
  //     width: 160,
  //   },
  //   {
  //     field: "campaign_description",
  //     headerName: "Category",
  //     width: 110,
  //   },
  //   {
  //     field: "status",
  //     headerName: "Live/ Paused",
  //     width: 110,
  //     align: 'center',
  //     renderCell: () => {
  //       <SparkFill />;
  //     },
  //   },
  // ];

  const columns = [
    {
      field: "payout_request_id",
      headerName: "Sr No.",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "brand_logo_url",
      headerName: "Brand Logo",
      flex: 1.5,
      renderCell: (params) => <img src={params.value} alt="" />,
      sortable: false,
      filterable: false,
    },
    {
      field: "brand_name",
      headerName: "Brand Name",
      flex: 1.5,
      sortable: false,
    },
    {
      field: "creator_name",
      headerName: "Creator Name",
      flex: 1.5,
      sortable: false,
    },
    // {
    //   field: "creator_name",
    //   headerName: "Creator Name",
    //   flex: 1.5,
    // },
    {
      field: "campaign_title",
      headerName: "Campaign Title",
      flex: 1.5,
      sortable: false,
    },
    {
      field: "amount",
      headerName: "Price Range",
      flex: 0.9,
      sortable: false,
    },
    {
      field: "viewApplication",
      // headerName: "View Application",
      headerName: "",
      sortable: false,
      flex: 0.4,
      renderCell: (params, row) => {
        const onClick = (e) => {
          console.log('params, row: ', params, row);
          e.stopPropagation();

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          navigate(`/payments-rejection-reason/${params.row.payout_request_id}`);
        };

        return (
          <IconButton aria-label="fingerprint" onClick={(e) => onClick(e)}>
            <ActionArrow />
          </IconButton>
        );
      },
    },
  ];

  const handleCheckFilter = (item) => {
    setFilterNumber(item)
  }

  const handleCallSatatus = (item) => {
    setOpen(true)
  }

  const updateStatus = (item) => {
    let data;
    if (item === 1) {
      data = {
        payoutStatus: item.toString(),
        // id: selection[0]
        id: selectionModel[0]
      }
      setFilterNumber(1);
    } else {
      data = {
        payoutStatus: item.toString(),
        id: selectionModel[0],
        note: note
      }
      setFilterNumber(2);
      setOpen(false)
    }
    dispatch(paymentUpdate(data))
      .then((res) => {
        if (res.code === 200) {
          toast.success(res.message);
          // getPaymentList();
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  const addBucket = () => {
    const data = {
      payoutIds: [selectionModel[0].toString()],
      campaignId: parseInt(params?.payment)
    }
    dispatch(paymentCreateBucket(data))
      .then((res) => {
        if (res.code === 200) {
          toast.success(res.message);
          getPaymentList();
          navigate('/backet-list')
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  const handleClose = () => setOpen(false);

  console.log("selection", selection, note);

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
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => <TextField
                  {...params}
                  label=""
                  placeholder="Search for campaign"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
                }
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
          <Stack direction="row" spacing={2} className="pending-btn-row">
            <Button variant="contained" className="filter-btn pending" onClick={() => handleCheckFilter(0)}>Pending</Button>
            <Button variant="contained" className="filter-btn approved" onClick={() => handleCheckFilter(1)} >Approved</Button>
            <Button variant="contained" className="filter-btn rejected" onClick={() => handleCheckFilter(2)}>Rejected</Button>
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Stack direction="row" justifyContent="flex-end" spacing={2} className="filter-row">
            {fiterNumber === 0 ?
              <>
                <Button variant="contained" className="filter-btn" onClick={() => handleCallSatatus(2)}>Reject</Button>
                <Button variant="contained" className="filter-btn active" onClick={() => updateStatus(1)}>Approve</Button>
              </>
              : fiterNumber === 1 ?
                <Button variant="contained" className="filter-btn active" onClick={addBucket}>Add to Bucket</Button>
                :
                <Button variant="contained" className="filter-btn active">Export Excel</Button>
            }
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ height: 632, width: "auto" }}>
        <DataGrid
          rows={paymentList}
          columns={columns}
          getRowId={(row) => row?.payout_request_id}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableColumnMenu
          // onSelectionModelChange={(newSelection) => {
          //   console.log("newSelection", newSelection);
          // }}
          selectionModel={selectionModel}
          onCellClick={() => (cellClickRef.current = true)}
          onSelectionModelChange={(selection, detail) => {
            if (cellClickRef.current) {
              if (selection.length > 1) {
                const selectionSet = new Set(selectionModel);
                const result = selection.filter((s) => !selectionSet.has(s));
                setSelectionModel(result);
                setSelection(result);
              } else {
                setSelectionModel(selection);
              }
            }
            //  else {
            //   setSelectionModel(selection);
            // }
            cellClickRef.current = null;
          }}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <InputLabel
            id="demo-simple-select-label"
            className="extra-label bold"
            required
          >
            Price Range
          </InputLabel>
          <FormControl variant="filled">
            <TextField
              id="filled-multiline-static"
              placeholder="Enter your reason for rejection"
              multiline
              minRows={4}
              variant="filled"
              name="campaign_guidelines"
              // value={campaign_guidelines}
              onChange={(e) => setNote(e.target.value)}
            />
          </FormControl>
          {/* <Button onClick={() => updateStatus(2)}>Submit</Button> */}
          <div className="d-flex-center-end">
            <Button variant="contained" className="delete-contained mar-top-20-imp" onClick={() => updateStatus(2)}>Reject</Button>
          </div>
        </Box>
      </Modal>
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
];


export default PaymentsStatus;
