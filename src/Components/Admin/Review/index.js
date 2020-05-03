import React, { useState, useEffect } from 'react';

import { useRequest } from 'Utils/request';
import epochToDate from 'Utils/epochToDate';
import movieNameComparator from '../Movie/movieNameComparator';

import { AgGridReact } from 'ag-grid-react';
import { IconButton } from 'Components/Shared/Buttons';

import refreshIcon from '@iconify/icons-mdi/refresh';

import styles from 'SCSS/UserList.module.scss';
import 'SCSS/Admin/AgGrid.scss';
import MovieNameCell from '../Movie/MovieNameCell';
import UsernameCell from '../User/UsernameCell';
import ScoreCell from './ScoreCell';
import OperationsCell from './OperationsCell';
import localeText from '../localeText';

export default function Review() {
  // Request reviews list
  const [sendRequest, { loading, refetch }] = useRequest({
    onError: error => {
      console.log('Get reviews error:', error);
    },
    onResponse: response => {
      setRows(response.data);
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
      api: 'review',
      method: 'GET',
    });
  }

  // Grid columns
  const columns = [
    {
      headerName: 'Người viết',
      valueGetter: ({ data }) => data.user.username,
      cellRendererFramework: ({ data }) => {
        const { username, img } = data.user;
        return <UsernameCell username={username} img={img} />;
      },
      filter: true,
    },
    {
      headerName: 'Tên phim',
      valueGetter: ({ data }) => data.movie,
      cellRendererFramework: ({ data }) => {
        const { nameEn, nameVn } = data.movie;
        return <MovieNameCell nameVn={nameVn} nameEn={nameEn} />;
      },
      filter: true,
      filterParams: {
        textFormatter: value => value,
        textCustomComparator: movieNameComparator,
        debounceMs: 200,
      },
    },
    {
      headerName: 'Điểm',
      field: 'star',
      cellRendererFramework: ({ data }) => <ScoreCell score={data.star} />,
      filter: 'agNumberColumnFilter',
      sortable: true,
    },
    {
      headerName: 'Ngày viết',
      valueGetter: ({ data }) => epochToDate(data.createdAt),
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Trạng thái',
      valueGetter: ({ data }) => (data.verified ? 'Đã duyệt' : 'Chưa duyệt'),
      sortable: true,
    },
    {
      headerName: 'Tác vụ',
      cellRendererFramework: params => {
        return <OperationsCell params={params} />;
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
                  api: 'review',
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
