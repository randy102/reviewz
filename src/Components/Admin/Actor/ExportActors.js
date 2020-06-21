import React from 'react';

import fileExport from '@iconify/icons-mdi/file-export';
import { IconButton } from 'Components/Shared/Buttons';

export default function (props) {
  const { gridApi } = props;

  return (
    <IconButton
      onClick={() =>
        gridApi.exportDataAsCsv({
          columnKeys: ['name'],
        })
      }
      icon={fileExport}
      text="Xuất file"
    />
  );
}
