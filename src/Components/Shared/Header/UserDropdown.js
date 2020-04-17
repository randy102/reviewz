import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { getCurrentUser } from 'Utils/auth';
import { Icon } from '@iconify/react';

import accountIcon from '@iconify/icons-mdi/account';
import logoutIcon from '@iconify/icons-mdi/logout';

import EditProfile from 'Components/Profile';

import styles from 'SCSS/UserDropdown.module.scss';

export default function UserDropdown() {
  const { container, avatar, dropdown, item, fadeIn, fadeOut } = styles;

  const history = useHistory();

  const [showDropdown, setShowDropdown] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const imgId = getCurrentUser().img;

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
      <div onClick={onClick} className={item}>
        <Icon icon={icon} />
        <span>{text}</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={container}>
      <div onClick={() => setShowDropdown(!showDropdown)} className={avatar}>
        <img src={`${process.env.REACT_APP_BACKEND}image/${imgId}`} alt="" />
      </div>
      <div className={`${dropdown} ${showDropdown ? fadeIn : fadeOut}`}>
        <DropdownItem
          onClick={() => setShowProfile(true)}
          icon={accountIcon}
          text="Thông tin cá nhân"
        />
        <DropdownItem
          onClick={() => history.push('/logout')}
          icon={logoutIcon}
          text="Đăng xuất"
        />
      </div>
      <EditProfile show={showProfile} onHide={() => setShowProfile(false)} />
    </div>
  );
}
