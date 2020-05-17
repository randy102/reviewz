import React, { useState, useEffect } from 'react';

import { useRequest } from 'Utils/request';
import epochToDate from 'Utils/helpers/unixToDate';
import movieNameComparator from '../Movie/Filter Comparators/movieNameComparator';

import { AgGridReact } from 'ag-grid-react';
import { IconButton } from 'Components/Shared/Buttons';

import refreshIcon from '@iconify/icons-mdi/refresh';

import styles from 'SCSS/UserList.module.scss';
import 'SCSS/Admin/AgGrid.scss';
import MovieNameCell from '../Movie/Cell Renderers/MovieNameCell';
import UsernameCell from '../User/Cell Renderers/UsernameCell';
import ScoreCell from './Cell Renderers/ScoreCell';
import localeText from '../localeText';
import dateToUnix from 'Utils/helpers/dateToUnix';
import DeleteReview from './DeleteReview';
import VerifyReview from './VerifyReview';
import ExportReviews from './ExportReviews';
import ReviewDetails from './ReviewDetails';

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
      headerName: 'Tên phim',
      field: 'movie',
      filter: true,
      filterParams: {
        textFormatter: value => value,
        textCustomComparator: movieNameComparator,
        debounceMs: 200,
        newRowsAction: 'keep',
      },
      valueGetter: ({ data }) => data.movie,
      cellRendererFramework: ({ data }) => {
        const { nameEn, nameVn } = data.movie;
        return <MovieNameCell nameVn={nameVn} nameEn={nameEn} />;
      },
    },
    {
      headerName: 'Điểm',
      field: 'star',
      filter: 'agNumberColumnFilter',
      sortable: true,
      cellRendererFramework: ({ data }) => <ScoreCell score={data.star} />,
    },
    {
      headerName: 'Ngày viết',
      field: 'date',
      sortable: true,
      filter: true,
      sort: 'desc',
      valueGetter: ({ data }) => epochToDate(data.createdAt),
      comparator: (date1, date2) => dateToUnix(date1) - dateToUnix(date2),
    },
    {
      headerName: 'Trạng thái',
      field: 'verified',
      sortable: true,
      sort: 'asc',
      valueGetter: ({ data }) => (data.verified ? 'Đã duyệt' : 'Chưa duyệt'),
    },
    {
      headerName: 'Tác vụ',
      cellRendererFramework: params => {
        console.log('data:', params.data);
        const {
          data: { id, star, content },
          context: { refetch },
          api: gridApi,
        } = params;

        return (
          <div style={{ display: 'flex' }}>
            <ReviewDetails star={star} content={content} />
            <DeleteReview id={id} gridApi={gridApi} refetch={refetch} />
            {!params.data.verified && (
              <VerifyReview id={id} gridApi={gridApi} refetch={refetch} />
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
          <ExportReviews gridApi={gridApi} />
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
