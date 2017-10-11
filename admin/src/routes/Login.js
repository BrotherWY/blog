import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import httpclient from '../network/HttpClient';
// import request from '../utils/request';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        console.log('Received values of form: ', values);
        httpclient.get('home').then((data) => {
          console.log(data);
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Form onSubmit={this.handleSubmit} style={{ width: '300px' }}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />,
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>登录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
