import React, { useContext, useState, useEffect } from 'react';
import { Drawer, Select, Input, Button } from 'antd';
import { GenresContext } from 'Components/Shared/GenresContext';
import { css } from 'emotion';
import removeAccent from 'Utils/helpers/removeAccent';
import moment from 'moment';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

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

  const [chosenGenre, setChosenGenre] = useState(queries.category || '');

  const [chosenSort, setChosenSort] = useState(
    queries.highestStar ? 'highestStar' : queries.mostRated ? 'mostRated' : ''
  );

  const [chosenYear, setChosenYear] = useState(queries.year || '');

  const [keyword, setKeyword] = useState(queries.keyword || '');

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

    if (chosenGenre) {
      queries.category = chosenGenre;
    }

    switch (chosenSort) {
      case 'highestStar':
        queries.highestStar = true;
        break;
      case 'mostRated':
        queries.mostRated = true;
        break;
      default:
        break;
    }

    if (chosenYear) {
      queries.year = chosenYear;
    }

    if (keyword) {
      queries.keyword = keyword;
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
          onChange={value => setChosenGenre(value)}
          defaultValue={chosenGenre}
          {...selectProps}
        >
          <Select.Option value="">Tất cả</Select.Option>
          {genres && [
            ...Object.keys(genres).map(genreId => (
              <Select.Option key={genreId} value={genreId}>
                {genres[genreId]}
              </Select.Option>
            )),
          ]}
        </Select>
      </div>

      <div className={styles.row}>
        <label>Sắp xếp theo</label>
        <Select
          defaultValue={chosenSort}
          onChange={value => setChosenSort(value)}
          {...selectProps}
        >
          <Select.Option value="">Ngày ra mắt</Select.Option>
          <Select.Option value="highestStar">Điểm</Select.Option>
          <Select.Option value="mostRated">Lượt đánh giá</Select.Option>
        </Select>
      </div>

      <div className={styles.row}>
        <label>Năm</label>
        <Select
          defaultValue={chosenYear}
          onChange={value => setChosenYear(value)}
          {...selectProps}
        >
          <Select.Option value="">Tất cả</Select.Option>
          {Array(moment().year() - 1899)
            .fill(null)
            .map((_, index) => (
              <Select.Option key={index} value={index + 1900}>
                {index + 1900}
              </Select.Option>
            ))
            .reverse()}
        </Select>
      </div>

      <div className={styles.row}>
        <label>Từ khóa</label>
        <Input
          defaultValue={keyword}
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
