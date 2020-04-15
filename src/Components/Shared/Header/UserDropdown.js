import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { getCurrentUser } from 'Utils/auth';

import { Icon } from '@iconify/react';
import accountIcon from '@iconify/icons-mdi/account';
import logoutIcon from '@iconify/icons-mdi/logout';

import styles from 'SCSS/UserDropdown.module.scss';

export default function UserDropdown() {
  const { container, avatar, dropdown, item, fadeIn, fadeOut } = styles;

  const [show, setShow] = useState(false);

  const imgId = getCurrentUser().img;

  const containerRef = useRef();

  useEffect(() => {
    function hideOnClickOutside(event) {
      if (!containerRef.current.contains(event.target)) {
        setShow(false);
        document.removeEventListener('click', hideOnClickOutside);
      }
    }

    if (show) {
      document.addEventListener('click', hideOnClickOutside);
    }

    return () => {
      document.removeEventListener('click', hideOnClickOutside);
    };
  }, [show]);

  function DropdownItem(props) {
    const { to, icon, text } = props;

    return (
      <Link to={to} className={item}>
        <Icon icon={icon} />
        <span>{text}</span>
      </Link>
    );
  }

  return (
    <div ref={containerRef} className={container}>
      <div onClick={() => setShow(!show)} className={avatar}>
        <img src={`${process.env.REACT_APP_BACKEND}image/${imgId}`} alt="" />
      </div>
      <div className={`${dropdown} ${show ? fadeIn : fadeOut}`}>
        <DropdownItem
          to="/profile"
          icon={accountIcon}
          text="Thông tin cá nhân"
        />
        <DropdownItem to="/logout" icon={logoutIcon} text="Đăng xuất" />
      </div>
    </div>
  );
}
