import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineColumnAreaChart = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: props.columnName,
        type: props.columnChart,
        data: props.yColumnData,
      },
      {
        name: props.areaName,
        type: props.areaChart,
        data: props.yAreaData,
      },
      {
        name: props.lineName,
        type: props.lineChart,
        data: props.yLineData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: props.xLabels,
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: props.yTitle,
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          },
        },
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

export default LineColumnAreaChart;
