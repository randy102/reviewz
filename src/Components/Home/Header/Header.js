import React from 'react';

import SearchBar from './SearchBar';
import Brand from './Brand';
import {FilledButton2nd, OutlinedButton2nd} from '../../Common/Buttons';

import 'CSS/Home/Header/Header.css';
import { useHistory } from 'react-router-dom';

export default function Header() {
  const history = useHistory()
  
  return (
    <div className="header-container">
      <div className="header">
        <Brand />
        <SearchBar />
        <div className="buttons">
          <FilledButton2nd
            onClick={() => history.push('/Login')}
            text="Đăng nhập"
            style={{marginRight: 30}}
          />
          <OutlinedButton2nd
            onClick={() => history.push('./Register')}
            text="Đăng ký"
          />
        </div>
      </div>
    </div>
  );
}
