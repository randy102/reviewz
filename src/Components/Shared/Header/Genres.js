import React, { useRef, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { Icon } from '@iconify/react';
import chevronLeft from '@iconify/icons-entypo/chevron-left';
import chevronRight from '@iconify/icons-entypo/chevron-right';
import {TextButton} from 'Components/Shared/Buttons';

import styles from 'SCSS/Header.module.scss';

export default function Genres() {
  /*  Genre format:
      {
        name: genre name (String)
        path: path to page (String)
      }
  */
  const data = [
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

  const contentRef = useRef(null);

  const [rightDisabled, disableRight] = useState(false);
  const [leftDisabled, disableLeft] = useState(true);

  const scrollAmount = 300;

  function scrollLeft() {
    contentRef.current.style.scrollSnapAlign = "start";

    const { scrollLeft } = contentRef.current;

    const newScroll = scrollLeft - scrollAmount;

    contentRef.current.scrollLeft = newScroll;

    if (rightDisabled) {
      disableRight(false);
    }

    if (newScroll <= 0) {
      disableLeft(true);
    }
  }

  function scrollRight() {
    contentRef.current.style.scrollSnapAlign = "end";

    const { scrollWidth, clientWidth, scrollLeft } = contentRef.current;

    const newScroll = scrollLeft + scrollAmount;

    contentRef.current.scrollLeft = newScroll;

    if (leftDisabled) {
      disableLeft(false);
    }

    if (newScroll >= scrollWidth - clientWidth) {
      disableRight(true);
    }
  }

  const {
    genres_container,
    genres,
    right,
    left,
    chevron,
    content,
    item,
  } = styles;
  
  return (
    <div className={genres_container}>
      <div className={genres}>
        <button className={left} disabled={leftDisabled} onClick={scrollLeft}>
          <Icon className={chevron} icon={chevronLeft} />
        </button>

        <div ref={contentRef} className={content}>
          {data.map(({ name, path }, index) => (
            <TextButton
              key={index}
              className={item}
              onClick={() => history.push(path)}
              text={name}
            />
          ))}
        </div>

        <button className={right} disabled={rightDisabled} onClick={scrollRight}>
          <Icon className={chevron} icon={chevronRight} />
        </button>
      </div>
    </div>
  );
}
