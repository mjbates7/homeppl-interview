import React, { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { GridColumnItem } from '../types';
import AddColumnWidget from './AddColumnWidget';
import Grid, { GridColumn } from './Grid';

const MINIMUM_COLUMNS = 1;
const MAXIMUM_COLUMNS = 12;

const defaultData = () => [
  {
    id: '9008ab5d',
    columnWidth: 6,
    data: {
      text: '9008ab5d',
    },
  },
  {
    id: 'c9b94f14',
    columnWidth: 6,
    data: {
      text: 'c9b94f14',
    },
  },
];

const calculateColumnWidths = (width: number, totalColumns: number) => {
  const baseWidth = Math.floor((MAXIMUM_COLUMNS - width) / totalColumns);
  let rem = (MAXIMUM_COLUMNS - width) % totalColumns;

  const columnWidths = [];
  for (let i = 0; i < totalColumns; i++) {
    const v = baseWidth + (rem > 0 ? 1 : 0); // (rem > 0 )
    columnWidths.push(v);
    rem--;
  }

  return columnWidths;
};

const reassignColumnWidths = (columnWidths: Array<number>, grid: Array<GridColumnItem>) => {
  return grid.map((c, idx) => ({
    ...c,
    columnWidth: columnWidths[idx],
  }));
};

// const getTotalColumnWidths = (grid: Array<GridColumnItem>) =>
//   grid.reduce((total: number, col: GridColumnItem) => {
//     return total + col.columnWidth;
//   }, 0);

const GridEditor = () => {
  const [grid, setGrid] = useState<Array<GridColumnItem>>(() => defaultData());
  const [json, setJson] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const clearErrors = () => setError(undefined);

  const addGridColumn = (width: number) => {
    clearErrors();
    // 1. perform validations
    const totalColumns = grid.length;
    if (width < MINIMUM_COLUMNS || width > MAXIMUM_COLUMNS) {
      setError(`Please enter a width between ${MINIMUM_COLUMNS} and ${MAXIMUM_COLUMNS}`);
      return;
    }

    if (totalColumns + width > MAXIMUM_COLUMNS) {
      setError(`You have reached the maxmimum number of columns. Please remove one or more first`);
      return;
    }

    // re-calculate the widths based on the above
    const columnWidths = calculateColumnWidths(width, totalColumns);

    // re-assign the widths to the changed grid based on the new widths above
    let changedGrid = reassignColumnWidths(columnWidths, grid);

    // create random id
    const newId = v4().split('-')[0];
    changedGrid.push({ id: newId, columnWidth: width, data: { text: `Content here ${newId}` } });

    // finally update the state
    setGrid(changedGrid);
  };

  const removeGridColumn = (id: string) => {
    clearErrors();

    if (grid.length === MINIMUM_COLUMNS) {
      setError('Unable to remove - the grid must have at least one column');
      return;
    }
    // remove the column from the grid
    let changedGrid = grid.filter((col) => col.id !== id);

    // re-calculate the widths based on the above
    const columnWidths = calculateColumnWidths(0, changedGrid.length);

    // re-assign the widths to the changed grid based on the new widths above
    changedGrid = reassignColumnWidths(columnWidths, changedGrid);

    // set the state again
    setGrid(changedGrid);
  };

  // import json as string, parse it to an object and set the grid
  const importGrid = (json: string) => {
    // this is simple, but we could add further validtion to ensure JSON is valid and it meets the business rules
    const parsed = JSON.parse(json);
    setGrid(parsed);
  };

  const exportGrid = () => {
    setJson(JSON.stringify(grid, null, 4));
  };

  return (
    <React.Fragment>
      <Grid>{grid && grid.map((col) => <GridColumn key={col.id} col={col} removeColumn={removeGridColumn} />)}</Grid>
      <div className="flex justify-between space-x-8">
        <div>
          <AddColumnWidget addGridColumn={addGridColumn} />
          {error && <span className="text-red-500">{error}</span>}
        </div>
        <button className="h-8 px-2 bg-gray-100 border border-gray-500" onClick={exportGrid}>
          Export Grid
        </button>
      </div>
      <hr className="border" />
      <div>
        <textarea className="w-full border h-80" value={json} onChange={(e) => setJson(e.target.value)}></textarea>
      </div>
      <div>
        <button
          disabled={!json}
          className="h-8 px-2 bg-gray-100 border border-gray-500 disabled:opacity-50"
          onClick={() => importGrid(json)}
        >
          Import Grid
        </button>
      </div>
    </React.Fragment>
  );
};

export default GridEditor;
