import React, { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { useRequest } from 'Utils/request';

import AddButton from './AddCategory';
import DeleteButton from './DeleteCategory';
import EditButton from './EditCategory';

import { IconButton } from 'Components/Shared/Buttons';

import refreshIcon from '@iconify/icons-mdi/refresh';

import styles from 'SCSS/UserList.module.scss';

import skipAccent from 'Utils/removeAccent';

import 'SCSS/Admin/AgGrid.scss';
import localeText from '../localeText';

export default function Category() {
  /*----- REQUEST CATEGORY LIST API -----*/

  const [sendRequest, { refetch }] = useRequest({
    onLoading: loading => {
      setGridLoading(loading);
    },
    onError: error => {
      console.log('Category list error:', error);
    },
    onResponse: response => {
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
    sendRequest({
      api: 'category',
      method: 'GET',
    });
  }

  // Grid columns
  const columns = [
    {
      headerName: 'Tên thể loại',
      field: 'name',
      sortable: true,
      filter: true,
      filterParams: {
        textFormatter: skipAccent,
      },
    },
    {
      headerName: 'Tác vụ',
      field: 'operations',
      cellRendererFramework: params => {
        const {
          data,
          api,
          context: { refetch },
        } = params;
        return (
          <div style={{ display: 'flex' }}>
            <EditButton data={data} refetch={refetch} />
            <DeleteButton gridApi={api} data={data} refetch={refetch} />
          </div>
        );
      },
    },
  ];

  // Default column definitions
  const defaultColDef = {
    flex: 1,
    resizable: true,
    suppressMenu: true,
  };

  // Grid rows (Get data from API)
  const [rows, setRows] = useState([]);

  /*----- GRID SETUP -----*/
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

          <AddButton refetch={refetch} />
        </div>

        <div
          className="ag-theme-alpine"
          style={{ height: '500px', width: '100%', marginTop: '10px' }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={columns}
            defaultColDef={defaultColDef}
            rowData={rows}
            suppressRowClickSelection
            suppressCellSelection
            floatingFilter
            animateRows
            context={{
              refetch: () =>
                sendRequest({
                  api: 'category',
                  method: 'GET',
                }),
            }}
            localeText={localeText}
          />
        </div>
      </div>
    </>
  );
}
