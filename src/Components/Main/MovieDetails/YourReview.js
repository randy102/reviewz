import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import Rate from './Rate';
import { loggedIn, getCurrentUser } from 'Utils/auth';
import { useRequest } from 'Utils/request';
import LoadingSpinner from './LoadingSpinner';
import { cx, css } from 'emotion';

const styles = {
  disabled: css`
    pointer-events: none;
  `,
};

const formLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
  layout: 'vertical',
};

export default function (props) {
  const { gettingDetails, movieId } = props;

  // If not logged in, alert user
  if (!loggedIn()) {
    return (
      <Form {...formLayout}>
        <Form.Item>
          <h1>Đánh giá của bạn</h1>
        </Form.Item>

        <Form.Item>Bạn cần đăng nhập để viết đánh giá.</Form.Item>
      </Form>
    );
  }

  // Form controller
  const [form] = Form.useForm();

  // This user's all reviews
  const [allYourReviews, setAllYourReviews] = useState([]);

  // This user's review on this movie
  const [thisMovieReview, setThisMovieReview] = useState();

  // Get this user's reviews
  const [getYourReviews, { loading: gettingYourReviews }] = useRequest({
    onError: error => console.log('Get your reviews error:', error),
    onResponse: response => setAllYourReviews(response.data),
  });

  // Post review
  const [postReview, { loading: postingReview }] = useRequest({
    onError: error => console.log('Post review error:', error),
    onResponse: response => {
      message.success(
        'Bài đánh giá của bạn đã được ghi nhận và đang chờ duyệt.'
      );
      setThisMovieReview(response.data);
      setFormState('watch');
    },
  });

  // Edit review
  const [editReview, { loading: editingReview }] = useRequest({
    onError: error => {
      console.log('Edit review error:', error);
      message.error('Đã có lỗi xảy ra.');
    },
    onResponse: response => {
      setThisMovieReview(response.data);
      setFormState('watch');
    },
  });

  // On mount
  useEffect(() => {
    // Get this user reviews
    getYourReviews({
      api: `review/user/${getCurrentUser().id}`,
      method: 'GET',
    });
  }, []);

  // On movie id or all your reviews update
  useEffect(() => {
    // If movieId isn't loaded yet, do nothing
    if (!movieId) return;

    // Find your review for this movie from all your reviews
    const thisMovieReview = allYourReviews.find(
      review => review.idMovie === movieId
    );

    // Set your review for this movie
    setThisMovieReview(thisMovieReview);

    // If there is a review (this user already reviewed this movie)
    if (thisMovieReview) {
      // Set formState to 'watch'
      setFormState('watch');

      // Set Form values
      form.setFieldsValue({
        star: thisMovieReview.star,
        content: thisMovieReview.content,
      });
    }
    // If there isn't a review (this user hasn't reviewed this movie)
    else {
      setFormState('new');
    }
  }, [movieId, allYourReviews]);

  // State of the Form
  const [formState, setFormState] = useState('new');

  // On Post Review button click when Form is in 'new' state
  function handlePostSubmit() {
    form
      .validateFields()
      .then(values => {
        // Get star and content from values
        const { star, content } = values;

        // Post review
        postReview({
          api: 'review',
          method: 'POST',
          data: {
            idMovie: movieId,
            star: star,
            content: content,
          },
        });
      })
      .catch(error => null);
  }

  // On Edit button click in 'watch' state
  function handleEdit() {
    // Set formState to 'edit'
    setFormState('edit');
  }

  // On Edit Review button click when Form is in 'edit' state
  function handleEditSubmit() {
    form
      .validateFields()
      .then(values => {
        // Get star and content from values
        const { star, content } = values;

        // Edit review
        editReview({
          api: `review/${thisMovieReview.id}`,
          method: 'PUT',
          data: {
            star: star,
            content: content,
          },
        });
      })
      .catch(error => null);
  }

  // On Cancel button click in 'edit' state
  function handleCancel() {
    // Set formState back to 'watch'
    setFormState('watch');

    // Set values back to default
    form.setFieldsValue({
      star: thisMovieReview.star,
      content: thisMovieReview.content,
    });
  }

  return (
    <Form form={form} hideRequiredMark {...formLayout}>
      {/* Label */}
      <Form.Item>
        <h1>
          {/* New review */}
          {formState === 'new' && 'Đánh giá của bạn'}

          {/* Watch review */}
          {formState === 'watch' &&
            `Đánh giá của bạn ${
              thisMovieReview.verified ? ' (Đã duyệt)' : ' (Chưa duyệt)'
            }`}

          {/* Edit review */}
          {formState === 'edit' && 'Sửa bài đánh giá'}
        </h1>
      </Form.Item>

      {gettingDetails || gettingYourReviews ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          {/* Review stars */}
          <Form.Item
            label="Điểm"
            name="star"
            rules={[
              {
                // Required
                required: true,
                message: 'Hãy chấm điểm phim',
              },
            ]}
          >
            <Rate disabled={formState === 'watch'} />
          </Form.Item>

          {/* Review content */}
          <Form.Item
            label="Nhận xét"
            name="content"
            rules={[
              {
                // Required
                required: true,
                message: 'Hãy nhập nhận xét',
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              className={cx({
                [styles.disabled]: formState === 'watch',
              })}
            />
          </Form.Item>

          <Form.Item>
            {/* If Form is in 'new' state (this User hasn't reviewed this movie) */}
            {formState === 'new' && (
              // Submit post button
              <Button
                type="primary"
                onClick={handlePostSubmit}
                loading={postingReview}
              >
                Đăng bài
              </Button>
            )}

            {/* If Form is in 'watch' state (this User already has a review on this movie) */}
            {formState === 'watch' && (
              // Edit button
              <Button type="primary" onClick={handleEdit}>
                Sửa
              </Button>
            )}

            {/* If Form is in 'edit' state (this User pressed Edit button) */}
            {formState === 'edit' && (
              <Space>
                {/* Submit edit button */}
                <Button
                  type="primary"
                  onClick={handleEditSubmit}
                  loading={editingReview}
                >
                  Lưu
                </Button>

                {/* Cancel edit button */}
                <Button type="default" danger onClick={handleCancel}>
                  Hủy
                </Button>
              </Space>
            )}
          </Form.Item>
        </React.Fragment>
      )}
    </Form>
  );
}
