import React from 'react';
import PRD from '../helpers/Periods';

export default function Select(props) {
  const { currentPeriod, onSelectChange } = props;

  const handleChange = (event) => {
    const selectValue = event.target.value;
    onSelectChange(selectValue);
  };

  return (
    <div style={{ margin: '30px' }}>
      <h5>Escolha um período:</h5>
      <select
        className="browser-default"
        value={currentPeriod}
        onChange={handleChange}
        style={{
          fontSize: '1.2rem',
          marginTop: '10px',
          padding: '10px',
          textAlignLast: 'center',
        }}
      >
        {PRD.PERIODS_SELECT.map(({ monthNumber, monthText }) => {
          return (
            <option key={monthNumber} value={monthNumber}>
              {monthText}
            </option>
          );
        })}
      </select>
    </div>
  );
}
