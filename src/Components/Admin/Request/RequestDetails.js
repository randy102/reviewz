import React, { useState } from 'react';
import { IconButton } from 'Components/Shared/Buttons';
import eyeIcon from '@iconify/icons-mdi/eye';
import { css } from 'emotion';
import { Button, Form, Input, Modal } from 'antd';

const styles = css`
  pointer-events: none;
`;

export default function (props) {
  const { movieName, info } = props;

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
        title="Chi tiết yêu cầu"
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
          <Form.Item label="Tên phim">
            <Input defaultValue={movieName} className={styles} />
          </Form.Item>

          <Form.Item label="Thông tin thêm">
            <Input.TextArea
              defaultValue={info}
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
