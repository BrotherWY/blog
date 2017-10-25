import React, { Component } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.props.handleAdd ? this.handleAdd = this.props.handleAdd.bind(this) : null;
  }

  handleSearch(e) {
    const { dispatch, type, pageIndex, pageSize, otherType, flag } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (err) return;
      // 遍历参数 判断参数是否存在 来发送不同的请求
      let isPaging = false;
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          isPaging = true;
        }
      });
      // flag 是文章的分类 0 草稿 1 发布 2 垃圾箱
      if (flag) data.flag = flag;
      dispatch({
        type: isPaging ? type : otherType,
        payload: { pageIndex, pageSize, data },
      });
    });
  }

  renderFormItem(getFieldDecorator) {
    let { formItems } = this.props;
    formItems = formItems || [];
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
        {
          this.props.handleAdd
          ?
            <FormItem>
              <Button type="primary" onClick={this.handleAdd}>添加</Button>
            </FormItem>
          :
            null
        }
      </Form>
    );
  }
}

const WrappedSearch = Form.create()(Search);

export default WrappedSearch;
