import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const FormItem = Form.Item;
class Update extends Component {
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
    const { dispatch, type } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, tag) => {
      if (err) return;
      dispatch({
        type: type,
        payload: tag,
      });
    });
  }

  renderFormItem(formItemLayout, getFieldDecorator) {
    const { formItems } = this.props;
    return formItems.map((data, i) => (
      <FormItem
        {...formItemLayout}
        label={data.label}
        hasFeedback
        key={i}
      >
        {getFieldDecorator(data.name, data.validate)(
          <Input disabled={data.disabled} placeholder={`请输入${data.label}`} />,
        )}
      </FormItem>
    ));
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

const WrappedUpdateForm = Form.create()(Update);

export default WrappedUpdateForm;
