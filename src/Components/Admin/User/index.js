import React, { useState, useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { getCurrentUser } from 'Utils/auth';

import Avatar from 'Components/Shared/Avatar.js';
import { AgGridReact } from 'ag-grid-react';
import { useLazyRequest } from 'Utils/request';
import { Icon } from '@iconify/react';

import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import AdminToggle from './AdminToggle';

import deleteIcon from '@iconify/icons-mdi/delete';
import refreshIcon from '@iconify/icons-mdi/refresh';
import accountPlus from '@iconify/icons-mdi/account-plus';

import styles from 'SCSS/UserList.module.scss';

import 'SCSS/UserAgGrid.scss';

export default function User() {
  /*----- GRID SETUP -----*/

  // Grid API
  const [gridApi, setGridApi] = useState(null);

  // Grid loading
  const [gridLoading, setGridLoading] = useState(false);

  // Show loading overlay when something is loading
  useEffect(() => {
    if (!gridApi) return;

    if (gridLoading) {
      gridApi.showLoadingOverlay();
    } else {
      gridApi.hideOverlay();
    }
  }, [gridLoading]);

  // On grid ready => Get grid api and request user list
  function onGridReady(params) {
    setGridApi(params.api);
    userRequest({
      api: 'user',
      method: 'GET',
    });
  }

  // Grid columns
  const columns = [
    {
      headerName: 'Image',
      field: 'image',
      cellRenderer: 'imageRenderer',
    },
    {
      headerName: 'Username',
      field: 'username',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Is Admin',
      field: 'roles',
      cellRenderer: 'roleRenderer',
    },
    {
      headerName: 'Delete',
      field: 'delete',
      cellRenderer: 'deleteRenderer',
    },
  ];

  // Default column definitions
  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };

  // Grid rows (Get data from API)
  const [rows, setRows] = useState([]);

  /*----- GRID SETUP -----*/
  //
  //
  //
  //
  //
  /*----- REQUEST USER LIST API -----*/

  const [
    userRequest,
    {
      data: userResponse,
      error: userError,
      loading: userLoading,
      refetch: userRefetch,
    },
  ] = useLazyRequest();

  // User list loading => Show loading overlay
  useEffect(() => {
    if (!userLoading) return;
    setGridLoading(true);
  }, [userLoading]);

  // User list response => Hide loading overlay and set row data
  useEffect(() => {
    if (!userResponse) return;
    setGridLoading(false);
    setRows(userResponse.data);
  }, [userResponse]);

  // User list error => Hide loading overlay and log error
  useEffect(() => {
    if (!userError) return;
    setGridLoading(false);
    console.log('User list error:', userError);
  }, [userError]);

  /*----- REQUEST USER LIST API -----*/
  //
  //
  //
  //
  //
  /*----- GRID CELL RENDERERS -----*/

  function ImageRenderer(props) {
    return (
      <div style={{ width: 40, height: 40 }}>
        <Avatar id={props.data.img} />
      </div>
    );
  }

  function RoleRenderer(props) {
    const {
      id,
      roles: [{ role }],
    } = props.data;

    console.log(props.data);

    return (
      <AdminToggle
        style={{
          transform: 'scale(0.7)',
        }}
        userId={id}
        initial={role === 'ROLE_ADMIN'}
        onClick={() => setGridLoading(true)}
        onDone={() => setGridLoading(false)}
      />
    );
  }

  function DeleteRenderer(props) {
    const { data } = props;
    return (
      <div className={styles.buttons_container}>
        <IconButton onClick={() => deleteUser(data)} icon={deleteIcon} />
      </div>
    );
  }

  /*----- GRID CELL RENDERERS -----*/
  //
  //
  //
  //
  //
  /*----- MODALS SETUP -----*/

  // Show add user modal
  const [showAdd, setShowAdd] = useState(false);

  // Show delete confirm modal
  const [showDelete, setShowDelete] = useState(false);

  // Selected user ID
  const [selectedId, setSelectedId] = useState(undefined);

  /*----- MODALS SETUP -----*/
  //
  //
  //
  //
  //
  /*----- ATOMS -----*/

  function IconButton(props) {
    const { icon, onClick, text } = props;

    return (
      <div onClick={onClick} className={styles.icon_container}>
        <Icon className={styles.icon} icon={icon} />
        {text && <span>{text}</span>}
      </div>
    );
  }

  /*----- ATOMS -----*/
  //
  //
  //
  //
  /*----- ONCLICK FUNCTIONS -----*/

  function deleteUser(data) {
    setShowDelete(true);
    setSelectedId(data.id);
  }

  function addUser() {
    setShowAdd(true);
  }

  /*----- ONCLICK FUNCTIONS -----*/
  //
  //
  //
  //
  //

  return (
    <>
      <div className={styles.user_list_container}>
        <div className={styles.buttons_container}>
          <IconButton onClick={userRefetch} icon={refreshIcon} text="Refresh" />

          <IconButton
            onClick={addUser}
            icon={accountPlus}
            text="Add new user"
          />
        </div>

        <div
          className="ag-theme-alpine"
          style={{ height: '100%', width: '100%', marginTop: '10px' }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={columns}
            defaultColDef={defaultColDef}
            rowData={rows}
            rowSelection="multiple"
            suppressRowClickSelection
            suppressCellSelection
            frameworkComponents={{
              imageRenderer: ImageRenderer,
              deleteRenderer: DeleteRenderer,
              roleRenderer: RoleRenderer,
            }}
          />
        </div>
      </div>

      <AddUser
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onDone={userRefetch}
      />

      <DeleteUser
        show={showDelete}
        onHide={() => setShowDelete(false)}
        onDone={userRefetch}
        userId={selectedId}
      />
    </>
  );
}
