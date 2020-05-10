import React from 'react';

import fileExport from '@iconify/icons-mdi/file-export';
import { IconButton } from 'Components/Shared/Buttons';

export default function ExportReviews(props) {
  const { gridApi } = props;

  return (
    <IconButton
      onClick={() =>
        gridApi.exportDataAsCsv({
          columnKeys: ['user', 'movie', 'star', 'date', 'verified'],
          processCellCallback: params => {
            console.log('column id:', params.column.colId);
            switch (params.column.colId) {
              case 'user':
              case 'star':
              case 'verified':
                return params.value;
              case 'movie':
                const { nameEn, nameVn } = params.value;
                return `${nameEn} (${nameVn})`;
              case 'date':
                return ` ${params.value}`;
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
