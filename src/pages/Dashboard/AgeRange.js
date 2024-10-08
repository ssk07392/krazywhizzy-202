import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["13-17 yrs", 11],
  ["18-24 Yrs", 2],
  ["25-34 Yrs", 2],
  ["35-44 Yrs", 2],
  ["45- 64 Yrs", 2],
];

export const options = {
  pieHole: 0.4,
  is3D: false,
  legend: { position: "bottom", maxLines: 2 },
  colors: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600']
};

const AgeRange = () => {

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

export default AgeRange;
