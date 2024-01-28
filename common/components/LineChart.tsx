import React from "react";
import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

type SeriesType = {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
};

const LineChart = ({ data }: { data: SeriesType[] }) => {
  const series = useMemo(() => {
    return [
      {
        data: data.map((v) => v.Close),
      },
    ];
  }, [data]);
  
  const options = useMemo(() => {
    const options: any = {
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
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      yaxis: [
        {
          labels: {
            formatter: function(val:number) {
              return val.toFixed(0);
            }
          }
        }
      ],
      xaxis: {
        type: 'datetime',
        categories: data.map((v) => v.Date),
        labels: {
          datetimeFormatter: {
            year: "yyyy",
            month: "MM 'yy",
            day: "MM.dd ",
            hour: "HH:mm",
          },
        },
      },
    };

    return options;
  }, [data]);
  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </>
  );
};

export default React.memo(LineChart);
