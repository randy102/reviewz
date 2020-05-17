import React, { useState, useEffect } from 'react';

import { useRequest } from 'Utils/request';

import unixToDate from 'Utils/helpers/unixToDate';
import dateToUnix from 'Utils/helpers/dateToUnix';

import UsernameCell from 'Components/Admin/User/Cell Renderers/UsernameCell';

import { AgGridReact } from 'ag-grid-react';
import { IconButton } from 'Components/Shared/Buttons';

import styles from 'SCSS/UserList.module.scss';
import 'SCSS/Admin/AgGrid.scss';

import refreshIcon from '@iconify/icons-mdi/refresh';
import localeText from '../localeText';

import RequestDetails from './RequestDetails';
import ResolveRequest from './ResolveRequest';

export default function Review() {
  // Request reviews list
  const [sendRequest, { loading, refetch }] = useRequest({
    onError: error => {
      console.log('Get requests error:', error);
    },
    onResponse: response => {
      setRows(response.data);
      console.log('response:', response.data);
    },
  });

  useEffect(() => {
    if (!gridApi) return;
    if (loading) {
      gridApi.showLoadingOverlay();
    } else {
      gridApi.hideOverlay();
    }
  }, [loading]);

  // Row data
  const [rows, setRows] = useState([]);

  // Grid api
  const [gridApi, setGridApi] = useState();

  // On grid ready
  function onGridReady(params) {
    setGridApi(params.api);

    sendRequest({
      api: 'request',
      method: 'GET',
    });
  }

  // Grid columns
  const columns = [
    {
      headerName: 'Người gửi',
      field: 'user',
      sortable: true,
      filter: true,
      filterParams: {
        debounceMs: 200,
      },
      valueGetter: ({ data }) => data.user.username,
      cellRendererFramework: ({ data }) => {
        const { username, img } = data.user;
        return <UsernameCell username={username} img={img} />;
      },
    },
    {
      headerName: 'Ngày gửi',
      field: 'date',
      sortable: true,
      filter: true,
      sort: 'desc',
      valueGetter: ({ data }) => unixToDate(data.createdAt),
      comparator: (date1, date2) => dateToUnix(date1) - dateToUnix(date2),
    },
    {
      headerName: 'Trạng thái',
      field: 'resolved',
      sortable: true,
      sort: 'asc',
      valueGetter: ({ data }) =>
        data.resolved ? 'Đã giải quyết' : 'Chưa giải quyết',
    },
    {
      headerName: 'Tác vụ',
      cellRendererFramework: params => {
        const {
          data: { id, movieName, info },
          context: { refetch },
          api: gridApi,
        } = params;
        return (
          <div style={{ display: 'flex' }}>
            <RequestDetails movieName={movieName} info={info} />
            {!params.data.resolved && (
              <ResolveRequest id={id} gridApi={gridApi} refetch={refetch} />
            )}
          </div>
        );
      },
    },
  ];

  // Default column definitions
  const defaultColDef = {
    suppressMenu: true,
    autoHeight: true,
    resizable: true,
    minWidth: 200,
    filterParams: {
      debounceMs: 200,
      newRowsAction: 'keep',
    },
  };

  return (
    <React.Fragment>
      <div className={styles.user_list_container}>
        <div className={styles.buttons_container}>
          <IconButton onClick={refetch} icon={refreshIcon} text="Tải lại" />
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
            animateRows={true}
            context={{
              refetch: () =>
                sendRequest({
                  api: 'request',
                  method: 'GET',
                }),
            }}
            localeText={localeText}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
