import React from 'react';

import fileExport from '@iconify/icons-mdi/file-export';
import { IconButton } from 'Components/Shared/Buttons';

export default function ExportUser(props) {
  const { gridApi } = props;

  return (
    <IconButton
      onClick={() =>
        gridApi.exportDataAsCsv({
          columnKeys: ['username', 'roles'],
        })
      }
      icon={fileExport}
      text="Xuất file"
    />
  );
}
