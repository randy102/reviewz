import React from 'react';

import EditMovie from './EditMovie';
import DeleteMovie from './DeleteMovie';

export default function OperationsCell(props) {
  const {
    data,
    api,
    context: { refetch, categories },
    rowIndex,
  } = props;

  return (
    <div style={{ display: 'flex' }}>
      <EditMovie
        rowIndex={rowIndex}
        gridApi={api}
        data={data}
        refetch={refetch}
        categories={categories}
      />
      <DeleteMovie gridApi={api} data={data} refetch={refetch} />
    </div>
  );
}
