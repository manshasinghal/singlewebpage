import React, { useState } from 'react';
import MoodChart from './MoodChart';

const moods = [
  { label: 'Happy', emoji: '😊' },
  { label: 'Content', emoji: '🙂' },
  { label: 'Neutral', emoji: '😐' },
  { label: 'Stressed', emoji: '😣' },
  { label: 'Sad', emoji: '😢' },
  { label: 'Angry', emoji: '😡' },
];

const MoodTrackerPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [moodData, setMoodData] = useState({});

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleMoodSelect = (mood) => {
    if (selectedDate) {
      setMoodData((prev) => ({
        ...prev,
        [selectedDate]: mood,
      }));
    }
  };

  const chartData = Object.keys(moodData).length ? moodData : { '': null };

  // List of mood entries for display
  const sortedDates = Object.keys(moodData).sort();

  return (
    <div style={{
      maxWidth: 400,
      margin: '32px auto',
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      padding: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile" width={32} height={32} style={{ borderRadius: '50%', marginRight: 8 }} />
        <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Mood Trends</h2>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="date" style={{ fontWeight: 500, fontSize: 15 }}>Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{
            border: '1px solid #ccc',
            borderRadius: 6,
            padding: '4px 8px',
            marginLeft: 8,
            fontSize: 15,
          }}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>How are you feeling?</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}>
          {moods.map((m) => (
            <button
              key={m.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 12,
                borderRadius: '50%',
                border: selectedDate && moodData[selectedDate] === m.label ? '2px solid #3b82f6' : '1px solid #eee',
                background: selectedDate && moodData[selectedDate] === m.label ? '#e0f2fe' : '#f9fafb',
                fontSize: 22,
                cursor: !selectedDate || !!moodData[selectedDate] ? 'not-allowed' : 'pointer',
                opacity: !selectedDate || !!moodData[selectedDate] ? 0.6 : 1,
                transition: 'all 0.2s',
              }}
              disabled={!selectedDate || !!moodData[selectedDate]}
              onClick={() => handleMoodSelect(m.label)}
            >
              <span>{m.emoji}</span>
              <span style={{ fontSize: 13, marginTop: 2 }}>{m.label}</span>
            </button>
          ))}
        </div>
        {!selectedDate && (
          <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>Please select a date first.</div>
        )}
        {selectedDate && !!moodData[selectedDate] && (
          <div style={{ fontSize: 12, color: '#22c55e', marginTop: 8 }}>Mood selected for this date!</div>
        )}
      </div>
      <div style={{
        background: '#f3f4f6',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
      }}>
        <MoodChart moodData={chartData} />
      </div>
      <div>
        <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 8 }}>Mood Entries</div>
        {sortedDates.length === 0 ? (
          <div style={{ fontSize: 13, color: '#888' }}>No entries yet.</div>
        ) : (
          <ul style={{ fontSize: 14, paddingLeft: 0 }}>
            {sortedDates.map(date => (
              <li key={date} style={{
                background: '#f9fafb',
                borderRadius: 8,
                padding: '6px 10px',
                marginBottom: 6,
                listStyle: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ fontSize: 18 }}>{moods.find(m => m.label === moodData[date])?.emoji}</span>
                <span>{moodData[date]}</span>
                <span style={{ marginLeft: 'auto', color: '#888', fontSize: 12 }}>{date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MoodTrackerPage;