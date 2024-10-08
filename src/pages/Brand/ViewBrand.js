import React, { useEffect, useState } from "react";
import { Button, Chip, Divider, Grid } from "@mui/material";
import { DeleteRed, WhitePen } from "../../svg";
import { toAbsoluteUrl } from "../../utils";
import { Stack } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBrand, fetchBrand } from "../../actions/brands";
import { toast } from "react-toastify";
import "./Brand.scss";

const ViewBrand = () => {
  const [viewBrand, setViewBrand] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchBrandDetailThroughId = () => {
    dispatch(fetchBrand(`?brand_id=${params.brandId}`))
      .then((res) => {
        if (res.code === 200) {
          setViewBrand(res.data);
          toast.success(res.message);
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  useEffect(() => {
    fetchBrandDetailThroughId();
  }, []);

  const handleDelete = () => {
    dispatch(deleteBrand(params.brandId))
      .then((res) => {
        if (res.code === 200) {
          setViewBrand({});
          navigate("/brands");
          toast.success(res.message);
        } else {
          toast.error("error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  const handleRedirect = () => {
    navigate(`/edit-brand/${params.brandId}`)
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        className="mar-bottom-40"
      >
        <Grid item xs={6}>
          <h3 className="page-title">
            <div className="brand-logo">
              <img
                src={
                  viewBrand.brand_logo_url !== ""
                    ? viewBrand.brand_logo_url
                    : toAbsoluteUrl(
                        "/images/brand_logo/nykaa-removebg-preview.png"
                      )
                }
                alt=""
              />
            </div>
            {viewBrand.brand_name ? viewBrand.brand_name : "--"}
          </h3>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="end"
          alignItems="center"
          xs={6}
          textAlign="right"
        >
          <Button variant="outlined" className="delete-outline" onClick={handleDelete}>
            <DeleteRed svgFill="#B71C1C" />
            &nbsp;&nbsp;Delete Brand
          </Button>
          <Button variant="contained" onClick={handleRedirect}>
            <WhitePen />
            &nbsp;&nbsp;Edit Brand
          </Button>
        </Grid>
      </Grid>
      <div className="border-paper">
        <Grid container spacing={2} className="mar-bottom-40">
          <Grid item xs={6}>
            <span className="extra-label w-100">Description</span>
            <p className="description">
              {viewBrand.brand_description ? viewBrand.brand_description : "--"}
            </p>
          </Grid>
          <Grid item xs={3}>
            <span className="extra-label w-100">Website</span>
            <p className="description">
              <b>www.google.com</b>
            </p>
          </Grid>
          <Grid item xs={3}>
            <span className="extra-label w-100">Category</span>
            <Stack direction="row" spacing={1} className="chip-row flex-wrap">
              {viewBrand.categoriesArrayList
                ? viewBrand.categoriesArrayList.map((item, i) => (
                    <Chip key={i} label={`${item.name}`} variant="outlined" />
                  ))
                : "--"}
            </Stack>
          </Grid>
        </Grid>
        <Divider className="divide-mar-40--40" />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <span className="extra-label w-100">POC Name</span>
            <p className="description">
              <b>{viewBrand.poc_name ? viewBrand.poc_name : "--"}</b>
            </p>
          </Grid>
          <Grid item xs={4}>
            <span className="extra-label w-100">POC Email</span>
            <p className="description">
              <b>{viewBrand.poc_email ? viewBrand.poc_email : "--"}</b>
            </p>
          </Grid>
          <Grid item xs={4}>
            <span className="extra-label w-100">POC Contact Number</span>
            <p className="description">
              <b>{viewBrand.poc_phone ? viewBrand.poc_phone : "--"}</b>
            </p>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ViewBrand;
