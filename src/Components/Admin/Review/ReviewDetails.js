import React, { useState } from 'react';
import { IconButton } from 'Components/Shared/Buttons';
import eyeIcon from '@iconify/icons-mdi/eye';
import { Modal } from 'react-bootstrap';
import StarRating from 'Components/Main/MovieDetails/StarRating';
import { css } from 'emotion';
import colors from 'Components/Shared/colors';

const styles = {
  modal: css`
    width: fit-content;
  `,
  title: css`
    color: ${colors.black};
    font-weight: bold;
  `,
  contentContainer: css`
    padding: 10px;
    margin-top: 20px;
    border: 1px solid ${colors.black};
    border-radius: 10px;
  `,
  content: css`
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

export default function ReviewDetails(props) {
  const { star = 0, content = '' } = props;

  const [show, setShow] = useState(false);

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
          <Modal.Title className={styles.title}>Chi tiết review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StarRating disabled defaultValue={star} />
          <div className={styles.contentContainer}>
            <textarea
              className={styles.content}
              defaultValue={content}
              rows="4"
              disabled
            ></textarea>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
