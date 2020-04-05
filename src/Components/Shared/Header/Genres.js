import React, { useRef, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { Icon } from '@iconify/react';
import chevronLeft from '@iconify/icons-entypo/chevron-left';
import chevronRight from '@iconify/icons-entypo/chevron-right';
import {OutlinedButton2} from 'Components/Shared/Buttons';

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

  const history = useHistory();

  const content = useRef(null);

  const [rightDisabled, disableRight] = useState(false);
  const [leftDisabled, disableLeft] = useState(true);

  const scrollAmount = 300;

  function scrollLeft() {
    content.current.style.scrollSnapAlign = "start";

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
    content.current.style.scrollSnapAlign = "end";

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
        <button className="left" disabled={leftDisabled} onClick={scrollLeft}>
          <Icon className="chevron" icon={chevronLeft} />
        </button>

        <div ref={content} className="content">
          {genres.slice().map(({ name, path }, index) => (
            <OutlinedButton2
              key={index}
              className="item"
              onClick={() => history.push(path)}
              text={name}
            />
          ))}
        </div>

        <button className="right" disabled={rightDisabled} onClick={scrollRight}>
          <Icon className="chevron" icon={chevronRight} />
        </button>
      </div>
    </div>
  );
}
