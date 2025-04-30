// src/components/DementiaTrendsChart.jsx
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

const InformationStatistics = () => {
  // 예시 데이터
  const data = {
    years: ['2015', '2016', '2017','2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    patientCounts: [9267667, 9746591, 10242206, 10765609, 11320069, 11939384, 12575642, 13153957, 13652453, 14132874],
  };

  const chartOptions = {
    chart: {
      type: 'line',
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    title: {
      text: '연도별 치매 환자 수 변화',
      align: 'center',
      style: {
        fontSize: '20px',
      },
    },
    xaxis: {
      categories: data.years,
      title: {
        text: '연도',
      },
    },
    yaxis: {
      title: {
        text: '치매 환자 수 (명)',
      },
      labels: {
        formatter: (val) => val.toLocaleString(), // 숫자 콤마 표시
      },
    },
    stroke: {
      //curve: 'smooth', // 부드러운 곡선
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
      name: '치매 환자 수',
      data: data.patientCounts,
    },
  ];

  return (
    <Wrapper>
      <ReactApexChart options={chartOptions} series={chartSeries} type="line" width="100%" height="100%" />
    </Wrapper>
  );
};

export default InformationStatistics;
