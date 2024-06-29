import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const generateData = (baseval, count, yrange) => {
  let i = 0;
  let series = [];
  while (i < count) {
    let x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
    let y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    let z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push([x, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
};

const BubbleChart = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "bubble",
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 0.8,
    },
    title: {
      text: "Bubble Chart",
    },
    xaxis: {
      tickAmount: 12,
      type: "category",
    },
    yaxis: {
      max: 70,
    },
  });

  useEffect(() => {
    const generateSeriesData = () => {
      const baseTime = new Date("11 Feb 2017 GMT").getTime();
      setSeries([
        {
          name: "Bubble1",
          data: generateData(baseTime, 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: "Bubble2",
          data: generateData(baseTime, 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: "Bubble3",
          data: generateData(baseTime, 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: "Bubble4",
          data: generateData(baseTime, 20, {
            min: 10,
            max: 60,
          }),
        },
      ]);
    };

    generateSeriesData();
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bubble"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default BubbleChart;
