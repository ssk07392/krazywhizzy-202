import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Men", 11],
  ["Women", 2],
];

export const options = {
  pieHole: 0.4,
  is3D: false,
  legend: { position: "bottom", maxLines: 2 },
  colors: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600']
};

const GenderDiversity = () => {

  return (
    <>
      <Chart
        chartType="PieChart"
        width="100%"
        height="280px"
        data={data}
        options={options}
      />
    </>
  );
};

export default GenderDiversity;
