import React from 'react';

export default function Filter({ filter, onChangeFilter }) {
  const handleInputChange = (event) => {
    const newText = event.target.value;

    onChangeFilter(newText);
  };
  return (
    <div
      className="input-field col s6"
      style={{ marginLeft: '10px', display: 'flex', flex: 'auto' }}
    >
      <input
        placeholder="Filtro"
        id="filtro"
        type="text"
        value={filter}
        onChange={handleInputChange}
      />
    </div>
  );
}
