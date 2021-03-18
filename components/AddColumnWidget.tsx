import React, { useState } from 'react';

interface Props {
  addGridColumn: (width: number) => void;
}

const AddColumnWidget = ({ addGridColumn }: Props) => {
  const [width, setWidth] = useState('');

  const addColumn = () => {
    const value = parseInt(width, 10);
    if (value >= 0) addGridColumn(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between w-64 pl-2 border border-gray-500">
        <input
          className="w-32 outline-none"
          placeholder="Width"
          type="text"
          name="width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <button disabled={!width} className="px-2 py-1 bg-gray-100 disabled:opacity-50" onClick={addColumn}>
          Add Column
        </button>
      </div>
    </div>
  );
};

export default AddColumnWidget;
