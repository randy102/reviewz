import React from 'react';

import 'SCSS/Home/HomeCarousel.scss';

import Carousel from 'react-bootstrap/Carousel';

export default function HomeCarousel() {
  let images = [
    'https://galaxycine.vn/media/2020/3/2/ttpt-kc-2048x682_1583115134144.jpg',
    'https://galaxycine.vn/media/2020/3/12/bs-kc-2048x682_1584007167376.jpg',
    'https://galaxycine.vn/media/2020/3/9/n3-kc-2048x682_1583737549979.jpg',
  ].map(x => ({
    src: x,
    path: "/logout"
  }));

  return (
    <div className="container">
      <Carousel>
        {images.map((image) => (
          <Carousel.Item key={image}>
            <a href={image.path}>
              <img src={image.src} alt="" />
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
