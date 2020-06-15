import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { getCurrentUser } from 'Utils/auth';
import { Icon } from '@iconify/react';

import accountIcon from '@iconify/icons-mdi/account';
import logoutIcon from '@iconify/icons-mdi/logout';
import cogIcon from '@iconify/icons-mdi/cog';

import Avatar from 'Components/Shared/Avatar';

import { css } from 'emotion';
import colors from 'Components/Shared/theme';
import Color from 'color';
import Profile from './Profile';

const avatarSize = '44px';
const dropdownMarginTop = '10px';
const dropdownTriangleSize = '10px';

const styles = {
  container: css`
    position: relative;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: Roboto;
  `,
  avatar: css`
    border-radius: 999px;
    height: ${avatarSize};
    width: ${avatarSize};
    cursor: pointer;
    overflow: hidden;
  `,
  dropdown: css`
    background: ${colors.white};
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 9999;
    width: fit-content;
    padding: 10px;
    margin-top: calc(${dropdownMarginTop} + ${dropdownTriangleSize});
    transition: opacity 0.2s ease-in-out;
    border-radius: 3px;
    box-shadow: 0 0 10px ${Color(colors.black).alpha(0.3).string()};

    &:before {
      content: '';
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      top: 0;
      right: 0;
      transform: translateY(-100%) translateX(calc(-${avatarSize} / 2 + 50%));
      border: ${dropdownTriangleSize} solid transparent;
      border-bottom-color: ${colors.white};
    }
  `,
  item: css`
    cursor: pointer;
    display: flex;
    align-items: center;
    color: ${colors.black};
    text-decoration: none;

    span {
      white-space: nowrap;
    }

    svg {
      margin-right: 5px;
      color: inherit;
      width: 20px;
      height: auto;
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &:hover {
      color: ${colors.primary};
    }
  `,
  fadeIn: css`
    opacity: 1;
  `,
  fadeOut: css`
    opacity: 0;
    pointer-events: none;
  `,
};

function DropdownItem(props) {
  const { onClick, icon, text } = props;

  return (
    <div onClick={onClick} className={styles.item}>
      <Icon icon={icon} />
      <span>{text}</span>
    </div>
  );
}

export default function UserDropdown() {
  const history = useHistory();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [profileVisible, setProfileVisible] = useState(false);

  const containerRef = useRef();

  // Hide dropdown when click outside or unmount
  useEffect(() => {
    function handleClickAway(event) {
      // If clicked outside the dropdown
      if (!containerRef.current.contains(event.target)) {
        // Hide the dropdown
        hideDropdown();
        // Remove the listener
        document.removeEventListener('click', handleClickAway);
      }
    }

    // If the dropdown is visible
    if (dropdownVisible) {
      // Add listener for when the user clicks outside the dropdown
      document.addEventListener('click', handleClickAway);
    }

    // On unmount => Remove the listener
    return () => {
      document.removeEventListener('click', handleClickAway);
    };
  }, [dropdownVisible]);

  function hideDropdown() {
    setDropdownVisible(false);
  }

  // Toggle dropdown
  function toggleDropdown() {
    setDropdownVisible(!dropdownVisible);
  }

  function showProfile() {
    setProfileVisible(true);
  }

  // On profile click
  function handleProfileClick() {
    showProfile();
    hideDropdown();
  }

  // On logout click
  function handleLogoutClick() {
    history.push({
      pathname: '/logout',
      prevPath: history.location.pathname,
    });
  }

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Toggle drop down on Avatar click */}
      <div onClick={toggleDropdown} className={styles.avatar}>
        <Avatar />
      </div>

      {/* Dropdown */}
      <div
        className={`${styles.dropdown} ${
          dropdownVisible ? styles.fadeIn : styles.fadeOut
        }`}
      >
        {/* Profile */}
        <DropdownItem
          onClick={handleProfileClick}
          icon={accountIcon}
          text="Thông tin cá nhân"
        />

        {/* If this user is admin, show link to Admin page */}
        {getCurrentUser().roles[0].role === 'ROLE_ADMIN' && (
          <Link to="/admin" className={styles.item}>
            <Icon icon={cogIcon} />
            <span>Quản lý</span>
          </Link>
        )}

        {/* Logout */}
        <DropdownItem
          onClick={handleLogoutClick}
          icon={logoutIcon}
          text="Đăng xuất"
        />
      </div>

      {/* Profile drawer */}
      <Profile visible={profileVisible} setVisible={setProfileVisible} />
    </div>
  );
}
