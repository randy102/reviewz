import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useLazyRequest } from 'Utils/request';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Image from 'Components/Shared/Image.js';

export default function UserList() {
  const [sendRequest, { data: response, error, loading, refetch }] = useLazyRequest();
  const [gridApi, setGridApi] = useState();

  const rolesMapping = {
    ROLE_ADMIN: 'Admin',
    ROLE_USER: 'User',
  };

  const [columns, setColumns] = useState([
    { headerName: 'Image', field: 'image', checkboxSelection: true },
    { headerName: 'Username', field: 'username' },
    {
      headerName: 'Roles',
      field: 'roles',
      valueFormatter: params => {
        return params.value.map(({ role }) => rolesMapping[role]).join(', ');
      },
    },
    { headerName: 'Operations', field: 'operations' },
  ]);

  const [rows, setRows] = useState([]);
  

  // Loading
  useEffect(function() {
    console.log('Loading:', loading);
  }, [loading]);

  // Error
  useEffect(function() {
    console.log('Error:', error);
  }, [error]);

  // Response
  useEffect(function() {
    if (!response) return;

    console.log('Response:', response);

    setRows(response.data);
  }, [response]);

  // On grid ready => Get gridApi, set loading overlay and request user list
  function onGridReady(params) {
    setGridApi(params.api);
    sendRequest({
      api: 'user',
      method: 'GET',
    });
    params.api.showLoadingOverlay();
  }

  function getSelectedIds() {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedIds = selectedNodes.map(node => node.data.id);
    console.log('Selected IDs:', selectedIds);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "700px", width: "900px" }}>
      <button onClick={getSelectedIds}>Get selected IDs</button>
      <button onClick={() => refetch()}>Refetch data</button>

      <AgGridReact
        onGridReady={onGridReady}
        columnDefs={columns}
        rowData={rows}
        rowSelection="multiple"
        suppressRowClickSelection
        suppressCellSelection
      />
    </div>
  );
}