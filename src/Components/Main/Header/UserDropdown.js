import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { getCurrentUser } from 'Utils/auth';
import { Icon } from '@iconify/react';

import accountIcon from '@iconify/icons-mdi/account';
import logoutIcon from '@iconify/icons-mdi/logout';
import cogIcon from '@iconify/icons-mdi/cog';

import Avatar from 'Components/Shared/Avatar';

import EditProfile from 'Components/Main/Profile';

import styles from 'SCSS/UserDropdown.module.scss';

export default function UserDropdown() {
  const history = useHistory();

  const [showDropdown, setShowDropdown] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const containerRef = useRef();

  useEffect(() => {
    function hideOnClickOutside(event) {
      if (!containerRef.current.contains(event.target)) {
        setShowDropdown(false);
        document.removeEventListener('click', hideOnClickOutside);
      }
    }

    if (showDropdown) {
      document.addEventListener('click', hideOnClickOutside);
    }

    return () => {
      document.removeEventListener('click', hideOnClickOutside);
    };
  }, [showDropdown]);

  function DropdownItem(props) {
    const { onClick, icon, text } = props;

    return (
      <div onClick={onClick} className={styles.item}>
        <Icon icon={icon} />
        <span>{text}</span>
      </div>
    );
  }

  function logOut() {
    history.push({
      pathname: '/logout',
      prevPath: history.location.pathname,
    });
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className={styles.avatar}
      >
        <Avatar />
      </div>
      <div
        className={`${styles.dropdown} ${
          showDropdown ? styles.fadeIn : styles.fadeOut
        }`}
      >
        <DropdownItem
          onClick={() => setShowProfile(true)}
          icon={accountIcon}
          text="Thông tin cá nhân"
        />

        {getCurrentUser().roles[0].role === 'ROLE_ADMIN' && (
          <Link to="/admin" className={styles.item}>
            <Icon icon={cogIcon} />
            <span>Quản lý</span>
          </Link>
        )}

        <DropdownItem onClick={logOut} icon={logoutIcon} text="Đăng xuất" />
      </div>
      <EditProfile show={showProfile} onHide={() => setShowProfile(false)} />
    </div>
  );
}
