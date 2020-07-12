import React, { FC, useEffect } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select } from 'antd';
import { timeListItem } from '../data.d';
import styles from '../style.less';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<timeListItem> | undefined;
  onDone: () => void;
  onSubmit: (values: timeListItem, operate: string) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        start_time: current.start_time ? moment(current.start_time) : null,
        end_time: current.end_time ? moment(current.end_time) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    const operationState = current ? 'edit' : 'add'
    if (onSubmit) {
      onSubmit(values as timeListItem, operationState);
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: '保存', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="操作成功"
          subTitle="一系列的信息描述，很短同样也可以带标点。"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="state"
          label="时间轴状态"
          rules={[{ required: true, message: '请选择项目状态' }]}
        >
          <Select placeholder="请选择">
            <Select.Option value="1">已完成</Select.Option>
            <Select.Option value="2">正在进行</Select.Option>
            <Select.Option value="3">未完成</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="start_time"
          label="开始时间"
          rules={[{ required: true, message: '请选择开始时间' }]}
        >
          <DatePicker
            showTime
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="请选择"
          />
        </Form.Item>
        <Form.Item
          name="end_time"
          label="结束时间"
          rules={[{ required: true, message: '请选择结束时间' }]}
        >
          <DatePicker
            showTime
            placeholder="请选择"
            format="YYYY-MM-DD"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name="content"
          label="项目描述"
          rules={[{ required: true, message: '请输入至少五个字的项目描述！', min: 5 }]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `任务${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
