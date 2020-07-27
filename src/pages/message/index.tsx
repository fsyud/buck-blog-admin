import React, { FC, useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
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

import moment from 'moment';
import { findDOMNode } from 'react-dom';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import OperationModal from './components/OperationModal';
import { StateType } from './model';
import { messageListItem } from './data.d';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface ListBasicListProps {
  messageSpace: StateType;
  dispatch: Dispatch;
  loading: boolean;
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
  data: { content, state, create_time },
}: {
  data: messageListItem;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>内容</span>
      <p>{content}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>审核状态</span>
      <p>{state}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>创建时间</span>
      <p>{moment(create_time).format( 'YYYY-MM-DD')}</p>
    </div>
  </div>
);

export const MessageComponent: FC<ListBasicListProps> = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    messageSpace: { list, info, listCounts },
  } = props;

  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<messageListItem> | undefined>(undefined);

  useEffect(() => {
    initList()
  }, [1]);

  useEffect(() => {
    if(info.message) {
      message.info(info.message)
      initList()
    }
  }, [info])

  const initList = (): void => {
    dispatch({
      type: 'messageSpace/fetch',
      payload: {
        pageSize: 200
      }
    });
  }

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: list.length,
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: messageListItem) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id: string) => {
    dispatch({
      type: 'messageSpace/delMessage',
      payload: { id },
    });
  };

  const editAndDelete = (key: string, currentItem: messageListItem) => {
    if (key === 'delete') {
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
    item: messageListItem;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
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

  const handleSubmit = (values: messageListItem, operate: string) => {
    const id = current ? current._id : '';
    if(operate === 'edit') {
      dispatch({
        type: 'messageSpace/changeMessage',
        payload: {
          id,
          state: values.state,
          content: values.content
        }
      })
    }
    setAddBtnblur()
    setDone(true)
  };

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="列表数" value={list.length} bordered />
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
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined />
              添加
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
      />
    </div>
  );
};

export default connect(
  ({
    messageSpace,
    loading,
  }: {
    messageSpace: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    messageSpace,
    loading: loading.models.timeLineList,
  }),
)(MessageComponent);
