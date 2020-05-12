import React, { useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { useRequest } from 'Utils/request';

import AddUser from './AddUser';
import RoleCell from './Cell Renderers/RoleCell';
import { IconButton } from 'Components/Shared/Buttons';

import refreshIcon from '@iconify/icons-mdi/refresh';

import styles from 'SCSS/UserList.module.scss';
import 'SCSS/Admin/AgGrid.scss';
import UsernameCell from './Cell Renderers/UsernameCell';
import ExportUser from './ExportUsers';
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
      headerName: 'Người dùng',
      field: 'username',
      sortable: true,
      filter: true,
      filterParams: {
        debounceMs: 200,
      },
      cellRendererFramework: params => {
        const { username, img } = params.data;
        return <UsernameCell username={username} img={img} />;
      },
    },
    {
      headerName: 'Quyền Admin',
      field: 'roles',
      sortable: true,
      sort: 'desc',
      valueGetter: params => {
        const { roles } = params.data;
        return roles[0].role === 'ROLE_ADMIN';
      },
      cellRendererFramework: params => {
        const {
          value,
          data: { id, username },
          api,
        } = params;
        return (
          <RoleCell
            isAdmin={value}
            userId={id}
            username={username}
            gridApi={api}
          />
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

  return (
    <React.Fragment>
      <div className={styles.user_list_container}>
        <div className={styles.buttons_container}>
          <IconButton onClick={refetch} icon={refreshIcon} text="Tải lại" />

          <AddUser refetch={refetch} />

          <ExportUser gridApi={gridApi} />
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
            rowHeight={50}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
