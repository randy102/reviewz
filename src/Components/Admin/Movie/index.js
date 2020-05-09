import React, { useState, useEffect } from 'react';

import { useRequest } from 'Utils/request';
import { css } from 'emotion';
import movieNameComparator from './Filter Comparators/movieNameComparator';

import { AgGridReact } from 'ag-grid-react';
import { IconButton } from 'Components/Shared/Buttons';
import AddButton from './AddMovie';

import refreshIcon from '@iconify/icons-mdi/refresh';

import styles from 'SCSS/UserList.module.scss';
import 'SCSS/Admin/AgGrid.scss';
import epochToDate from 'Utils/unixToDate';
import OperationsCell from './Cell Renderers/OperationsCell';
import PosterCell from './Cell Renderers/PosterCell';
import MovieNameCell from './Cell Renderers/MovieNameCell';
import genreComparator from './Filter Comparators/genreComparator';
import CategoriesCell from './Cell Renderers/CategoriesCell';
import localeText from '../localeText';
import moment from 'moment';
import dateToUnix from 'Utils/dateToUnix';

export default function Movie() {
  /*----- REQUEST MOVIE LIST API -----*/

  const [rowData, setRowData] = useState([]);

  const [sendRequest, { loading: moviesLoading, refetch }] = useRequest({
    onError: error => {
      console.log('Movie list error:', error);
    },
    onResponse: response => {
      setRowData(response.data);
    },
  });

  /*----- REQUEST MOVIE LIST API -----*/
  //
  //
  //
  //
  //
  /*----- REQUEST CATEGORY LIST -----*/

  const [categories, setCategories] = useState({});

  const [getCategories, { loading: categoriesLoading }] = useRequest({
    onError: error => {
      console.log('Category list error:', error);
    },
    onResponse: response => {
      setCategories(
        response.data.reduce((map, category) => {
          const { id, name } = category;
          map[id] = name;
          return map;
        }, {})
      );
    },
  });

  // Categories or Movies loading
  useEffect(() => {
    if (!gridApi) return;

    if (categoriesLoading || moviesLoading) {
      gridApi.showLoadingOverlay();
    } else {
      setRows(rowData);
      gridApi.hideOverlay();
    }
  }, [categoriesLoading, moviesLoading]);

  /*----- REQUEST CATEGORY LIST -----*/
  //
  //
  //
  //
  //
  /*----- GRID SETUP -----*/

  // Grid API
  const [gridApi, setGridApi] = useState(null);

  // On grid ready
  function onGridReady(params) {
    // Set grid api
    setGridApi(params.api);

    // Get categories
    getCategories({
      api: 'category',
      method: 'GET',
    });

    // Get movie list
    sendRequest({
      api: 'movie',
      method: 'GET',
    });
  }

  // Text style for nameEn and nameVn columns
  const textClass = css`
    line-height: 24px !important;
    white-space: normal;
  `;

  // Grid columns
  const columns = [
    {
      headerName: 'Poster',
      field: 'img',
      cellRendererFramework: params => {
        const { img } = params.data;
        return <PosterCell img={img} />;
      },
      width: 179,
    },
    {
      headerName: 'Tên phim',
      valueGetter: params => {
        const { nameVn, nameEn } = params.data;
        return { nameVn, nameEn };
      },
      cellRendererFramework: params => {
        const { nameVn, nameEn } = params.value;
        return <MovieNameCell nameEn={nameEn} nameVn={nameVn} />;
      },
      filter: true,
      filterParams: {
        textFormatter: value => value,
        textCustomComparator: movieNameComparator,
        filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith'],
        debounceMs: 200,
      },
      resizable: true,
    },
    {
      headerName: 'Thể loại',
      field: 'categories',
      filter: true,
      valueGetter: params => {
        const {
          data: { categories: categoryIds },
          context: { categories: categoryNames },
        } = params;

        return categoryIds.map(id => categoryNames[id]);
      },
      cellRendererFramework: params => {
        const { value } = params;
        return <CategoriesCell value={value} />;
      },
      filterParams: {
        textFormatter: value => value,
        textCustomComparator: genreComparator,
        filterOptions: ['contains', 'notContains'],
        debounceMs: 200,
      },
      minWidth: 200,
      cellClass: textClass,
    },
    {
      headerName: 'Ngày ra mắt',
      field: 'releaseDate',
      sortable: true,
      sort: 'desc',
      filter: true,
      valueGetter: params => epochToDate(params.data.releaseDate),
      comparator: (date1, date2) => dateToUnix(date1) - dateToUnix(date2),
    },
    {
      headerName: 'Tác vụ',
      field: 'operations',
      cellRendererFramework: params => {
        return <OperationsCell {...params} />;
      },
    },
  ];

  // Default column definitions
  const defaultColDef = {
    suppressMenu: true,
    minWidth: 200,
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
    <React.Fragment>
      <div className={styles.user_list_container}>
        <div className={styles.buttons_container}>
          <IconButton onClick={refetch} icon={refreshIcon} text="Tải lại" />

          <AddButton refetch={refetch} categories={categories} />
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
                  api: 'movie',
                  method: 'GET',
                }),
              categories: categories,
            }}
            rowHeight={250}
            localeText={localeText}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
