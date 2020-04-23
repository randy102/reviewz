import React, { useState, useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Avatar from 'Components/Shared/Avatar.js';
import { AgGridReact } from 'ag-grid-react';
import { useRequest } from 'Utils/request';

import AddButton from './AddUser';
import AdminToggle from './AdminToggle';
import DeleteButton from './DeleteUser';

import { IconButton } from 'Components/Shared/Buttons';

import refreshIcon from '@iconify/icons-mdi/refresh';

import styles from 'SCSS/UserList.module.scss';

import 'SCSS/AgGrid.scss';

export default function User() {
  /*----- GRID SETUP -----*/

  // Grid API
  const [gridApi, setGridApi] = useState(null);

  // Grid loading
  const [gridLoading, setGridLoading] = useState(false);

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

    userRefetch();
    setNeedRefresh(false);
  }, [needRefresh]);

  // On grid ready => Get grid api and request user list
  function onGridReady(params) {
    setGridApi(params.api);
    userRequest({
      api: 'user',
      method: 'GET',
    });
  }

  // Grid columns
  const columns = [
    {
      headerName: 'Ảnh đại diện',
      field: 'image',
      cellRenderer: 'imageRenderer',
    },
    {
      headerName: 'Tên đăng nhập',
      field: 'username',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Quyền Admin',
      field: 'roles',
      cellRenderer: 'roleRenderer',
    },
    {
      headerName: 'Xóa',
      field: 'delete',
      cellRenderer: 'deleteRenderer',
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
  /*----- REQUEST USER LIST API -----*/

  const [userRequest, { refetch: userRefetch }] = useRequest({
    onLoading: loading => {
      setGridLoading(loading);
    },
    onError: error => {
      console.log('User list error:', error);
    },
    onResponse: response => {
      setRows(response.data);
    },
  });

  /*----- REQUEST USER LIST API -----*/
  //
  //
  //
  //
  //
  /*----- GRID CELL RENDERERS -----*/

  function ImageRenderer(props) {
    return (
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '999px',
          overflow: 'hidden',
        }}
      >
        <Avatar id={props.data.img} />
      </div>
    );
  }

  function RoleRenderer(params) {
    // const {
    //   id,
    //   roles: [{ role }],
    // } = params.data;
    const { data } = params;

    return (
      <AdminToggle
        style={{
          transform: 'scale(0.7)',
        }}
        user={data}
        onClick={() => setGridLoading(true)}
        onDone={() => setGridLoading(false)}
      />
    );
  }

  function DeleteRenderer(params) {
    const { data } = params;
    return (
      <DeleteButton
        user={data}
        onClick={() => setGridLoading(true)}
        onDone={() => setNeedRefresh(true)}
      />
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
          <IconButton onClick={userRefetch} icon={refreshIcon} text="Tải lại" />

          <AddButton onDone={userRefetch} />
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
              imageRenderer: ImageRenderer,
              deleteRenderer: DeleteRenderer,
              roleRenderer: RoleRenderer,
            }}
          />
        </div>
      </div>
    </>
  );
}
