import React, { useState, useEffect } from 'react';

import { useRequest } from 'Utils/request';

import moment from 'moment';
import { css } from 'emotion';

import { AgGridReact } from 'ag-grid-react';
import { IconButton } from 'Components/Shared/Buttons';
import AddButton from './AddMovie';
import DeleteButton from './DeleteMovie';
import EditButton from './EditMovie';

import refreshIcon from '@iconify/icons-mdi/refresh';

import styles from 'SCSS/UserList.module.scss';
import 'SCSS/Admin/AgGrid.scss';

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

    // Show loading overlay
    params.api.showLoadingOverlay();
  }

  // Style for name columns
  const textClass = css`
    line-height: 24px !important;
    white-space: normal;
  `;

  // Grid columns
  const columns = [
    {
      headerName: 'Poster',
      field: 'img',
      cellRendererFramework: PosterRenderer,
      width: 179,
    },
    {
      headerName: 'Tên Tiếng Anh',
      field: 'nameEn',
      sortable: true,
      filter: true,
      minWidth: 200,
      cellClass: textClass,
      resizable: true,
    },
    {
      headerName: 'Tên Tiếng Việt',
      field: 'nameVn',
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 200,
      cellClass: textClass,
    },
    {
      headerName: 'Thể loại',
      field: 'categories',
      sortable: true,
      resizable: true,
      filter: true,
      cellRendererFramework: CategoriesRenderer,
      minWidth: 200,
      cellClass: textClass,
      valueGetter: params => {
        const {
          data: { categories: categoryIds },
          context: { categories: categoryNames },
        } = params;

        if (!Object.keys(categoryNames).length) return 'Loading...';

        return categoryIds.map(id => categoryNames[id]).join(', ');
      },
    },
    {
      headerName: 'Ngày ra mắt',
      field: 'releaseDate',
      sortable: true,
      filter: true,
      valueGetter: params => {
        return moment.utc(params.data.releaseDate).format('DD/MM/YYYY');
      },
    },
    {
      headerName: 'Tác vụ',
      field: 'operations',
      cellRendererFramework: OperationsRenderer,
    },
  ];

  // Default column definitions
  const defaultColDef = {
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
  /*----- GRID CELL RENDERERS -----*/

  function PosterRenderer(params) {
    const {
      data: { img },
    } = params;

    const container = css`
      width: 143px;
      height: 212px;
      background: #e3e3e3;
    `;

    const image = css`
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    `;

    return (
      <div className={container}>
        <img
          className={image}
          src={`${process.env.REACT_APP_BACKEND}/image/${img}`}
          alt=""
        />
      </div>
    );
  }

  function CategoriesRenderer(params) {
    const { value } = params;

    // Canvas to measure string length in pixels
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    ctx.font = '16px Roboto';

    return (
      <div>
        {value
          .split(', ')
          .sort((a, b) => {
            // Calculate string length in pixels using the canvas above
            let aWidth = ctx.measureText(a).width;
            let bWidth = ctx.measureText(b).width;

            // Sort strings based on pixels length (ascending)
            return bWidth - aWidth;
          })
          .map((genre, index, array) => (
            <React.Fragment key={genre}>
              {genre}
              {index !== array.length - 1 && <br />}
            </React.Fragment>
          ))}
      </div>
    );
  }

  function OperationsRenderer(params) {
    const {
      data,
      api,
      context: { refetch, categories },
      rowIndex,
    } = params;

    return (
      <div style={{ display: 'flex' }}>
        <EditButton
          rowIndex={rowIndex}
          gridApi={api}
          data={data}
          refetch={refetch}
          categories={categories}
        />
        <DeleteButton gridApi={api} data={data} refetch={refetch} />
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
            floatingFilter={true}
            context={{
              refetch: () =>
                sendRequest({
                  api: 'movie',
                  method: 'GET',
                }),
              categories: categories,
            }}
            rowHeight={250}
          />
        </div>
      </div>
    </>
  );
}
