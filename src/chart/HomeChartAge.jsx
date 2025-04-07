import ApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ApexCharts from "apexcharts";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(100px, 15vw, 250px);
  height: clamp(100px, 15vw, 250px);
`;

const HomeChartAge = () => {
  const chartId = "age-donut";

  const [state] = useState({
    series: [2.55, 4.52, 8.52, 19.24, 27.13, 38.04],
    options: {
      chart: {
        id: chartId,
        type: "donut",
      },
      colors: ["#99F4BA", "#6DDF97", "#58D184", "#45B76F", "#34A35C", "#1C8041"],
      labels: ["60-64세", "65-69세", "70-74세", "75-79세", "80-84세", "85세 이상"],
      plotOptions: {
        pie: {
          donut: {
            size: "50%",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "clamp(10px, 1.5vw, 18px)",
                fontWeight: "bold",
                offsetY: 0,
              },
              value: {
                show: true,
                fontSize: "clamp(10px, 1.5vw, 18px)",
                offsetY: 2,
              },
              total: {
                show: true,
                label: "연령도별",
                fontSize: "clamp(10px, 1.5vw, 18px)",
                fontWeight: "bold",
                color: "#000000",
              },
            },
          },
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        show: false,
      },
    },
  });

  useEffect(() => {
    const handleResize = () => {
      ApexCharts.exec(chartId, "updateOptions", {
        chart: {
          width: "100%",
          height: "100%",
        },
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Wrapper>
      <ApexChart
        options={state.options}
        series={state.series}
        type="donut"
        width="100%"
        height="100%"
      />
    </Wrapper>
  );
};

export default HomeChartAge;
