import { connect } from 'dva';
import React, { Component } from 'react';
import LzEditor from 'react-lz-editor';
import { Button, Select, Form, Input, message, Upload, Icon, Modal } from 'antd';
// LzEditor和dva可能有冲突 样式无法自己加载
import 'antd/lib/modal/style';
import 'antd/lib/popconfirm/style';

class WriteArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '', // 文章内容
      fileList: [], // 封面上传图片数量
      previewVisible: false,
      previewImage: '',
      uploadUrl: 'http://localhost:3000/1.0/upload',
    };
    this.getContent = this.getContent.bind(this);
  }

  getContent(content) {
    this.setState({ content: content });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { fileList, content } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (fileList.length < 1) {
          message.error('请上传文章封面');
          return null;
        }
        if (content.length < 10) {
          message.error('文章还没写呢！！');
          return null;
        }
        values.content = content;
        values.cover = fileList[0].url;
      }
      return null;
    });
  }

  handleCancel() {
    this.setState({ previewVisible: false });
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange() {

  }

  renderSelectTag() {
    // const Option = Select.Option;
  }

  renderSelectCatalog() {
    const Option = Select.Option;
    return (
      <Option value="male">1</Option>
    );
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const { fileList, previewVisible, previewImage, uploadUrl } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <LzEditor
          cbReceiver={this.getContent}
          active
          video={false}
          audio={false}
          image={false}
          convertFormat="markdown"
        />
        <Form onSubmit={this.handleSubmit}>
          <h2 style={{ margin: '16px 0' }}>文章标题</h2>
          <FormItem>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入文章标题' }],
            })(
              <Input placeholder="文章标题" />,
            )}
          </FormItem>
          <h2 style={{ margin: '16px 0' }}>文章概览</h2>
          <FormItem>
            {getFieldDecorator('overview', {
              rules: [{ required: true, message: '请输入文章概览' }],
            })(
              <Input placeholder="文章概览" />,
            )}
          </FormItem>
          <h2 style={{ margin: '16px 0' }}>文章封面</h2>
          <div>
            <Upload
              action={uploadUrl}
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
          <h2 style={{ margin: '16px 0' }}>文章标签</h2>
          <FormItem>
            {getFieldDecorator('tags', {
              rules: [{ required: true, message: '请选择该文章的标签' }],
            })(
              <Select
                size="large"
                mode="tags"
                style={{ width: '100%' }}
                placeholder="请选择该文章的标签"
                tokenSeparators={['|']}
              >
                {this.renderSelectTag()}
              </Select>,
            )}
          </FormItem>
          <h2 style={{ margin: '16px 0' }}>文章分类</h2>
          <FormItem>
            {getFieldDecorator('catalog', {
              rules: [{ required: true, message: '请选择该文章的分类' }],
            })(
              <Select
                size="large"
                style={{ width: '100%' }}
                placeholder="请选择该文章的分类"
              >
                {this.renderSelectCatalog()}
              </Select>,
            )}
          </FormItem>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <FormItem>
              <Button style={{ marginRight: '16px' }} htmlType="submit">存草稿</Button>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">发布文章</Button>
            </FormItem>
          </div>
        </Form>
      </div>
    );
  }
}

const WrappedWriteArticle = Form.create()(WriteArticle);

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
  };
}

export default connect(mapStateToProps)(WrappedWriteArticle);
