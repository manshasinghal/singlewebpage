import React from 'react';

const labelStyle = {
  marginRight: '8px',
  fontWeight: 500,
  fontSize: 15,
};

const inputStyle = {
  border: '1px solid #ccc',
  borderRadius: 6,
  padding: '4px 12px',
  fontSize: 15,
};

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <div style={{ marginBottom: "40px" }}>
      <label style={labelStyle}>Select Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
};

export default DatePicker;
