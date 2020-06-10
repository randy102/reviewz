import React, { useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { useRequest } from 'Utils/request';

import skipAccent from 'Utils/helpers/removeAccent';
import localeText from '../localeText';

import AddActor from './AddActor';
import DeleteActor from './DeleteActor';
import EditActor from './EditActor';
import ExportActors from './ExportActors';
import { IconButton } from 'Components/Shared/Buttons';

import refreshIcon from '@iconify/icons-mdi/refresh';

import styles from 'SCSS/UserList.module.scss';

// Default column definitions
const defaultColDef = {
  flex: 1,
  resizable: true,
  suppressMenu: true,
};

// Actor name column
const nameColumn = {
  headerName: 'Tên diễn viên',
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
        <EditActor data={data} refetch={refetch} />
        <DeleteActor gridApi={api} data={data} refetch={refetch} />
      </div>
    );
  },
};

// Column definitions
const columnDefs = [nameColumn, operationsColumn];

export default function Actor() {
  // Request director list
  const [sendRequest, { refetch }] = useRequest({
    onLoading: loading => {
      if (!gridApi) return;
      loading ? gridApi.showLoadingOverlay() : gridApi.hideOverlay();
    },
    onError: error => {
      console.log('Actor list error:', error);
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
      api: 'actor',
      method: 'GET',
    });
  }

  // Grid rows (Get data from API)
  const [rows, setRows] = useState([]);

  return (
    <div className={styles.user_list_container}>
      <div className={styles.buttons_container}>
        <IconButton onClick={refetch} icon={refreshIcon} text="Tải lại" />

        <AddActor refetch={refetch} />

        <ExportActors gridApi={gridApi} />
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
                api: 'actor',
                method: 'GET',
              }),
          }}
          localeText={localeText}
        />
      </div>
    </div>
  );
}
