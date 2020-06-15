import React, { useState, useEffect } from 'react';
import { Drawer, Select, Input, Button, Form } from 'antd';
import { css } from 'emotion';
import removeAccent from 'Utils/helpers/removeAccent';
import moment from 'moment';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import Icon from '@iconify/react';
import colors from 'Components/Shared/theme';
import filterIcon from '@iconify/icons-mdi/filter';
import { useRequest } from 'Utils/request';

const { Option } = Select;

const styles = {
  buttonContainer: css`
    padding: 10px;
    background: ${colors.primary};
    border-radius: 10px;
    color: ${colors.white};
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    line-height: 20px;
    transition: all 0.2s;

    &:hover {
      background: ${colors.primaryHeavy};
    }
  `,
  buttonIcon: css`
    font-size: inherit;
    margin-right: 5px;
  `,
  buttonText: css`
    font-size: inherit;
  `,
  filterDrawer: css`
    .ant-form-item {
      margin-bottom: 16px !important;
    }

    .filter-button {
      margin-top: 22px !important;
    }
  `,
};

function filterSelect(input, option) {
  return removeAccent(option.children).includes(removeAccent(input));
}

export default function Filter() {
  const history = useHistory();

  // Search queries
  const queries = queryString.parse(history.location.search);

  // Drawer visible
  const [visible, setVisible] = useState(false);

  // Categories
  const [categories, setCategories] = useState([]);
  const [getCategories, { loading: gettingCategories }] = useRequest({
    onError: error => console.log('Get categories error:', error),
    onResponse: response => setCategories(response.data),
  });

  // Actors
  const [actors, setActors] = useState([]);
  const [getActors, { loading: gettingActors }] = useRequest({
    onError: error => console.log('Get actors error:', error),
    onResponse: response => setActors(response.data),
  });

  // Directors
  const [directors, setDirectors] = useState([]);
  const [getDirectors, { loading: gettingDirectors }] = useRequest({
    onError: error => console.log('Get directors error:', error),
    onResponse: response => setDirectors(response.data),
  });

  // Form controller
  const [form] = Form.useForm();

  // Get categories, actors and directors on mount
  useEffect(() => {
    // Get categories
    getCategories({
      api: 'category',
      method: 'GET',
    });

    // Get actors
    getActors({
      api: 'actor',
      method: 'GET',
    });

    // Get directors
    getDirectors({
      api: 'director',
      method: 'GET',
    });
  }, []);

  const initialValues = {
    keyword: queries.keyword || '',
    category: queries.category || '',
    actor: queries.actor || '',
    director: queries.director || '',
    year: queries.year || '',
    sortBy: queries.highestStar
      ? 'highestStar'
      : queries.mostRated
      ? 'mostRated'
      : '',
  };

  // Update filter values when queries change
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [queries]);

  // Show Filter drawer
  function showDrawer() {
    setVisible(true);
  }

  // Close Filter drawer
  function closeDrawer() {
    setVisible(false);
  }

  // Handle submit
  function handleSubmit(values) {
    const { keyword, category, actor, director, year, sortBy } = values;

    // Stringify queries
    let query = queryString.stringify(
      {
        keyword: keyword,
        category: category,
        actor: actor,
        director: director,
        year: year,
        highestStar: sortBy === 'highestStar' || '',
        mostRated: sortBy === 'mostRated' || '',
      },
      {
        skipEmptyString: true,
      }
    );

    // Call queries
    history.push(`/search/?${query}`);

    // Close filter drawer
    closeDrawer();
  }

  return (
    <React.Fragment>
      {/* Button to show Filter drawer */}
      <div onClick={showDrawer} className={styles.buttonContainer}>
        <Icon className={styles.buttonIcon} icon={filterIcon} />
        <div className={styles.buttonText}>Lọc</div>
      </div>

      {/* Filter drawer */}
      <Drawer
        forceRender
        className={styles.filterDrawer}
        visible={visible}
        onClose={closeDrawer}
        title="Lọc phim"
      >
        <Form
          form={form}
          initialValues={initialValues}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {/* Keyword input */}
          <Form.Item name="keyword" label="Từ khóa">
            <Input />
          </Form.Item>

          {/* Category select */}
          <Form.Item name="category" label="Thể loại">
            <Select
              loading={gettingCategories}
              filterOption={filterSelect}
              showSearch
            >
              <Option value="">Tất cả</Option>
              {categories.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Actor select */}
          <Form.Item name="actor" label="Diễn viên">
            <Select
              loading={gettingActors}
              filterOption={filterSelect}
              showSearch
            >
              <Option value="">Tất cả</Option>
              {actors.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Director select */}
          <Form.Item name="director" label="Đạo diễn">
            <Select
              loading={gettingDirectors}
              filterOption={filterSelect}
              showSearch
            >
              <Option value="">Tất cả</Option>
              {directors.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Year select */}
          <Form.Item name="year" label="Năm">
            <Select showSearch>
              <Option value="">Tất cả</Option>
              {[...Array(moment().year() - 1899)].map((_, index) => {
                let year = moment().year() - index;
                return (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {/* Sort select */}
          <Form.Item name="sortBy" label="Sắp xếp theo">
            <Select>
              <Option value="">Ngày ra mắt</Option>
              <Option value="highestStar">Điểm</Option>
              <Option value="mostRated">Lượt đánh giá</Option>
            </Select>
          </Form.Item>

          {/* Filter button */}
          <Form.Item className="filter-button">
            <Button type="primary" htmlType="submit">
              Lọc
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </React.Fragment>
  );
}
