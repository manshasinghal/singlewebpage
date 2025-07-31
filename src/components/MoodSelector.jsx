import React from 'react';

const moods = [
  { label: 'Happy', emoji: '😊' },
  { label: 'Content', emoji: '🙂' },
  { label: 'Sad', emoji: '😢' },
  { label: 'Angry', emoji: '😠' },
  { label: 'Stressed', emoji: '😣' },
  { label: 'Neutral', emoji: '😐' },
];

const MoodSelector = ({ selectedDate, moodData, onMoodSelect }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">How are you feeling today?</h2>
      <div className="grid grid-cols-3 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => onMoodSelect(mood.label)}
            disabled={!selectedDate || moodData[selectedDate]}
            className={`p-4 rounded-lg border hover:bg-gray-100 flex flex-col items-center
              ${moodData[selectedDate] === mood.label ? 'bg-green-100 border-green-500' : ''}`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span>{mood.label}</span>
          </button>
        ))}
      </div>
      {moodData[selectedDate] && <p className="mt-2 text-green-600">You selected: {moodData[selectedDate]}</p>}
    </div>
  );
};

export default MoodSelector;
