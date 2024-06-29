import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: props.name,
        data: props.data,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: props.title,
        align: "left",
      },
      grid: {
        row: {
          colors: props.colors, // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: props.xData,
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default LineChart;
