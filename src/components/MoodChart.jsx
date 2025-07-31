import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const moodToScore = {
  'Happy': 5,
  'Content': 4,
  'Neutral': 3,
  'Stressed': 2,
  'Sad': 1,
  'Angry': 0,
};

const chartTitleStyle = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 8,
};

const chartContainerStyle = {
  background: '#f3f4f6',
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
  border: '1px solid #e5e7eb',
};

const MoodChart = ({ moodData }) => {
  const sortedDates = Object.keys(moodData).sort();
  const labels = sortedDates;
  const dataPoints = sortedDates.map((date) => moodToScore[moodData[date]]);

  return (
    <div style={chartContainerStyle}>
      <div style={chartTitleStyle}>Mood Trends</div>
      <Line
        data={{
          labels: labels.length ? labels : ['No data'],
          datasets: [
            {
              label: 'Mood Level',
              data: labels.length ? dataPoints : [0],
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: 'rgba(75,192,192,1)',
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 5,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default MoodChart;
