import React, { useState, useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Image from 'Components/Shared/Image.js';
import { AgGridReact } from 'ag-grid-react';
import { useLazyRequest } from 'Utils/request';
import { Icon } from '@iconify/react';
import {
  EditUserModal,
  AddUserModal,
  DeleteUserModal,
} from 'Components/Admin/User/Modals';

import deleteIcon from '@iconify/icons-mdi/delete';
import refreshIcon from '@iconify/icons-mdi/refresh';
import accountPlus from '@iconify/icons-mdi/account-plus';
import pencilIcon from '@iconify/icons-mdi/pencil';

import styles from 'SCSS/UserList.module.scss';

export default function User() {
  /*----- GRID SETUP -----*/

  // Grid API
  const [gridApi, setGridApi] = useState();

  // On grid ready => Get gridApi and request user list
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
    },
    {
      headerName: 'Role',
      field: 'roles',
      valueFormatter: roleFormatter,
    },
    {
      headerName: 'Operations',
      field: 'operations',
      cellRenderer: 'operationsRenderer',
    },
  ];

  // Grid rows (Get data from API)
  const [rows, setRows] = useState([]);

  /*----- GRID SETUP -----*/
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  /*----- GRID VALUE FORMATTERS -----*/

  function roleFormatter(params) {
    let roles = params.value.flat(Infinity);
    return roles.length > 1 ? 'Admin' : 'User';
  }

  /*----- GRID VALUE FORMATTERS -----*/
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  /*----- GRID CELL RENDERERS -----*/

  function ImageRenderer(props) {
    return <Image id={props.data.img} />;
  }

  function OperationsRenderer(props) {
    const { data } = props;
    return (
      <div className={styles.buttons_container}>
        <IconButton onClick={() => editUser(data)} icon={pencilIcon} />
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
    gridApi.showLoadingOverlay();
  }, [userLoading]);

  // User list response => Hide loading overlay and set row data
  useEffect(() => {
    if (!userResponse) return;
    gridApi.hideOverlay();
    setRows(userResponse.data);
  }, [userResponse]);

  // User list error => Hide loading overlay and log error
  useEffect(() => {
    if (!userError) return;
    gridApi.hideOverlay();
    console.log('User list error:', userError);
  }, [userError]);

  /*----- REQUEST USER LIST API -----*/
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  /*----- MODALS SETUP -----*/

  // Show edit user modal
  const [showEdit, setShowEdit] = useState(false);

  // Show add user modal
  const [showAdd, setShowAdd] = useState(false);

  // Show delete confirm modal
  const [showDelete, setShowDelete] = useState(false);

  // Selected user is an Admin
  const [selectedIsAdmin, setSelectedIsAdmin] = useState(undefined);

  // Selected user ID
  const [selectedId, setSelectedId] = useState(undefined);

  /*----- MODALS SETUP -----*/
  //
  //
  //
  //
  //
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
  //
  //
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

  function editUser(data) {
    setShowEdit(true);
    setSelectedId(data.id);
    setSelectedIsAdmin(data.roles.length > 1);
  }

  /*----- ONCLICK FUNCTIONS -----*/
  //
  //
  //
  //
  //
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
            rowData={rows}
            rowSelection="multiple"
            suppressRowClickSelection
            suppressCellSelection
            frameworkComponents={{
              imageRenderer: ImageRenderer,
              operationsRenderer: OperationsRenderer,
            }}
          />
        </div>
      </div>

      <EditUserModal
        userId={selectedId}
        isAdmin={selectedIsAdmin}
        show={showEdit}
        onHide={() => setShowEdit(false)}
        onDone={userRefetch}
      />

      <AddUserModal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onDone={userRefetch}
      />

      <DeleteUserModal
        show={showDelete}
        onHide={() => setShowDelete(false)}
        onDone={userRefetch}
        userId={selectedId}
      />
    </>
  );
}
