import React from 'react';

export default function Image({id}) {
  return <img src={`${process.env.REACT_APP_BACKEND}image/${id}`} alt="" />;
}