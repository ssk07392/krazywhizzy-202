import React from "react";
import { Chip, Grid, Stack } from "@mui/material";


const VeiwCard = ({ cardWidth, cardHeadign, cardContent, chipList, chipItem }) => {
  return (
    <>
      <Grid item xs={cardWidth ? cardWidth : 3} className="veiw-card">
        <p className="label">{cardHeadign}</p>
        {cardContent ? <h6 className="content">{cardContent}</h6> : ''}
        {chipList === true ?
          <Stack direction="row" spacing={1} className='chip-row flex-wrap'>
            {chipItem?.map((item, i) => {
              return (
                <Chip variant="outlined" label={item?.name} key={i} />
              )
            })}
          </Stack> : ''
        }   
      </Grid>
    </>
  );
};


export default VeiwCard;
