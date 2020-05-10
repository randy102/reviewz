import React from 'react';

import fileExport from '@iconify/icons-mdi/file-export';
import { IconButton } from 'Components/Shared/Buttons';

export default function ExportMovies(props) {
  const { gridApi } = props;

  return (
    <IconButton
      onClick={() =>
        gridApi.exportDataAsCsv({
          columnKeys: ['name', 'categories', 'releaseDate'],
          processCellCallback: params => {
            switch (params.column.colId) {
              case 'name':
                const { nameEn, nameVn } = params.value;
                return `${nameEn} (${nameVn})`;
              case 'releaseDate':
                return ` ${params.value}`;
              case 'categories':
                return params.value.join(', ');
              default:
                break;
            }
          },
        })
      }
      icon={fileExport}
      text="Xuất file"
    />
  );
}
