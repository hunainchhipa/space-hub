import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ColumnChart = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: props.y1Label,
        data: props.y1Data,
      },
      {
        name: props.y2Label,
        data: props.y2Data,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "65%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: props.xData,
      },
      yaxis: {
        title: {
          text: props.yTitle,
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  });

  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </>
  );
};

export default ColumnChart;
