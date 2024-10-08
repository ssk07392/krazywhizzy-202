import React, { useEffect, useState } from "react";
import { Divider, Grid, Chip, Avatar } from "@mui/material";
import VeiwCard from "./VeiwCard";
import { KycStatus } from "../../svg";
import { toAbsoluteUrl } from "../../utils";
import { creatorsVerify, fetchCreator } from "../../actions/creators";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


const ViewCreator = () => {
  const [creatorDetail, setCreatorDetail] = useState();
  const [panCardflag, setPanCardFlag] = useState();
  const [adharCardflag, setAdharCardFlag] = useState();
  const [pashbookflag, setPashbookFlag] = useState();
  const dispatch = useDispatch();
  const params = useParams();

  const fetchCreatorDetailThroughId = () => {
    dispatch(fetchCreator(`?creator_id=${params.creatorId}`))
      .then((res) => {
        console.log(res)
        if (res.code === 200) {
          setCreatorDetail(res.data);
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
    fetchCreatorDetailThroughId();

  }, []);

  const handleClick = (item, name) => {
    if (item !== 1) {
      let data;
      if(name === "pan_card_verification"){
        data = {
            creator_id: parseInt(params.creatorId),
            pan_card_verification: "1",
          }
      }
      if(name === "adhar_verification"){
        data = {
            creator_id: parseInt(params.creatorId),
            adhar_verification: "1"
          }
      }
      if(name === "passbook_verification"){
        data = {
            creator_id: parseInt(params.creatorId),
            passbook_verification: "1"
          }
      }

      dispatch(creatorsVerify(data))
        .then((res) => {
          console.log(res)
          if (res.code === 200) {
            console.log("res000", res)
            if(name === "pan_card_verification"){
              setPanCardFlag(1);
            }
            if(name === "adhar_verification"){
              setAdharCardFlag(1);
            }
            if(name === "passbook_verification"){
              setPashbookFlag(1);
            }
            setCreatorDetail(res.data);
            toast.success(res.message);
          } else {
            toast.error("error");
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  }


  // console.log(creatorDetail)
  return (
    <>
      <div className="avtar-header">
        <div className="avtar-info">
          <Avatar alt="Remy Sharp" src={ creatorDetail ? creatorDetail : toAbsoluteUrl('/images/profile_place.jpg')} sx={{ width: 78, height: 78 }} />
          <h4 className="user-name">{creatorDetail ? creatorDetail.name : '-'}</h4>
        </div>
      </div>
      <div className='border-paper'>
        <Grid container direction="row" spacing={2} className='mar-bottom-40'>
          <VeiwCard
            cardHeadign="Followers"
            cardContent={creatorDetail ? creatorDetail.campaign_followers_range : '-'}
          />
          <VeiwCard
            cardHeadign="Contact Number"
            cardContent={creatorDetail ? '+'.concat('', creatorDetail.phone_number) : '-'}
          />
          <VeiwCard
            cardHeadign="Email"
            cardContent={creatorDetail ? creatorDetail.email : '-'}
          />
          <VeiwCard
            cardHeadign="Category"
            chipList
            chipItem={creatorDetail ? creatorDetail.categoriesArrayList : []}
          />
          <VeiwCard
            cardHeadign="Address"
            cardContent={creatorDetail ? creatorDetail.address : '-'}
          />
          <VeiwCard
            cardHeadign="City"
            cardContent="Pune"
          />
          <VeiwCard
            cardHeadign="State"
            cardContent="Maharashtra"
          />
          <VeiwCard
            cardHeadign="Gender"
            cardContent={creatorDetail ? creatorDetail.gender : '-'}
          />
          <VeiwCard
            cardHeadign="Language"
            cardContent={creatorDetail ? creatorDetail.language : '-'}
          />
          <VeiwCard
            cardHeadign="Genre"
            cardContent={creatorDetail ? creatorDetail.genre : '-'}
          />
          <VeiwCard
            cardHeadign="Sub-Genre"
            cardContent={creatorDetail ? creatorDetail.sub_genre : '-'}
          />
        </Grid>
        <Divider className='divide-mar-40--40' />
        <Grid container direction="row" spacing={2} className='mar-bottom-40'>
        {[
            {
              name: 'Aadhar Card',
              value: creatorDetail?.is_adhar_verified
            }, 
            {
              name: 'Bank Detials',
              value: creatorDetail?.is_bank_detail_verified}, 
            {
              name: 'Pan Card',
              value: creatorDetail?.is_pan_card_verified}, 
            {
              name: 'Passbook Verified',
              value: creatorDetail?.is_passbook_verified
            }].map((text, i) => (
            <Grid item xs={6} key={i}>
              <KycStatus svgFill={text.value === '1' || text.value === 1 ? 'green' : 'red'} /> &nbsp;&nbsp;&nbsp;{text.name}
            </Grid>
          ))}
        </Grid>
        <Divider className='divide-mar-40--40' />
        <Grid container direction="row" spacing={2} className='mar-bottom-40'>
          <Grid item xs={6} className="veiw-card">
            <p className="label">Aadhar Card</p>
            <figure className='view-doc d-flex-start-start'>
            <img src={creatorDetail ? creatorDetail?.adhar_front_url : toAbsoluteUrl("/images/view-doc.png")} alt="" />
              <img src={creatorDetail ? creatorDetail?.adhar_back_url : toAbsoluteUrl("/images/view-doc.png")} alt="" />
            </figure>
            <Chip icon={<KycStatus svgFill='#1B5E20' />} label={`${(creatorDetail?.is_adhar_verified == 1) || (adharCardflag == 1) ? 'Verified' : 'Not Verified'}`} variant="outlined" className={`${creatorDetail?.is_adhar_verified == 1 ? 'verified-tag filled' : 'verified-tag'}`} onClick={() => handleClick(creatorDetail?.is_adhar_verified, "adhar_verification")} />
          </Grid>
          <Grid item xs={6} className="veiw-card">
            <p className="label">PAN Card</p>
            <figure className='view-doc d-flex-start-start'>
            <img src={creatorDetail ? creatorDetail?.pan_card_url : ("/images/view-doc.png")} alt="" />
            </figure>
            <Chip icon={<KycStatus svgFill='#1B5E20' />} label={`${(creatorDetail?.is_pan_card_verified == 1) || (panCardflag == 1) ? 'Verified' : 'Not Verified'}`} variant="outlined" className={`${(creatorDetail?.is_pan_card_verified == 1) || (panCardflag == 1) ? 'verified-tag filled' : 'verified-tag'}`} onClick={() => handleClick(creatorDetail?.is_pan_card_verified, "pan_card_verification")} />
          </Grid>
          <Grid item xs={6} className="veiw-card">
            <p className="label">Passbook</p>
            <figure className='view-doc d-flex-start-start'>
            <img src={creatorDetail ? creatorDetail?.passbook_url: toAbsoluteUrl("/images/view-doc.png")} alt="" />
            </figure>
            <Chip icon={<KycStatus svgFill='#1B5E20' />} label={`${(creatorDetail?.is_passbook_verified == 1) || (pashbookflag == 1) ? 'Verified' : 'Not Verified'}`} variant="outlined" className={`${creatorDetail?.is_passbook_verified == 1 ? 'verified-tag filled' : 'verified-tag'}`} onClick={() => handleClick(creatorDetail?.is_passbook_verified, "passbook_verification")} />
          </Grid>
        </Grid>
        <Divider className='divide-mar-40--40' />
        <Grid container direction="row" spacing={2}>
          <VeiwCard
            cardWidth={4}
            cardHeadign="Bank Account Number"
            cardContent={creatorDetail ? creatorDetail.bank_ac_number : '-'}
          />
          <VeiwCard
            cardHeadign="IFSC"
            cardContent={creatorDetail ? creatorDetail.bank_ifsc_code : '-'}
          />
          <VeiwCard
            cardHeadign="Account Holder Name"
            cardContent={creatorDetail ? creatorDetail.bank_ac_holder_name : '-'}
          />
        </Grid>
      </div>
    </>
  );
};

export default ViewCreator;
