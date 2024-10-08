import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Industrial Average", "Influencer Average"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

export const options = {
  isStacked: true,
  height: 300,
  legend: { position: "top", maxLines: 2 },
  vAxis: { minValue: 0 },
};

const ChartGrowthRate = () => {

  return (
    <>
      <Chart
        chartType="AreaChart"
        width="320px"
        height="280px"
        data={data}
        options={options}
      />
    </>
  );
};

export default ChartGrowthRate;