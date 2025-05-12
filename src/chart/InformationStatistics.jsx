import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* display: flex; */
  justify-content: center;
  align-items: center;
  width: clamp(400px, 60vw, 1000px);
  height: clamp(400px, 30vw, 1000px);
  margin-top: 10vh;
`;

const chartFieldMap = {
  "dementia-line": "dementia_patients",
  "dementia-female-line": "dementia_patients",
  "dementia-male-line": "dementia_patients",
  "population-line": "population",
  "population-female-line": "population",
  "population-male-line": "population",
  "prevalence-line": "prevalence_rate",
  "prevalence-female-line": "prevalence_rat",
  "prevalence-male-line": "prevalence_rat",
  "mild-cases-line": "mild_cases",
  "mild-cases-female-line": "mild_cases",
  "mild-cases-male-line": "mild_cases",
  "moderate-cases-line": "moderate_cases",
  "moderate-cases-female-line": "moderate_cases",
  "moderate-cases-male-line": "moderate_cases",
  "severe-cases-line": "severe_cases",
  "severe-cases-female-line": "severe_cases",
  "severe-cases-male-line": "severe_cases",
  "mci-patients-line": "mci_patients",
  "mci-patients-female-line": "mci_patients",
  "mci-patients-male-line": "mci_patients",
  "mci-prevalence-line": "mci_prevalence_rate",
  "mci-prevalence-female-line": "mci_prevalence_rate",
  "mci-prevalence-male-line": "mci_prevalence_rate"
};

const InformationStatistics = ({
  year = "2024",
  si = "전국",
  sigungu = "전국",
  gender = "전체",
  chartCode = "dementia-line", 
  chartTitle = "치매 환자 수"
  }) => {
  const [chartData, setChartData] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);
  const targetField = chartFieldMap[chartCode];

  const isRateChart = targetField?.includes("prevalence");

  useEffect(() => {
    if(year) {
      fetchChartData();
    }
  }, [year, si, sigungu, gender, chartTitle]);

  const fetchChartData = async() => {
    try {
      const response = await axios.get("/api/statistics/search", {
        params: {year, si, sigungu, gender, chartTitle},
      });
      const result = response.data;
      if (!targetField) {
        console.error(`매핑되지 않은 chartCode: ${chartCode}`);
        return;
      }


      const groups = result.map((item) => item.agegroup);
      const values = result.map((item) => Number(item[targetField]));

      setAgeGroups(groups);
      setChartData(values);
    } catch(error) {
      console.error("데이터 불러오기 실패: ", error);
    }
  }

  const chartOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
    },
    title: {
      text: chartTitle || "치매 관련 통계",
      align: "center",
      style: {
        fontSize: "20px",
      },
    },
    xaxis: {
      categories: ageGroups,
      title: {
        text: "연령대",
        style: {
          fontSize: "clamp(12px, 1.5vw, 16px)",
        },
      },
    },
    yaxis: {
      title: {
        text: `${chartTitle} (${isRateChart ? "%" : "명"})`,
        style: { fontSize: "clamp(10px, 1vw, 12px)" },
      },
      labels: {
        formatter: (val) =>
          isRateChart ? `${val.toFixed(2)}%` : val.toLocaleString(),
      },
    },
    stroke: {
      width: 3,
    },
    markers: {
      size: 5,
      colors: ['#FF4560'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    colors: ['#008FFB'],
    tooltip: {
      y: {
        formatter: (val) => `${val.toLocaleString()} 명`,
      },
    },
  };

  const chartSeries = [
    {
      name: chartTitle || "치매 관련 통계",
      data: chartData,
    },
  ];

  return (
    <Wrapper>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        width="100%"
        height="100%" />
    </Wrapper>
  );
};

export default InformationStatistics;
