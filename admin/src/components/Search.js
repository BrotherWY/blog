import React, { Component } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.props.handleAdd.bind(this);
  }

  handleSearch(e) {
    const { dispatch, type, pageIndex, pageSize, otherType } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (err) return;
      const flag = data.name || data.selTime;
      dispatch({
        type: flag ? type : otherType,
        payload: { pageIndex, pageSize, data },
      });
    });
  }

  renderFormItem(getFieldDecorator) {
    const { formItems } = this.props;
    return formItems.map((data, i) => (
      <FormItem
        key={i}
      >
        {getFieldDecorator(data.name, data.validate)(
          <Input disabled={data.disabled} placeholder={`请输入${data.label}`} />,
        )}
      </FormItem>
    ));
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        layout="inline"
        onSubmit={this.handleSearch}
        style={{ marginBottom: '10px' }}
      >
        {
          this.renderFormItem(getFieldDecorator)
        }
        <FormItem>
          {getFieldDecorator('selTime')(
            <RangePicker showTime format="YYYY-MM-DD HH:mm" />,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">搜索</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={this.handleAdd}>添加</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedSearch = Form.create()(Search);

export default WrappedSearch;
