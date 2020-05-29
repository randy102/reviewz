import React, { useState, useEffect, useContext } from 'react';
import { useRequest } from 'Utils/request';
import { AgGridReact } from 'ag-grid-react';
import { IconButton } from 'Components/Shared/Buttons';
import PosterCell from './Cell Renderers/PosterCell';
import MovieNameCell from './Cell Renderers/MovieNameCell';
import CategoriesCell from './Cell Renderers/CategoriesCell';
import DeleteMovie from './DeleteMovie';
import EditMovie from './EditMovie';
import AddMovie from './AddMovie';
import ExportMovies from './ExportMovies';
import movieNameComparator from './Filter Comparators/movieNameComparator';
import genreComparator from './Filter Comparators/genreComparator';
import dateToUnix from 'Utils/helpers/dateToUnix';
import localeText from '../localeText';
import epochToDate from 'Utils/helpers/unixToDate';
import { css } from 'emotion';
import refreshIcon from '@iconify/icons-mdi/refresh';
import styles from 'SCSS/UserList.module.scss';
import 'SCSS/Admin/AgGrid.scss';

const posterColumn = {
  headerName: 'Poster',
  field: 'img',
  cellRendererFramework: params => {
    const { img } = params.data;
    return <PosterCell img={img} />;
  },
  width: 179,
};

const movieNameColumn = {
  headerName: 'Tên phim',
  field: 'name',
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
};

const genresColumn = {
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
  cellClass: css`
    line-height: 24px !important;
    white-space: normal;
  `,
};

const releaseDateColumn = {
  headerName: 'Ngày ra mắt',
  field: 'releaseDate',
  sortable: true,
  sort: 'desc',
  filter: true,
  valueGetter: params => epochToDate(params.data.releaseDate),
  comparator: (date1, date2) => dateToUnix(date1) - dateToUnix(date2),
};

const operationsColumn = {
  headerName: 'Tác vụ',
  field: 'operations',
  cellRendererFramework: params => {
    const {
      data,
      api,
      context: { refetch, categories },
      node,
    } = params;

    return (
      <div style={{ display: 'flex' }}>
        <EditMovie
          rowNode={node}
          gridApi={api}
          data={data}
          refetch={refetch}
          categories={categories}
        />
        <DeleteMovie gridApi={api} data={data} refetch={refetch} />
      </div>
    );
  },
};

// Column definitions
const columnDefs = [
  posterColumn,
  movieNameColumn,
  genresColumn,
  releaseDateColumn,
  operationsColumn,
];

// Default column definitions
const defaultColDef = {
  suppressMenu: true,
  minWidth: 200,
};

export default function Movie() {
  // Row data for grid
  const [rowData, setRowData] = useState([]);

  // Get movies API
  const [
    getMovies,
    { loading: gettingMovies, refetch: refetchMovies },
  ] = useRequest({
    onError: error => {
      console.log('Movie list error:', error);
    },
    onResponse: response => {
      setRowData(response.data);
    },
  });

  // Genres
  const [genres, setGenres] = useState({});

  // Get genres API
  const [getGenres, { loading: gettingGenres }] = useRequest({
    onError: error => {
      console.log('Category list error:', error);
    },
    onResponse: response => {
      setGenres(
        response.data.reduce((map, category) => {
          const { id, name } = category;
          map[id] = name;
          return map;
        }, {})
      );
    },
  });

  // Show grid loading overlay when getting genres or movies
  useEffect(() => {
    if (!gridApi) return;

    if (gettingGenres || gettingMovies) {
      gridApi.showLoadingOverlay();
    } else {
      setRows(rowData);
      gridApi.hideOverlay();
    }
  }, [gettingGenres, gettingMovies]);

  // Grid API
  const [gridApi, setGridApi] = useState(null);

  // On grid ready
  function onGridReady(params) {
    // Set grid api
    setGridApi(params.api);

    // Get genres
    getGenres({
      api: 'category',
      method: 'GET',
    });

    // Get movies
    getMovies({
      api: 'movie',
      method: 'GET',
    });
  }

  // Grid rows (Data from API)
  const [rows, setRows] = useState([]);

  return (
    <React.Fragment>
      <div className={styles.user_list_container}>
        <div className={styles.buttons_container}>
          <IconButton
            onClick={refetchMovies}
            icon={refreshIcon}
            text="Tải lại"
          />

          <AddMovie refetch={refetchMovies} categories={genres} />

          <ExportMovies gridApi={gridApi} />
        </div>

        <div
          className="ag-theme-alpine"
          style={{ height: '500px', width: '100%', marginTop: '10px' }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowData={rows}
            suppressRowClickSelection
            suppressCellSelection
            floatingFilter
            animateRows
            context={{
              refetch: () =>
                getMovies({
                  api: 'movie',
                  method: 'GET',
                }),
              categories: genres,
            }}
            rowHeight={250}
            localeText={localeText}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
