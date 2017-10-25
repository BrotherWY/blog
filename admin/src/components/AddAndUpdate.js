import React, { Component } from 'react';
import { Modal, Form, Input, Button, Select, Upload, message, Icon } from 'antd';
import { UPLOAD_URL } from '../constants/ActionType';

const FormItem = Form.Item;
const Option = Select.Option;
class AddAndUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [], // 封面上传图片数量
      previewVisible: false,
      previewImage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.props.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUploadCancel = this.handleUploadCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { form, data } = nextProps;
    if (this.props.data !== data) {
      form.setFieldsValue(data);
    }
  }

  handleSubmit(e) {
    const { dispatch, type, pageIndex, pageSize } = this.props;
    const { fileList } = this.state;
    const resUrl = fileList.length > 0 && fileList[0].response && fileList[0].response.url;
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (err) return;
      if (data.img_url) {
        data.img_url = resUrl;
      }
      dispatch({
        type: type,
        payload: { pageIndex, pageSize, data },
      });
    });
  }

  handleUploadCancel() {
    this.setState({ previewVisible: false });
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ file, fileList }) {
    if (file.status === 'done') {
      message.success('上传成功');
    } else if (file.status === 'error') {
      message.error('上传失败');
    } else if (file.status === 'removed') {
      message.success('删除成功');
    }
    this.setState({ fileList });
  }

  renderFormItem(formItemLayout, getFieldDecorator) {
    const { formItems } = this.props;
    const { fileList, previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
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
      } else if (data.isUpload) {
        s = (
          <div style={{ overflow: 'hidden' }}>
            <Upload
              action={UPLOAD_URL}
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleUploadCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        );
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
