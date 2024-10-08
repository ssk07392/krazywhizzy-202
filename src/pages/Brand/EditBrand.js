import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Divider,
  FilledInput,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { EditPen, SparkFill, SparkOutline } from "../../svg";
import UploadHere from "../../components/UploadFile";
import { useDispatch } from "react-redux";
import { AddBrand, EditBrandDetails, fetchBrand } from "../../actions/brands";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesListing } from "../../actions/campaign";
import "./Brand.scss";

const defaultFormField = {
  brand_name: "",
  website: "",
  poc_name: "",
  poc_email: "",
  poc_number: "",
  brand_description: "",
  status: 1,
};

const EditBrand = () => {
  const [formField, setFormField] = useState(defaultFormField);
  const [fileupload, setFileupload] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [multiSelect, setMultiSelect] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const handleSelect = (e) => {
    const {
      target: { value },
    } = e;
    setMultiSelect(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const {
    brand_name,
    brand_description,
    poc_email,
    poc_name,
    poc_number,
    website,
    status,
  } = formField;

  const [brandNameError, setBrandNameError] = useState(false);
  const [brandDescriptionError, setBrandDescriptionError] = useState(false);
  const [websiteError, setWebsiteError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [categoriesError, setCategoriesError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fetchCategory = () => {
    dispatch(CategoriesListing())
      .then((res) => {
        if (res.code === 200) {
          setCategoriesList(res.data);
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const fetchBrandDetailThroughId = () => {
    dispatch(fetchBrand(`?brand_id=${params.brandId}`))
      .then((res) => {
        if (res.code === 200) {
          setFormField(() => ({
            brand_name: res.data.brand_name,
            brand_description: res.data.brand_description,
            poc_name: res.data.poc_name,
            poc_email: res.data.poc_email,
            poc_number: res.data.poc_phone,
            website: res.data.website_url,
            status: res.data.status,
          }));
          setImageUrl(res.data.brand_logo_url);
          setMultiSelect(
            res.data.categories ? JSON.parse(res.data.categories) : []
          );
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  useEffect(() => {
    if (params.brandId) {
      fetchBrandDetailThroughId();
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, []);

  const onMutate = (e) => {
    const { value, name } = e.target;
    setFormField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFinish = (e) => {
    e.preventDefault();
    setBrandNameError(false);
    setBrandDescriptionError(false);
    setWebsiteError(false);
    setNameError(false);
    setEmailError(false);
    setContactError(false);
    setCategoriesError(false);

    if (brand_name === "") {
      return setBrandNameError(true);
    }
    if (brand_description === "") {
      return setBrandDescriptionError(true);
    }
    if (website === "") {
      return setWebsiteError(true);
    }
    if (poc_name === "") {
      return setNameError(true);
    }
    if (poc_email === "") {
      return setEmailError(true);
    }
    if (poc_number === "") {
      return setContactError(true);
    }
    if (multiSelect.length <= 0) {
      return setCategoriesError(true);
    }

    if (fileupload === undefined && imageUrl === "") {
      return setImageError(true);
    }

    console.log("multiSelect", multiSelect);
    const formData = new FormData();

    formData.append("brand_name", brand_name);
    formData.append("brand_description", brand_description);
    formData.append("poc_phone", parseInt(poc_number));

    formData.append("poc_email", poc_email);
    formData.append("poc_name", poc_name);
    formData.append("website_url", website);
    formData.append("categories", JSON.stringify(multiSelect));
    formData.append("status", status);
    fileupload && formData.append("brand_logo_url", fileupload);

    if (params.brandId) {
      formData.append("brand_id", params.brandId);
      dispatch(EditBrandDetails(formData))
        .then((res) => {
          if (res.code === 200) {
            toast.success(res.message);
            navigate("/brands");
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      dispatch(AddBrand(formData))
        .then((res) => {
          if (res.code === 201) {
            toast.success(res.message);
            navigate("/brands");
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const handleStatus = (e, value) => {
    setFormField((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  const UploadVideo = (e) => {
    setFileupload(e.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageUrl(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Grid item xs={6} style={{ marginTop: "20px" }}>
        <h3 className="page-title">
          {params.brandId ? "Edit Brand" : "Add Brand"}
        </h3>
      </Grid>
      <Grid
        container
        direction="row-reverse"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        className="mar-bottom-40"
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="end"
          alignItems="center"
          xs={6}
          textAlign="right"
        >
          <Typography
            variant="button"
            display="block"
            style={{ margin: "0 10px 0 0" }}
          >
            Brand Status
          </Typography>
          <ButtonGroup
            className="campaign-status"
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              className={`${status == 1 ? "active" : ""}`}
              onClick={(e) => handleStatus(e, 1)}
            >
              <SparkFill />
            </Button>
            <Button
              className={`${status == 2 ? "active" : ""}`}
              onClick={(e) => handleStatus(e, 2)}
            >
              <SparkOutline />
            </Button>
            {/* <Button className={`${status == 3 ? 'active' : ''}`} onClick={(e) => handleStatus(e, 3)}>
              <RightStatus
                
              />
            </Button> */}
          </ButtonGroup>
          {/* <Button variant="outlined" className="delete-outline mar-left-20">
            <DeleteRed />
            &nbsp;&nbsp;Delete Brand
          </Button> */}
        </Grid>
      </Grid>
      <div className="border-paper">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          className="mar-bottom-40"
        >
          <Grid item xs={4}>
            {/* <UploadHere
              uploadLabel="Brand Logo"
              uploadText=""
              uploadBtn={<EditPen />}
              uplaodWidth={164}
              uplaodHeight={48}
              setFileupload={setFileupload}
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              sideButton={true}
            /> */}
            <div className="uplaod-ui" style={{ width: 290, height: 250 }}>
              <Button
                variant="contained"
                component="label"
                className="upload-video "
              >
                {(imageUrl || fileupload) ? (
                  <img src={imageUrl} alt="" />
                ) : (
                  <>
                    <span className="upload-plus-btn">+</span>
                    <input
                      type="file"
                      name="video"
                      id="video"
                      onChange={(e) => {
                        UploadVideo(e);
                      }}
                      accept="*"
                      multiple
                      required
                    />
                  </>
                )}
              </Button>
            </div>
            {imageError && (
              <p style={{ color: "red", marginTop: "5px" }}>
                Brand Image is required
              </p>
            )}
          </Grid>
          <Grid item xs={4}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              required
              error={brandNameError}
            >
              Brand Name
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-basic"
                placeholder="Brand Name"
                variant="filled"
                size="small"
                name="brand_name"
                type="text"
                value={brand_name}
                onChange={onMutate}
                autoComplete={false}
              />
              {brandNameError && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  Brand Name is required
                </p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              error={brandDescriptionError}
              required
            >
              Brand Description
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-basic"
                placeholder="Brand Description"
                variant="filled"
                size="small"
                type="textarea"
                name="brand_description"
                value={brand_description}
                onChange={onMutate}
              />
              {brandDescriptionError && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  Brand Description is required
                </p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              error={websiteError}
              required
            >
              Website
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-basic"
                placeholder="Website"
                variant="filled"
                size="small"
                type="text"
                name="website"
                value={website}
                onChange={onMutate}
              />
              {websiteError && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  Website is required
                </p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              error={categoriesError}
              required
            >
              Categories
            </InputLabel>
            <FormControl variant="filled" sx={{ m: 1, maxWidth: 400 }}>
              <Select
                id="custom-select"
                multiple
                displayEmpty
                value={multiSelect}
                onChange={handleSelect}
                input={<FilledInput label="Tag" />}
                // renderValue={(value) =>
                //   value.map((obj) => categoriesList[obj - 1].name).join(", ")
                // }
              >
                <MenuItem disabled value="">
                  <em>Categories</em>
                </MenuItem>
                {categoriesList?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {categoriesError && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  Categorie is required
                </p>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Divider className="divide-mar-40--40" />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={4}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              error={nameError}
              required
            >
              POC Name
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-basic"
                placeholder="POC Name"
                variant="filled"
                size="small"
                type="text"
                name="poc_name"
                value={poc_name}
                onChange={onMutate}
              />
              {nameError && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  POC Name is required
                </p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              error={emailError}
              required
            >
              POC Email
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-basic"
                placeholder="POC Email"
                variant="filled"
                size="small"
                type="email"
                name="poc_email"
                value={poc_email}
                onChange={onMutate}
              />
              {emailError && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  POC Email is required
                </p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <InputLabel
              id="demo-simple-select-label"
              className="extra-label"
              error={contactError}
              required
            >
              POC Contact Number
            </InputLabel>
            <FormControl variant="filled">
              <TextField
                id="filled-basic"
                placeholder="POC Contact Number"
                variant="filled"
                size="small"
                type="text"
                name="poc_number"
                value={poc_number}
                onChange={onMutate}
              />
              {contactError && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  Contact is required
                </p>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <div className="btn-row reverse mar-top-20">
        <Button
          variant="contained"
          className="min-width-180-img"
          type="submit"
          onClick={onFinish}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default EditBrand;
