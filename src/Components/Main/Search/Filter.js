import React, { useContext, useState, useEffect } from 'react';
import { Drawer, Select, Input, Button } from 'antd';
import { GenresContext } from 'Components/Shared/GenresContext';
import { css } from 'emotion';
import removeAccent from 'Utils/helpers/removeAccent';
import moment from 'moment';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import './Filter.scss';

const styles = {
  selectContainer: css`
    display: flex;
    flex-direction: column;
    align-items: left;
  `,
  select: css`
    border: 1px solid black;
    padding: 5px;
  `,
  row: css`
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  `,
  submitButton: css`
    display: flex !important;

    span {
      line-height: 100%;
    }
  `,
};

export default function Filter(props) {
  const { visible, onClose, queries } = props;

  const genres = useContext(GenresContext);

  const [filterGenre, setFilterGenre] = useState();
  const [filterSort, setFilterSort] = useState();
  const [filterYear, setFilterYear] = useState();
  const [filterKeyword, setKeyword] = useState();

  useEffect(() => {
    setFilterGenre(queries.category || '');
    setFilterSort(
      queries.highestStar ? 'highestStar' : queries.mostRated ? 'mostRated' : ''
    );
    setFilterYear(queries.year || '');
    setKeyword(queries.keyword || '');
  }, [queries]);

  const selectProps = {
    showSearch: true,
    style: { width: '100%' },
    optionFilterProp: 'children',
    filterOption: (input, option) =>
      removeAccent(option.children).includes(removeAccent(input)),
  };

  const history = useHistory();

  function handleSubmit() {
    let queries = {};

    if (filterGenre) {
      queries.category = filterGenre;
    }

    switch (filterSort) {
      case 'highestStar':
        queries.highestStar = true;
        break;
      case 'mostRated':
        queries.mostRated = true;
        break;
      default:
        break;
    }

    if (filterYear) {
      queries.year = filterYear;
    }

    if (filterKeyword) {
      queries.keyword = filterKeyword;
    }

    history.push(`/search/?${queryString.stringify(queries)}`);

    onClose();
  }

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      closable={false}
      title="Lọc phim"
    >
      <div className={styles.row}>
        <label>Thể loại</label>
        <Select
          onChange={value => setFilterGenre(value)}
          value={filterGenre}
          {...selectProps}
        >
          <Select.Option value="">Tất cả</Select.Option>
          {genres &&
            Object.keys(genres).map(genreId => (
              <Select.Option key={genreId} value={genreId}>
                {genres[genreId]}
              </Select.Option>
            ))}
        </Select>
      </div>

      <div className={styles.row}>
        <label>Sắp xếp theo</label>
        <Select
          defaultValue={filterSort}
          onChange={value => setFilterSort(value)}
          {...selectProps}
          showSearch={false}
        >
          <Select.Option value="">Ngày ra mắt</Select.Option>
          <Select.Option value="highestStar">Điểm</Select.Option>
          <Select.Option value="mostRated">Lượt đánh giá</Select.Option>
        </Select>
      </div>

      <div className={styles.row}>
        <label>Năm</label>
        <Select
          defaultValue={filterYear}
          onChange={value => setFilterYear(value)}
          {...selectProps}
        >
          <Select.Option value="">Tất cả</Select.Option>
          {Array(moment().year() - 1899)
            .fill(null)
            .map((_, index) => (
              <Select.Option key={index} value={index + 1900}>
                {`${index + 1900}`}
              </Select.Option>
            ))
            .reverse()}
        </Select>
      </div>

      <div className={styles.row}>
        <label>Từ khóa</label>
        <Input
          defaultValue={filterKeyword}
          onChange={e => setKeyword(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSubmit}
        type="primary"
        htmlType="submit"
        className={styles.submitButton}
      >
        Lọc
      </Button>
    </Drawer>
  );
}
