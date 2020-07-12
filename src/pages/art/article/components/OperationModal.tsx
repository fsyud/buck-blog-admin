import React, { FC, useEffect, useState} from 'react';
import { Modal, Result, Button, Form, Radio, Input, Select } from 'antd';
import { artDetailList, updateArticleParam } from '../data.d';
import styles from '../style.less';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<artDetailList> | undefined;
  onDone: () => void;
  onSubmit: (values: updateArticleParam) => void;
  onCancel: () => void;
  tagList: any;
}

const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;

  const [curTag, setCurTag] = useState<any>([]);
  const [curTagList, setCurTagList] = useState<any>([]);

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current && current.data) {
      form.setFieldsValue({
        ...current.data,
      });

      const curTags = current.data.tags.map(s => s.name)

      setCurTag(curTags)
    }
  }, [props.current]);

  // 标签传值
  useEffect(() => {
    setCurTagList(props.tagList)
  },[props.tagList]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      const curVal = Object.assign({}, values, {tags: curTag})
      onSubmit(curVal as updateArticleParam);
    }
  };

   // 标签选择
   const handleCurTag = (val: any): void => {
    setCurTag(val);
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
          label="文章名称"
          rules={[{ required: true, message: '请输入文章名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="img_url"
          label="封面连接"
          rules={[{ required: true, message: '请输入封面连接' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="author"
          label="作者"
          rules={[{ required: true, message: '请输入作者' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="标签"
          rules={[{ required: true, message: '请输入任务名称' }]}
        >
          <Select
            allowClear
            mode="multiple"
            style={{ minWidth: 200 }}
            placeholder="标签"
            value={curTag}
            onChange={handleCurTag}
          >
            {curTagList.map((s:any) => (
              <Select.Option key={s._id} value={s._id}>
                {s.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="keyword"
          label="关键字"
          rules={[{ required: true, message: '请输入关键字' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="type"
          label="发布状态"
          rules={[{ required: true, message: '请选择项目状态' }]}
        >
          <Radio.Group>
            <Radio.Button value="0">草稿</Radio.Button>
            <Radio.Button value="1">发布</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="origin"
          label="文章转载状态"
          rules={[{ required: true, message: '请选择文章转载状态' }]}
        >
          <Radio.Group>
            <Radio.Button value="1">普通文章</Radio.Button>
            <Radio.Button value="2">简历</Radio.Button>
            <Radio.Button value="3">管理员介绍</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="desc"
          label="描述"
          rules={[{ required: true, message: '请输入至少五个字的项目描述！', min: 5 }]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </Form.Item>

        <Form.Item
          name="content"
          label="内容"
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
