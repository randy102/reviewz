import React, { useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { useRequest } from 'Utils/request';

import skipAccent from 'Utils/helpers/removeAccent';
import localeText from '../localeText';

import AddDirector from './AddDirector';
import DeleteDirector from './DeleteDirector';
import EditDirector from './EditDirector';
import ExportDirectors from './ExportDirectors';
import { IconButton } from 'Components/Shared/Buttons';

import refreshIcon from '@iconify/icons-mdi/refresh';

import styles from 'SCSS/UserList.module.scss';

import 'SCSS/Admin/AgGrid.scss';

// Default column definitions
const defaultColDef = {
  flex: 1,
  resizable: true,
  suppressMenu: true,
};

// Director name column
const nameColumn = {
  headerName: 'Tên đạo diễn',
  field: 'name',
  sortable: true,
  filter: true,
  filterParams: {
    textFormatter: skipAccent,
  },
};

// Operations column
const operationsColumn = {
  headerName: 'Tác vụ',
  cellRendererFramework: params => {
    const {
      data,
      api,
      context: { refetch },
    } = params;
    return (
      <div style={{ display: 'flex' }}>
        <EditDirector data={data} refetch={refetch} />
        <DeleteDirector gridApi={api} data={data} refetch={refetch} />
      </div>
    );
  },
};

// Column definitions
const columnDefs = [nameColumn, operationsColumn];

export default function Director() {
  // Request director list
  const [sendRequest, { refetch }] = useRequest({
    onLoading: loading => {
      if (!gridApi) return;
      loading ? gridApi.showLoadingOverlay() : gridApi.hideOverlay();
    },
    onError: error => {
      console.log('Director list error:', error);
    },
    onResponse: response => {
      setRows(response.data);
    },
  });

  // Grid API
  const [gridApi, setGridApi] = useState(null);

  // On grid ready => Get grid api and request user list
  function onGridReady(params) {
    setGridApi(params.api);
    sendRequest({
      api: 'director',
      method: 'GET',
    });
  }

  // Grid rows (Get data from API)
  const [rows, setRows] = useState([]);

  return (
    <div className={styles.user_list_container}>
      <div className={styles.buttons_container}>
        <IconButton onClick={refetch} icon={refreshIcon} text="Tải lại" />

        <AddDirector refetch={refetch} />

        <ExportDirectors gridApi={gridApi} />
      </div>

      <div
        className="ag-theme-alpine"
        style={{ height: '500px', width: '100%', marginTop: '10px' }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rows}
          suppressRowClickSelection
          suppressCellSelection
          floatingFilter
          animateRows
          context={{
            refetch: () =>
              sendRequest({
                api: 'director',
                method: 'GET',
              }),
          }}
          localeText={localeText}
        />
      </div>
    </div>
  );
}
