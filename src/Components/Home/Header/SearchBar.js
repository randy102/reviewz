import React from 'react';

import { Icon } from '@iconify/react'; 
import searchIcon from '@iconify/icons-uil/search';

export default function SearchBar() {
  return (
    <div className="search-bar">
      <input className="search-input" placeholder="Tìm phim..."></input>
      <Icon className="search-icon" icon={searchIcon} />
    </div>
  );
}
