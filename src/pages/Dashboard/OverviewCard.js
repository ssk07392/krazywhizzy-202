import React from "react";
import { Graph } from "../../svg";
import './OverviewCard.scss'


const OverviewCard = (props) => {

  return (
    <>
      <div className="overview-card">
        <div className="card-inner">
          <div className="d-flex-center-between mar-bottom-20">
            <div className="card-icon">{props.cardIcon}</div>
            <div className="graph-icon"><Graph /></div>
          </div>
          <h6 className="card-heading">{props.cardHeading}</h6>
          <h3 className="card-view">{props.averageView}</h3>
        </div>
      </div>
    </>
  );
};

export default OverviewCard;
