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

const HomeChartSeverity = () => {
  const chartId = "severity-donut";

  const [state] = useState({
    series: [17.4, 41.4, 25.7, 15.5],
    options: {
      chart: {
        id: chartId,
        type: "donut",
      },
      colors: ["#D17CE4", "#B95CCE", "#A649BB", "#8A2F9F"],
      labels: ["최경도", "경도", "중등도", "중증"],
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
                label: "중증도별",
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

export default HomeChartSeverity;
