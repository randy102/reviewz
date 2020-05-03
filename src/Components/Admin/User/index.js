import React, { useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { useRequest } from 'Utils/request';

import Avatar from 'Components/Shared/Avatar.js';
import AddButton from './AddUser';
import AdminToggle from './AdminToggle';
import DeleteButton from './DeleteUser';
import { IconButton } from 'Components/Shared/Buttons';

import refreshIcon from '@iconify/icons-mdi/refresh';

import styles from 'SCSS/UserList.module.scss';
import 'SCSS/Admin/AgGrid.scss';
import skipAccent from 'Utils/removeAccent';

export default function User() {
  /*----- GRID SETUP -----*/

  // Grid API
  const [gridApi, setGridApi] = useState(null);

  // On grid ready => Get grid api and request user list
  function onGridReady(params) {
    setGridApi(params.api);
    sendRequest({
      api: 'user',
      method: 'GET',
    });
  }

  // Grid columns
  const columns = [
    {
      headerName: 'Ảnh đại diện',
      field: 'image',
      cellRendererFramework: ImageRenderer,
    },
    {
      headerName: 'Tên đăng nhập',
      field: 'username',
      sortable: true,
      filter: true,
      suppressMenu: true,
      filterParams: {
        textFormatter: skipAccent,
      },
    },
    {
      headerName: 'Quyền Admin',
      field: 'roles',
      cellRendererFramework: RoleRenderer,
      valueGetter: params => {
        const { roles } = params.data;
        return roles[0].role === 'ROLE_ADMIN';
      },
      sortable: true,
    },
    {
      headerName: 'Tác vụ',
      field: 'operations',
      cellRendererFramework: OperationsRenderer,
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

  const [sendRequest, { refetch }] = useRequest({
    onError: error => {
      console.log('User list error:', error);
    },
    onResponse: response => {
      setRows(response.data);
    },
    onLoading: loading => {
      if (!gridApi) return;

      if (loading) gridApi.showLoadingOverlay();
      else gridApi.hideOverlay();
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
    const { data, api } = params;

    return (
      <AdminToggle
        style={{
          transform: 'scale(0.7)',
        }}
        user={data}
        gridApi={api}
      />
    );
  }

  function OperationsRenderer(params) {
    const {
      data,
      api,
      context: { refetch },
    } = params;
    return <DeleteButton user={data} gridApi={api} refetch={refetch} />;
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
                  api: 'user',
                  method: 'GET',
                }),
            }}
          />
        </div>
      </div>
    </>
  );
}
