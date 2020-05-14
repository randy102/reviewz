import React, { useState, useEffect } from 'react';

import Color from 'color';

import { useForm } from 'react-hook-form';
import { useRequest } from 'Utils/request';
import StarRating from './StarRating';
import { css, cx } from 'emotion';
import colors from 'Components/Shared/colors';
import * as yup from 'yup';

import ErrorMessage from 'Components/Shared/Form/ErrorMessage';
import Loading from 'Components/Shared/Loading';
import { IconButton } from 'Components/Shared/Buttons';

import pencilIcon from '@iconify/icons-mdi/pencil';
import DeleteReview from './DeleteReview';

const styles = {
  container: css`
    display: grid;
    row-gap: 20px;
    padding: 20px;
    justify-items: left;
    background: ${colors.imgPlaceholder};
    border-radius: 10px;
    width: fit-content;
    margin-top: 20px;
  `,
  header: css`
    font-size: 24px;
    line-height: 28px;
    color: ${colors.black};
  `,
  row: css`
    width: 100%;
  `,
  starsContainer: css`
    padding: 10px;
    background: ${colors.white};
    border-radius: 10px;
    border: 1px solid transparent;
  `,
  contentContainer: css`
    width: 100%;
    background: ${colors.white};
    border-radius: 10px;
    padding: 15px 10px 15px 15px;
    border: 1px solid transparent;
  `,
  hasError: css`
    border-color: ${colors.error};
  `,
  errorMessage: css`
    padding: 0;
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
  buttons: css`
    display: flex;
    align-items: center;
  `,
  submitButton: css`
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.primary};
    color: ${colors.secondary};
    font-size: 20px;
    line-height: 23px;
    transition: all 0.15s;

    &:focus {
      outline: none;
    }

    &:hover {
      background: ${colors.primaryHeavy};
    }
  `,
  cancelButton: css`
    margin-left: 10px;
  `,
  iconButton: css`
    border-radius: 10px;
    padding: 10px;

    span {
      font-size: 20px;
      line-height: 23px;
    }

    svg {
      font-size: 23px;
      line-height: 23px;
    }
  `,
  deleteButton: css`
    color: ${colors.error};

    &:hover {
      background: ${Color(colors.error).alpha(0.1).string()};
    }

    &:active {
      background: ${Color(colors.error).alpha(0.2).string()};
    }
  `,
};

export default function YourReview(props) {
  const { yourReview, idMovie, refetchReviews } = props;

  const [myReview, setMyReview] = useState(yourReview);

  const [formState, setFormState] = useState(myReview ? 'watch' : 'new');

  const [sendRequest, { loading: postingReview }] = useRequest({
    onError: error => {
      console.log('Post review error:', error);
    },
    onResponse: response => {
      setMyReview(response.data);
      setFormState('watch');
    },
  });

  const {
    register: formRef,
    handleSubmit,
    errors,
    clearError,
    setValue,
  } = useForm({
    validationSchema: yup.object().shape({
      star: yup
        .number()
        .test('required', 'Hãy chấm điểm phim', value => value > 0),
      content: yup.string().required('Hãy nhận xét phim'),
    }),
  });

  function onSubmit(data) {
    const { star, content } = data;

    if (formState === 'edit') {
      sendRequest({
        api: `review/${myReview.id}`,
        method: 'PUT',
        data: {
          star: star,
          content: content,
        },
      });
    } else {
      sendRequest({
        api: 'review',
        method: 'POST',
        data: {
          idMovie: idMovie,
          star: star,
          content: content,
        },
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.header}>
        {formState === 'new' && 'Review của bạn'}

        {formState === 'watch' &&
          `Review của bạn ${myReview.verified ? '(đã duyệt)' : '(chưa duyệt)'}`}

        {formState === 'edit' && 'Sửa review'}
      </div>

      <div className={styles.row}>
        <div
          className={cx(styles.starsContainer, {
            [styles.hasError]: errors['star'],
          })}
        >
          <StarRating
            defaultValue={myReview?.star || 0}
            clearError={clearError}
            ref={formRef}
            name="star"
            disabled={formState === 'watch'}
          />
        </div>

        {errors['star'] && (
          <ErrorMessage
            className={styles.errorMessage}
            message={errors['star'].message}
          />
        )}
      </div>

      <div className={styles.row}>
        <div
          className={cx(styles.contentContainer, {
            [styles.hasError]: errors['content'],
          })}
        >
          <textarea
            className={styles.content}
            ref={formRef}
            name="content"
            placeholder="Nhận xét phim..."
            defaultValue={myReview?.content || ''}
            rows="4"
            disabled={formState === 'watch'}
          ></textarea>
        </div>

        {errors['content'] && (
          <ErrorMessage
            className={styles.errorMessage}
            message={errors['content'].message}
          />
        )}
      </div>

      <div className={styles.buttons}>
        {formState === 'watch' && (
          <React.Fragment>
            <IconButton
              onClick={() => setFormState('edit')}
              icon={pencilIcon}
              text="Sửa"
              className={styles.iconButton}
            />
            <DeleteReview
              className={cx(styles.iconButton, styles.deleteButton)}
              id={myReview.id}
              setFormState={setFormState}
              refetchReviews={refetchReviews}
              setMyReview={setMyReview}
              setValue={setValue}
            />
          </React.Fragment>
        )}

        {formState === 'new' && (
          <button className={styles.submitButton} type="submit">
            {postingReview ? <Loading /> : 'Đánh giá'}
          </button>
        )}

        {formState === 'edit' && (
          <React.Fragment>
            <button className={styles.submitButton} type="submit">
              {postingReview ? <Loading /> : 'Lưu'}
            </button>

            {/* <button
              onClick={() => setFormState('watch')}
              className={styles.cancelButton}
            >
              Hủy
            </button> */}

            <IconButton
              onClick={() => setFormState('watch')}
              text="Hủy"
              className={cx(
                styles.iconButton,
                styles.deleteButton,
                styles.cancelButton
              )}
            />
          </React.Fragment>
        )}
      </div>
    </form>
  );
}
