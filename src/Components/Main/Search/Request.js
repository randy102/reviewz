import React, { useState } from 'react';
import { css } from 'emotion';
import colors from 'Components/Shared/colors';
import { Modal, Input, notification } from 'antd';
import { useRequest } from 'Utils/request';
import { SmileOutlined, CheckCircleOutlined } from '@ant-design/icons';

const styles = {
  request: css`
    color: ${colors.primary};
    cursor: pointer;
  `,
  notificationIcon: css`
    font-size: 24px;
    line-height: 100% !important;
    color: ${colors.primary} !important;

    svg {
      font-size: inherit;
    }
  `,
};

export default function Request(props) {
  const [visible, setVisible] = useState(false);

  const [movieName, setMovieName] = useState('');

  const [info, setInfo] = useState('');

  const [sendRequest, { loading }] = useRequest({
    onError: error => {
      console.log('Request movie error:', error);
      reset();
    },
    onResponse: response => {
      reset();
      notification.success({
        message: 'Phản hồi',
        description: 'Yêu cầu của bạn đã được ghi nhận.',
        icon: <CheckCircleOutlined className={styles.notificationIcon} />,
      });
    },
  });

  function reset() {
    setVisible(false);
    setInfo('');
    setMovieName('');
  }

  function handleSubmit() {
    sendRequest({
      api: 'request',
      method: 'POST',
      data: {
        movieName: movieName,
        info: info,
      },
    });
  }

  return (
    <div style={{ marginTop: 30 }}>
      <span>Không tìm thấy phim bạn muốn?</span>
      <span onClick={() => setVisible(true)} className={styles.request}>
        {' '}
        Yêu cầu phim mới
      </span>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={loading}
        onCancel={() => setVisible(false)}
      >
        <div>
          <label>Tên phim</label>
          <Input
            value={movieName}
            onChange={e => setMovieName(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <label>Thông tin phim</label>
          <Input.TextArea
            value={info}
            onChange={e => setInfo(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}
