import React from "react";
import { Chip, Grid, Stack } from "@mui/material";
import { toAbsoluteUrl } from "../../utils";
import { Link } from "react-router-dom";


const KycCard = ({ cardWidth, cardHeadign, cardContent, chipList, chipItem, SocialIcon, SocialIconList }) => {

  return (
    <>
      <Grid item xs={cardWidth ? cardWidth : 3} className="veiw-card">
        <p className="label">{cardHeadign}</p>
        {cardContent ? <h6 className="content">{cardContent}</h6> : ''}
        {chipList === true ?
          <Stack direction="row" spacing={1} className='chip-row flex-wrap'>
            {chipItem.map((item, i) => {
              return (
                <Chip variant="outlined" label={item.name} key={i} />
              )
            })}
          </Stack> : ''
        }
        {SocialIcon === true ? <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} className='flex-wrap'>
          {SocialIconList.map((icon, i) => {
            return (
              <Link to=""><img src={toAbsoluteUrl(`/images/${icon}.svg`)} alt="" /></Link>
            )
          })}
        </Stack> : ''}
      </Grid>
    </>
  );
};

export default KycCard;
