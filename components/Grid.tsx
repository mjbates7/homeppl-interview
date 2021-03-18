import React, { FC } from 'react';
import { GridColumnItem } from '../types';

const Grid: FC = ({ children }) => {
  return <div className="grid grid-cols-12 border border-gray-500 divide-x divide-gray-500">{children}</div>;
};

type GridColumnProps = {
  col: GridColumnItem;
  removeColumn: (id: string) => void;
};

const GridColumn = ({ col, removeColumn }: GridColumnProps) => {
  return (
    <div className={`relative h-24 col-span-${col.columnWidth} pt-6 px-4`}>
      <div className="absolute top-0 right-0 z-20 hover:bg-gray-100">
        <button className="px-2" onClick={() => removeColumn(col.id)}>
          &times; remove
        </button>
      </div>
      <div>Width: {col.columnWidth}</div>
      <div>{col.data && col.data.text}</div>
    </div>
  );
};

export default Grid;
export { GridColumn };
