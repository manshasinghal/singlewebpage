import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend as ChartLegend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, ChartLegend);

const moods = [
  { label: 'Happy', emoji: '😊' },
  { label: 'Content', emoji: '🙂' },
  { label: 'Neutral', emoji: '😐' },
  { label: 'Stressed', emoji: '😣' },
  { label: 'Sad', emoji: '😢' },
  { label: 'Angry', emoji: '😡' },
];

const moodToScore = {
  Happy: 5,
  Content: 4,
  Neutral: 3,
  Stressed: 2,
  Sad: 1,
  Angry: 0,
};

const moodLabelMap = {
  5: 'Happy',
  4: 'Content',
  3: 'Neutral',
  2: 'Stressed',
  1: 'Sad',
  0: 'Angry',
};

const emojiMap = {
  5: '😊',
  4: '🙂',
  3: '😐',
  2: '😣',
  1: '😢',
  0: '😡',
};

const dayLabels = ['M', 'T', 'W', 'Th', 'F', 'S'];

export default function App() {
  const [selectedDate, setSelectedDate] = useState(''); 

  const [moodData, setMoodData] = useState(() => {
    return JSON.parse(localStorage.getItem('moodData')) || {}; // m
  });
  const [moodEntries, setMoodEntries] = useState([]);
  const [activeTab, setActiveTab] = useState('Mood');

  useEffect(() => {
    localStorage.setItem('moodData', JSON.stringify(moodData));
  }, [moodData]);

  const handleMoodSelect = (type, moodLabel) => {
    if (!selectedDate) return;

    const emoji = moods.find((m) => m.label === moodLabel)?.emoji || '';
    const updatedData = {
      ...moodData,
      [selectedDate]: {
        ...(moodData[selectedDate] || {}),
        [type]: moodLabel,
      },
    };

    setMoodData(updatedData);

    const entry = {
      title: `${type}: ${moodLabel}`,
      emoji: emoji,
      time: new Date().toLocaleString('en-US', {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
    };

 

    // Replace existing entry of same type and date
    setMoodEntries((prev) => {
      const filtered = prev.filter((e) => !e.title.startsWith(type));
      return [entry, ...filtered];
    });
  };

  const sortedDates = Object.keys(moodData).sort();

  const labels = sortedDates;
  const datasets = [
    {
      label: 'Daily Check-In',
      data: labels.map((d) =>
        moodData[d]?.['Daily Check-In'] ? moodToScore[moodData[d]['Daily Check-In']] : null
      ),
      borderColor: '#f59e42',
      pointBackgroundColor: '#f59e42',
      tension: 0.3,
    },
    {
      label: 'After Meditation',
      data: labels.map((d) =>
        moodData[d]?.['After Meditation'] ? moodToScore[moodData[d]['After Meditation']] : null
      ),
      borderColor: '#3b82f6',
      pointBackgroundColor: '#3b82f6',
      tension: 0.3,
    },
    {
      label: 'After Workout',
      data: labels.map((d) =>
        moodData[d]?.['After Workout'] ? moodToScore[moodData[d]['After Workout']] : null
      ),
      borderColor: '#22c55e',
      pointBackgroundColor: '#22c55e',
      tension: 0.3,
    },
  ];

  return (
    <div className="justify-center bg-gray-200 mx-auto font-sans overflow-hidden flex space-between">
      <div className='border border-gray-400 bg-white mt-4'>
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-200 min-h-[48px]">
          <div className="flex items-center gap-2 w-1/2">
            <span className="text-2xl text-gray-400 cursor-pointer mr-2">&larr;</span>
            <span className="font-bold text-lg">Mood Trends</span>
          </div>
          <div className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xl ml-2 cursor-pointer">+</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-4 mt-4">
          {['Mood', 'Week'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 rounded-lg font-medium text-base transition-all ${
                activeTab === tab
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Chart */}
<div className="bg-white rounded-xl p-4 m-4 border border-gray-200 shadow-sm" style={{ width: '600px', height: '350px' }}>

  <Line
  data={{
    labels: dayLabels,
  datasets: datasets.map((ds) => ({
      ...ds,
      pointStyle:
        ds.label === 'Daily Check-In'
          ? 'rect'
          : ds.label === 'After Workout'
          ? 'circle'
          : 'triangle',
          
      pointRadius: 6,

      pointHoverRadius: 7,
    })),
  }}
  style={{ width: '600px', height: '350px' }}
  options={{
   
    scales: {
      y: {
        position: 'left',
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value) => emojiMap[value] || '',
          font: { size: 18, weight: 'bold' },
        },
        grid: {
          display: true,
          drawBorder: false,
          color: '#000', 
          drawOnChartArea: true,
          tickLength: 0,
        },
      },
      y1: {
        position: 'right',
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value) => moodLabelMap[value] || '',
          font: { size: 14 }, 
        },
        grid: {
          display: true,
          drawBorder: false,
          color: '#000', // Black grid lines
          
          drawOnChartArea: true,
          tickLength: 0,
        },
      },
      x: {
        grid: {
          display: true,
          drawBorder: false,
          color: '#000', // Black grid lines
          drawOnChartArea: true,
          tickLength: 0,
        },
        ticks: {
          font: { size: 14 }, // Make font bold
          padding: 16,
          callback: function(value, index) {
            return dayLabels[index];
          },
          maxTicksLimit: 6,
        },
      },
    },
  }}
/>

  <div className="flex gap-4 text-sm justify-center">
    <span><span className="font-bold" style={{ color: '#f59e42' }}>■</span> Daily Check-In</span>
    <span><span className="font-bold" style={{ color: '#3b82f6' }}>■</span> After Meditation</span>
    <span><span className="font-bold" style={{ color: '#22c55e' }}>■</span> After Workout</span>
  </div>
</div>


        {/* Mood Entries */}
        <div className="font-semibold text-base mb-2 mt-8 ml-4">Mood Entries</div>
        <div className="bg-gray-50 rounded-xl mx-4 mb-4 p-3 border border-gray-200">
          {/* Always show Daily Check-In as Happy */}
          <div className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-medium">Daily Check-In : Happy</p>
              <p className="text-sm text-gray-500">
                {sortedDates.length > 0
                  ? new Date(sortedDates[sortedDates.length - 1]).toLocaleString('en-US', {
                      weekday: 'long',
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  : ''}
              </p>
            </div>
            <span className="text-xl">😊</span>
          </div>
          {/* Show After Workout and After Meditation if selected */}
          {sortedDates.length > 0 && (
            <>
              {['After Workout', 'After Meditation'].map((type) => {
                const moodLabel = moodData[sortedDates[sortedDates.length - 1]]?.[type];
                if (moodLabel) {
                  const emoji = moods.find((m) => m.label === moodLabel)?.emoji || '';
                  return (
                    <div key={type} className="flex justify-between items-center border-b py-2">
                      <div>
                        <p className="font-medium">{type} : {moodLabel}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(sortedDates[sortedDates.length - 1]).toLocaleString('en-US', {
                            weekday: 'long',
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <span className="text-xl">{emoji}</span>
                    </div>
                  );
                }
                return null;
              })}
            </>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className='ml-20 mt-4'>
        {/* Date Picker */}
        <div className="flex items-center px-4 mt-4">
          <label className="mr-2 font-medium text-base">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-base"
          />
        </div>

        {/* Mood Selectors */}
        {['After Workout', 'After Meditation'].map((type) => (
          <div key={type} className='bg-white p-4 mt-4 relative'>
            <button className="absolute top-2 right-3 text-lg font-bold text-gray-500 hover:text-black">×</button>
            <div className="font-semibold text-base mb-2 ml-4">Excellent</div>
            <div className="font-semibold text-base mb-2 ml-4">
              How are you feeling {type === 'After Workout' ? 'after workout?' : type === 'After Meditation' ? 'after meditation?' : ''}
            </div>
            <div className="grid grid-cols-3 gap-4 mx-4 mb-6">
              {moods.map((m) => (
                <button
                  key={m.label}
                  className={`flex flex-col items-center py-3 rounded-xl font-medium text-2xl bg-green-200 transition-all
                    ${selectedDate && moodData[selectedDate]?.[type] === m.label ? 'border-2 border-blue-500' : 'border border-gray-200'}
                    ${!selectedDate ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  disabled={!selectedDate}
                  onClick={() => handleMoodSelect(type, m.label)}
                >
                  <span>{m.emoji}</span>
                  <span className="text-sm mt-1">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
