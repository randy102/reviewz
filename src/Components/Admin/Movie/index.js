import React, { useState, useEffect } from 'react';
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
import CategoriesValueGetter from './ValueGetters/CategoriesValueGetter';

const posterColumn = {
  headerName: 'Poster',
  field: 'img',
  cellRendererFramework: ({ data }) => <PosterCell img={data.img} />,
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
    debounceMs: 200,
  },
  resizable: true,
};

const multiTextColumn = (headerName, field) => ({
  headerName: headerName,
  field: field,
  filter: true,
  valueGetter: params => CategoriesValueGetter(params, field),
  cellRendererFramework: ({ value }) => <CategoriesCell value={value} />,
  filterParams: {
    textFormatter: value => value,
    textCustomComparator: genreComparator,
    debounceMs: 200,
  },
  minWidth: 200,
  cellClass: css`
    line-height: 24px !important;
    white-space: normal;
  `,
});

const releaseDateColumn = {
  headerName: 'Ngày ra mắt',
  field: 'releaseDate',
  sortable: true,
  sort: 'desc',
  filter: true,
  valueGetter: params => epochToDate(params.data.releaseDate),
  comparator: (date1, date2) => dateToUnix(date1) - dateToUnix(date2),
  cellClass: css`
    font-size: 16px;
    font-family: Roboto;
  `,
};

const operationsColumn = {
  headerName: 'Tác vụ',
  field: 'operations',
  cellRendererFramework: params => {
    const {
      api,
      context: { refetch },
    } = params;

    const { data, context } = params;

    return (
      <div style={{ display: 'flex' }}>
        <EditMovie data={data} context={context} />
        <DeleteMovie gridApi={api} data={data} refetch={refetch} />
      </div>
    );
  },
};

// Column definitions
const columnDefs = [
  posterColumn,
  movieNameColumn,
  multiTextColumn('Thể loại', 'categories'),
  multiTextColumn('Đạo diễn', 'directors'),
  multiTextColumn('Diễn viên', 'actors'),
  releaseDateColumn,
  operationsColumn,
];

// Default column definitions
const defaultColDef = {
  suppressMenu: true,
  minWidth: 200,
};

export default function Movie() {
  // Grid rows (Data from API)
  const [rows, setRows] = useState([]);

  // Get movies API
  const [
    getMovies,
    { loading: gettingMovies, refetch: refetchMovies },
  ] = useRequest({
    onError: error => console.log('Get movies error:', error),
    onResponse: response => {
      setRows(response.data);
      gridApi && gridApi.redrawRows();
    },
  });

  // Categories
  const [categories, setCategories] = useState([]);

  // Get categories
  const [getCategories, { loading: gettingCategories }] = useRequest({
    onError: error => console.log('Get categories error:', error),
    onResponse: response => setCategories(response.data),
  });

  // Directors
  const [directors, setDirectors] = useState([]);

  // Get directors API
  const [getDirectors, { loading: gettingDirectors }] = useRequest({
    onError: error => console.log('Get directors error:', error),
    onResponse: response => setDirectors(response.data),
  });

  // Actors
  const [actors, setActors] = useState([]);

  // Get actors API
  const [getActors, { loading: gettingActors }] = useRequest({
    onError: error => console.log('Get actors error:', error),
    onResponse: response => setActors(response.data),
  });

  // Show grid loading overlay when getting genres or movies
  useEffect(() => {
    if (!gridApi) return;

    gettingCategories || gettingMovies || gettingDirectors || gettingActors
      ? gridApi.showLoadingOverlay()
      : gridApi.hideOverlay();
  }, [gettingCategories, gettingMovies, gettingDirectors, gettingActors]);

  // Grid API
  const [gridApi, setGridApi] = useState(null);

  // On grid ready
  function onGridReady(params) {
    // Set grid api
    setGridApi(params.api);

    // Get genres
    getCategories({
      api: 'category',
      method: 'GET',
    });

    // Get movies
    getMovies({
      api: 'movie',
      method: 'GET',
    });

    // Get directors
    getDirectors({
      api: 'director',
      method: 'GET',
    });

    // Get actors
    getActors({
      api: 'actor',
      method: 'GET',
    });
  }

  return (
    <React.Fragment>
      <div className={styles.user_list_container}>
        <div className={styles.buttons_container}>
          <IconButton
            onClick={refetchMovies}
            icon={refreshIcon}
            text="Tải lại"
          />

          <AddMovie
            refetch={refetchMovies}
            categories={categories}
            directors={directors}
            actors={actors}
          />

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
              refetch: () => {
                getMovies({
                  api: 'movie',
                  method: 'GET',
                });
              },
              categories: categories,
              directors: directors,
              actors: actors,
            }}
            rowHeight={250}
            localeText={localeText}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
