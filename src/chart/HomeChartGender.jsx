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

const HomeChartGender = () => {
  const chartId = "gender-donut";

  const [state] = useState({
    series: [60.72, 39.28],
    options: {
      chart: {
        id: chartId,
        type: "donut",
      },
      colors: ["#E43939", "#4839E4"],
      labels: ["여성", "남성"],
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
                label: "성별",
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

export default HomeChartGender;
