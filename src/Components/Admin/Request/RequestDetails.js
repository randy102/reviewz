import React from 'react';
import { IconButton } from 'Components/Shared/Buttons';
import eyeIcon from '@iconify/icons-mdi/eye';
import { Modal } from 'react-bootstrap';
import { css } from 'emotion';
import colors from 'Components/Shared/theme';

const styles = {
  modal: css`
    color: ${colors.black};
  `,
  title: css`
    color: ${colors.black};
    font-weight: bold;
  `,
  infoContainer: css`
    padding: 10px;
    border: 1px solid ${colors.black};
    border-radius: 10px;
  `,
  info: css`
    resize: none;
    font-size: 16px;
    line-height: 19px;
    width: 100%;
    display: block;
    background: transparent;
    color: ${colors.black};

    &::-webkit-scrollbar {
      width: 7px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: ${colors.black};
      cursor: pointer;
    }

    &:disabled {
      background: transparent;
    }
  `,
};

export default function (props) {
  const { movieName, info } = props;

  const [show, setShow] = React.useState(false);

  return (
    <React.Fragment>
      <IconButton onClick={() => setShow(true)} icon={eyeIcon} />

      <Modal
        dialogClassName={styles.modal}
        centered
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header>
          <Modal.Title className={styles.title}>Chi tiết yêu cầu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: '1rem' }}>
            Tên phim: <b>{movieName}</b>
          </div>
          <div>
            <label>Thông tin phim:</label>
            <div className={styles.infoContainer}>
              <textarea
                className={styles.info}
                defaultValue={info}
                rows="4"
                disabled
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
