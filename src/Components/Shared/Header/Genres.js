import React, { useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react';
import chevronLeft from '@iconify/icons-entypo/chevron-left';
import chevronRight from '@iconify/icons-entypo/chevron-right';

export default function Genres() {
  /*  Genre format:
      {
        name: genre name (String)
        path: path to page (String)
      }
  */
  const genres = [
    'Hành động',
    'Phiêu lưu',
    'Kinh dị',
    'Drama',
    'Giật gân',
    'Hài hước',
    'Lãng mạn',
    'Âm nhạc',
    'Tài liệu',
    'Lịch sử',
    'Chiến tranh',
    'Bí ẩn',
    'Tội phạm',
    'Kỳ ảo',
    'Khoa học viễn tưởng',
    'Viễn Tây',
    'Cổ trang',
    'Hoạt hình'
  ].map(name => ({
    name: name,
    path: '/'
  }));

  const content = useRef(null);

  const [rightDisabled, disableRight] = useState(false);

  const [leftDisabled, disableLeft] = useState(true);

  const scrollAmount = 300;

  function scrollLeft() {
    const { scrollLeft } = content.current;

    const newScroll = scrollLeft - scrollAmount;

    content.current.scrollLeft = newScroll;

    if (rightDisabled) {
      disableRight(false);
    }

    if (newScroll <= 0) {
      disableLeft(true);
    }
  }

  function scrollRight() {
    const { scrollWidth, clientWidth, scrollLeft } = content.current;

    const newScroll = scrollLeft + scrollAmount;

    content.current.scrollLeft = newScroll;

    if (leftDisabled) {
      disableLeft(false);
    }

    if (newScroll >= scrollWidth - clientWidth) {
      disableRight(true);
    }
  }

  return (
    <div className="genres-container">
      <div className="genres">
        <button disabled={leftDisabled} onClick={scrollLeft}>
          <Icon className="chevron chevron-left" icon={chevronLeft} />
        </button>

        <div ref={content} className="content">
          {genres.slice().map(({ name, path }) => (
            <Link key={name} to={path} className="item">
              {name}
            </Link>
          ))}
        </div>

        <button disabled={rightDisabled} onClick={scrollRight}>
          <Icon className="chevron chevron-right" icon={chevronRight} />
        </button>
      </div>
    </div>
  );
}
