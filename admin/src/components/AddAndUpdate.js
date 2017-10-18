import React, { Component } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class AddAndUpdate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.props.handleCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { form, data } = nextProps;
    if (this.props.data !== data) {
      form.setFieldsValue(data);
    }
  }

  handleSubmit(e) {
    const { dispatch, type, pageIndex, pageSize } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (err) return;
      dispatch({
        type: type,
        payload: { pageIndex, pageSize, data },
      });
    });
  }

  renderFormItem(formItemLayout, getFieldDecorator) {
    const { formItems } = this.props;
    return formItems.map((data, i) => {
      let s;
      if (data.isSelect) {
        const selects = data.selects;
        const options = selects.map((select, j) => {
          return (
            <Option value={select.value} key={j}>{select.name}</Option>
          );
        });
        s = <Select placeholder={`请选择${data.label}`}>{options}</Select>;
      } else {
        s = <Input disabled={data.disabled} placeholder={`请输入${data.label}`} />;
      }
      return (
        <FormItem
          {...formItemLayout}
          label={data.label}
          hasFeedback
          key={i}
        >
          {getFieldDecorator(data.name, data.validate)(
            s,
          )}
        </FormItem>
      );
    });
  }

  render() {
    const { visible, title, loading } = this.props;
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
      <Modal
        title={title}
        visible={visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <Form onSubmit={this.handleSubmit}>
          {this.renderFormItem(formItemLayout, getFieldDecorator)}
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
    );
  }
}

const WrappedAddForm = Form.create()(AddAndUpdate);

export default WrappedAddForm;
