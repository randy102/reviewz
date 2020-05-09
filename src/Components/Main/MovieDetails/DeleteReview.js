import React from 'react';
import { IconButton } from 'Components/Shared/Buttons';
import deleteIcon from '@iconify/icons-mdi/delete';
import { useRequest } from 'Utils/request';

export default function DeleteReview(props) {
  const {
    id,
    className,
    setFormState,
    refetchReviews,
    setMyReview,
    setValue,
  } = props;

  const [sendRequest] = useRequest({
    onError: error => {
      console.log('Delete review error:', error);
    },
    onResponse: response => {
      refetchReviews();
    },
  });

  function handleClick() {
    if (!window.confirm('Bạn có chắc là muốn xóa bài review này?')) {
      return;
    }

    sendRequest({
      api: `review/${id}`,
      method: 'DELETE',
    });

    setFormState('new');
    setMyReview(undefined);
    setValue([
      {
        star: 0,
      },
      {
        content: '',
      },
    ]);
  }

  return (
    <IconButton
      onClick={handleClick}
      className={className}
      icon={deleteIcon}
      text="Xóa"
    />
  );
}
