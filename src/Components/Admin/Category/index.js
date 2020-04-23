import React, { useState, useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { AgGridReact } from 'ag-grid-react';
import { useRequest } from 'Utils/request';

import AddButton from './AddCategory';
import DeleteButton from './DeleteCategory';
import EditButton from './EditCategory';

import { IconButton } from 'Components/Shared/Buttons';

import refreshIcon from '@iconify/icons-mdi/refresh';

import styles from 'SCSS/UserList.module.scss';

import 'SCSS/AgGrid.scss';

import { getToken } from 'Utils/auth';

export default function User() {
  /*----- REQUEST CATEGORY LIST API -----*/

  const [sendRequest, { refetch }] = useRequest({
    onLoading: loading => {
      setGridLoading(loading);
    },
    onError: error => {
      console.log('Category list error:', error);
    },
    onResponse: response => {
      console.log('Category list response:', response);
      setRows(response.data);
    },
  });

  /*----- REQUEST CATEGORY LIST API -----*/
  //
  //
  //
  //
  //
  /*----- GRID SETUP -----*/

  // Grid API
  const [gridApi, setGridApi] = useState(null);

  // Grid loading
  const [gridLoading, setGridLoading] = useState(undefined);

  // Show loading overlay when something is loading
  useEffect(() => {
    if (!gridApi) return;

    if (gridLoading) {
      gridApi.showLoadingOverlay();
    } else {
      gridApi.hideOverlay();
    }
  }, [gridLoading]);

  // Need to refresh
  const [needRefresh, setNeedRefresh] = useState(false);

  // Refetch user list when need to refresh
  useEffect(() => {
    if (!needRefresh) return;

    refetch();
    setNeedRefresh(false);
  }, [needRefresh]);

  // On grid ready => Get grid api and request user list
  function onGridReady(params) {
    setGridApi(params.api);
    console.log('Got grid api:', params.api);
    sendRequest({
      api: 'category',
      method: 'GET',
    });
    console.log('Sending get category request...');
  }

  // Grid columns
  const columns = [
    {
      headerName: 'Tên thể loại',
      field: 'name',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Tác vụ',
      field: 'operations',
      cellRenderer: 'operationsRenderer',
    },
  ];

  // Default column definitions
  const defaultColDef = {
    flex: 1,
    resizable: true,
  };

  // Grid rows (Get data from API)
  const [rows, setRows] = useState([]);

  /*----- GRID SETUP -----*/
  //
  //
  //
  //
  //
  /*----- GRID CELL RENDERERS -----*/

  function OperationsRenderer(props) {
    const { data } = props;
    return (
      <div style={{ display: 'flex' }}>
        <EditButton category={data} onResponse={() => setNeedRefresh(true)} />
        <DeleteButton
          category={data}
          setLoading={loading => setGridLoading(loading)}
          onResponse={() => setNeedRefresh(true)}
        />
      </div>
    );
  }

  /*----- GRID CELL RENDERERS -----*/
  //
  //
  //
  //
  //

  return (
    <>
      <div className={styles.user_list_container}>
        <div className={styles.buttons_container}>
          <IconButton onClick={refetch} icon={refreshIcon} text="Tải lại" />

          <AddButton onDone={refetch} />
        </div>

        <div
          className="ag-theme-alpine"
          style={{ height: '100%', width: '100%', marginTop: '10px' }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={columns}
            defaultColDef={defaultColDef}
            rowData={rows}
            suppressRowClickSelection
            suppressCellSelection
            frameworkComponents={{
              operationsRenderer: OperationsRenderer,
            }}
          />
        </div>
      </div>
    </>
  );
}
