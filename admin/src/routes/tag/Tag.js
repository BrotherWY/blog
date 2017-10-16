import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Modal, Form, Input, Button } from 'antd';
import { FETCH_ALL, UPDATE, DELETE } from '../../constants/ActionType';

const FormItem = Form.Item;

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: `tag/${FETCH_ALL}`,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.props.loading) {
      this.setState({ visible: false });
    }
  }

  handleDelete(id) {
    const { dispatch } = this.props;
    dispatch({
      type: `tag/${DELETE}`,
      payload: id,
    });
  }

  handleEdit(record) {
    const { form } = this.props;
    form.setFieldsValue(record);
    this.setState({ visible: true });
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  handleSubmit(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, tag) => {
      if (err) return;
      dispatch({
        type: `tag/${UPDATE}`,
        payload: tag,
      });
    });
  }

  handleSelectAll(selected, selectedRows, changeRows) {
    console.debug(selectedRows, changeRows);
  }

  render() {
    const columns = [
      { title: '标签名', dataIndex: 'name', key: 'name' },
      { title: '文章数量', dataIndex: 'count', key: 'count' },
      { title: '介绍', dataIndex: 'intro', key: 'intro' },
      { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
      { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt' },
      { title: '当前版本', dataIndex: 'version', key: 'version' },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => (
          <span>
            <span style={{ marginRight: '16px', color: '#4396ec', cursor: 'pointer' }} onClick={() => { this.handleEdit(record); }}>编辑</span>
            <Popconfirm title="确定删除吗?" onConfirm={() => { this.handleDelete(record.id); }} okText="yes" cancelText="no">
              <span style={{ color: '#4396ec', cursor: 'pointer' }}>删除</span>
            </Popconfirm>
          </span>
        ),
      },
    ];
    const { tags, loading } = this.props;
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <div>
        <Table
          columns={columns}
          dataSource={tags}
          pagination
          loading={loading}
          bordered
          rowSelection={{
            onSelectAll: this.handleSelectAll,
          }}
        />
        <Modal
          title="修改标签"
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="标签名"
              hasFeedback
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '标签名不能为空',
                }],
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="介绍"
              hasFeedback
            >
              {getFieldDecorator('intro', {
                rules: [{
                  required: true, message: '介绍不能为空',
                }],
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="id"
              hasFeedback
            >
              {getFieldDecorator('id')(
                <Input disabled />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文章数量"
              hasFeedback
            >
              {getFieldDecorator('count')(
                <Input disabled />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="创建时间"
              hasFeedback
            >
              {getFieldDecorator('createdAt')(
                <Input disabled />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="更新时间"
              hasFeedback
            >
              {getFieldDecorator('updatedAt')(
                <Input disabled />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="当前版本"
              hasFeedback
            >
              {getFieldDecorator('version')(
                <Input disabled />,
              )}
            </FormItem>
            <FormItem
              wrapperCol={{
                xs: { span: 14, offset: 0 },
                sm: { span: 14, offset: 3 },
              }}
            >
              <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(Tag);

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    tags: state.tag.tags,
  };
}

export default connect(mapStateToProps)(WrappedRegistrationForm);
