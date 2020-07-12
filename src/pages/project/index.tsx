import React, { FC, useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
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
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import OperationModal from './components/OperationModal';
import { StateType } from './model';
import { ProjectList } from './data.d';

import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface ListBasicListProps {
  projectModel: StateType;
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
  data: { title, url, start_time, end_time },
}: {
  data: ProjectList;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>标题</span>
      <p>{title}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>项目链接</span>
      <p>{url}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>创建时间</span>
      <p>{moment(start_time).format( 'YYYY-MM-DD')}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>结束时间</span>
      <p>{moment(end_time).format('YYYY-MM-DD')}</p>
    </div>
  </div>
);

export const projectList: FC<ListBasicListProps> = (props) => {
  const addBtn = useRef(null);

  const {
    loading,
    dispatch,
    projectModel: {list, info}
  } = props;


  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<ProjectList> | undefined>(undefined);

  useEffect(() => {
    initList()
  }, []);

  useEffect(() => {
    if(info.message) {
      message.info(info.message)
      initList()
    }
  }, [info])

  const initList = (): void => {
    dispatch({
      type: 'projectModel/fetch',
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

  const showEditModal = (item: ProjectList) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id: string) => {
    dispatch({
      type: 'projectModel/delete',
      payload: { id },
    });
  };

  const editAndDelete = (key: string, currentItem: ProjectList) => {
    if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该该项目么？',
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
    item: ProjectList;
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

  const handleSubmit = (values: ProjectList, operate: string) => {
    const id = current ? current._id : ''

    if(operate === 'edit') {
      dispatch({
        type: 'projectModel/update',
        payload: { id, ...values },
      });
    } else {
      dispatch({
        type: 'projectModel/addproject',
        payload: { ...values },
      });
    }
    setAddBtnblur();
    setDone(true);
  };

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="用户列表个数" value={list.length} bordered />
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
                  <List.Item.Meta
                    avatar={<Avatar src={item.img} shape="square" size="large" />}
                    title={item.title}
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
      />
    </div>
  );
};

export default connect(
  ({
    projectModel,
    loading,
  }: {
    projectModel: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    projectModel,
    loading: loading.models.userBasicList,
  }),
)(projectList);
