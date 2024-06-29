import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = (props) => {
  const [series, setSeries] = useState([44, 55, 13, 33]);

  const options = {
    chart: {
      width: 380,
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: "bottom",
      offsetY: 0,
    },
  };

  const appendData = () => {
    const arr = [...series, Math.floor(Math.random() * (100 - 1 + 1)) + 1];
    setSeries(arr);
  };

  const removeData = () => {
    if (series.length === 1) return;
    const arr = series.slice(0, -1);
    setSeries(arr);
  };

  const randomize = () => {
    const arr = series.map(() => Math.floor(Math.random() * (100 - 1 + 1)) + 1);
    setSeries(arr);
  };

  const reset = () => {
    setSeries([44, 55, 13, 33]);
  };

  return (
    <div>
      <div>
        <div className="chart-wrap">
          <div id="chart">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              width={380}
            />
          </div>
        </div>
        <div className="actions d-flex gap-2 mt-2">
          <button className="btn btn-outline-primary" onClick={appendData}>
            + ADD
          </button>
          <button className="btn btn-outline-primary" onClick={removeData}>
            - REMOVE
          </button>
          <button className="btn btn-outline-primary" onClick={randomize}>
            RANDOMIZE
          </button>
          <button className="btn btn-outline-primary" onClick={reset}>
            RESET
          </button>
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
