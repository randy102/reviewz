import React, { useState } from 'react';
import { css, cx } from 'emotion';

import { Icon } from '@iconify/react';
import ErrorMessage from './ErrorMessage';

import styles from 'SCSS/Form.module.scss';

const ImageInput = React.forwardRef((props, ref) => {
  // Props destructuring
  const {
    placeholder = '',
    name,
    icon,
    errors,
    errorStyle,
    setError = () => null,
    clearError = () => null,
    defaultSrc = '',
  } = props;

  // Chosen image source
  const [src, setSrc] = useState(
    defaultSrc && `${process.env.REACT_APP_BACKEND}/image/${defaultSrc}`
  );

  function handleChange(event) {
    if (event.target.files.length === 0) {
      return;
    }

    if (event.target.files[0].type.split('/')[0] !== 'image') {
      setError(name, 'notImage', 'Poster phim phải là một file ảnh');
      setSrc('');
      return;
    }

    clearError(name);

    let reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = e => {
      setSrc(e.target.result);
    };
  }

  const classes = {
    container: css`
      cursor: pointer;
      border: 1px solid black;
      padding: 10px;
      color: #757575;
      width: 100%;
      position: relative;
      z-index: 0;
    `,
    placeholder: css`
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: -1;
    `,
    icon: css`
      align-self: flex-start;
      margin-top: 8px;
      flex-shrink: 0;
    `,
    image: css`
      max-width: 100%;
    `,
  };

  return (
    <div className={styles.row}>
      <div className={styles.row_input}>
        {icon && <Icon className={cx(styles.icon, classes.icon)} icon={icon} />}
        <input
          id="poster"
          style={{ display: 'none' }}
          type="file"
          onChange={handleChange}
          name={name}
          ref={ref}
        />
        <div
          className={classes.container}
          onClick={() => document.getElementById('poster').click()}
        >
          <div className={classes.placeholder}>{placeholder}</div>

          <img className={classes.image} src={src} alt="" />
        </div>
      </div>

      {errors[name] && (
        <ErrorMessage style={errorStyle} message={errors[name].message} />
      )}
    </div>
  );
});

export default ImageInput;
