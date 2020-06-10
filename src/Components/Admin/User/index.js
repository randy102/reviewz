import React, { useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import { useRequest } from 'Utils/request';

import { IconButton } from 'Components/Shared/Buttons';
import UserRoleCell from 'Components/Admin/AgGridCellRenderers/UserRoleCell';
import UserCell from 'Components/Admin/AgGridCellRenderers/UserCell';

import refreshIcon from '@iconify/icons-mdi/refresh';

import styles from 'SCSS/UserList.module.scss';
import ExportUser from './ExportUsers';
import localeText from '../localeText';
import AddUser from './AddUser';
export default function User() {
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
      cellRendererFramework: ({ data }) => {
        const { username, img } = data;
        return <UserCell username={username} img={img} />;
      },
    },
    {
      headerName: 'Quyền quản trị',
      field: 'roles',
      sortable: true,
      sort: 'desc',
      valueGetter: ({ data }) => {
        const { roles } = data;
        return roles[0].role === 'ROLE_ADMIN';
      },
      cellRendererFramework: ({ data, value, context }) => {
        const { id, username } = data;
        return (
          <UserRoleCell
            defaultChecked={value}
            userId={id}
            username={username}
            refetch={context.refetch}
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

  // Request user list
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
            localeText={localeText}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
