import React, { FC, useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Radio,
  Row,
  message
} from 'antd';

import { findDOMNode } from 'react-dom';
import request from 'umi-request'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch, Link} from 'umi';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import { StateType } from './model';
import { tagStateType } from '@/models/tag';
import { artDataList, updateArticleParam } from './data.d';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface ListBasicListThreeProps {
  article: StateType;
  dispatch: Dispatch;
  loading: boolean;
  tagList: tagStateType;
}

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const ListContent = ({
  data: { title, desc, create_time  },
}: {
  data: artDataList;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>标题</span>
      <p>{title}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>描述</span>
      <p>{desc}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>创建时间</span>
      <p>{moment(create_time).format('YYYY-MM-DD HH:mm')}</p>
    </div>
  </div>
);

export const ArticleList: FC<ListBasicListThreeProps> = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    article: { list, info },
    tagList
  } = props;

  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<artDataList> | undefined>(undefined);
  const [curId, setCurId] = useState<string>('');

  useEffect(() => {
    initList()
    // 获取标签列表
    dispatch({
      type: 'tags/getTagList',
    });
  }, [1]);

  useEffect(() => {
    if(info.message) {
      message.info(info.message)
      initList()
    }
  }, [info]);

  const initList = (): void => {
    dispatch({
      type: 'article/fetch',
      payload: {
        pageSize: 200,
      },
    });
  }

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: list.length,
  };

  // 文章编辑
  const showEditModal = (item: artDataList) => {
    const userId = item._id;
    request.post('/api/queryArticleDetail',
      {
        data: { id: userId }
      }
    )
    .then((res) => {
      setCurrent(res);
      setCurId(res.data._id)
      setVisible(true);
    })
    .catch(error => {
      console.log(error);
    })
  };

  const deleteItem = (id: string) => {
    dispatch({
      type: 'article/delArticle',
      payload: { id },
    });
  };

  const editAndDelete = (key: string, currentItem: artDataList) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem._id),
      });
    }
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">进行中</RadioButton>
        <RadioButton value="waiting">等待中</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  const MoreBtn: React.FC<{
    item: artDataList;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();

    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values: updateArticleParam) => {
    setAddBtnblur();
    setDone(true);
    dispatch({
      type: 'article/updateArt',
      payload: {
        id: curId,
        ...values,
        tags: values.tags.join(','),
        keyword: values.keyword.join(','),
      },
    });
  };

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="文章数" value={list.length} bordered />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="基本列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              ref={addBtn}
            >
              <PlusOutlined />
              <Link to="/art/createarticle">写文章</Link>
            </Button>

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.img_url} shape="square" size="large" />}
                    title={<a href='./'>{item.title}</a>}
                    description={item.desc}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        tagList={tagList}
      />
    </div>
  );
};

export default connect(
  ({
    article,
    loading,
    tags
  }: {
    article: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
    tags: tagStateType
  }) => ({
    article,
    loading: loading.models.article,
    tagList: tags.tagList,
  }),
)(ArticleList);
