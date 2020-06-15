import React, { useState } from 'react';
import { IconButton } from 'Components/Shared/Buttons';
import eyeIcon from '@iconify/icons-mdi/eye';
import StarRating from 'Components/Main/MovieDetails/StarRating';
import { css } from 'emotion';
import { Form, Input, Modal, Button } from 'antd';

const styles = css`
  pointer-events: none;
`;

export default function ReviewDetails(props) {
  const { star = 0, content = '' } = props;

  const [visible, setVisible] = useState(false);

  function showModal() {
    setVisible(true);
  }

  function hideModal() {
    setVisible(false);
  }

  return (
    <React.Fragment>
      <IconButton onClick={showModal} icon={eyeIcon} />
      <Modal
        visible={visible}
        title="Chi tiết bài đánh giá"
        onCancel={hideModal}
        okText="OK"
        cancelText="Trở về"
        footer={[
          <Button key="back" type="primary" onClick={hideModal}>
            OK
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Điểm">
            <StarRating disabled defaultValue={star} />
          </Form.Item>

          <Form.Item label="Nhận xét">
            <Input.TextArea
              defaultValue={content}
              unselectable="off"
              rows="4"
              className={styles}
            />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}
