import { connect } from 'dva';
import React, { Component } from 'react';
import LzEditor from 'react-lz-editor';
import { Button, Select, Form, Input, message, Upload, Icon, Modal, Spin } from 'antd';
// LzEditor和dva可能有冲突 样式无法自己加载
import 'antd/lib/modal/style';
import 'antd/lib/popconfirm/style';
import { FETCH_ALL, ADD, UPLOAD_URL } from '../../constants/ActionType';

class WriteArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: 0, // 0 草稿 1 发布
      content: '', // 文章内容
      fileList: [], // 封面上传图片数量
      previewVisible: false,
      previewImage: '',
    };
    this.getContent = this.getContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.setFlag = this.setFlag.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({ type: `tag/${FETCH_ALL}` });
    dispatch({ type: `catalog/${FETCH_ALL}` });
  }

  getContent(content) {
    this.setState({ content: content });
  }

  setFlag(flag) {
    this.setState({ flag: flag });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { fileList, content, flag } = this.state;
    const { dispatch } = this.props;
    this.props.form.validateFields((err, article) => {
      if (!err) {
        if (fileList.length < 1) {
          message.error('请上传文章封面');
          return null;
        }
        if (content.length < 10) {
          message.error('文章还没写呢！！');
          return null;
        }
        article.content = content;
        article.cover = fileList[0].response.url;
        article.tags = article.tags.join(',');
        article.flag = flag;
        // 文章内容存储到数据库
        dispatch({
          type: `article/${ADD}`,
          payload: article,
        });
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

  renderSelectTag() {
    const { tags } = this.props;
    const Option = Select.Option;
    return tags.map((tag, i) => <Option value={tag.id} key={i}>{tag.name}</Option>);
  }

  renderSelectCatalog() {
    const { catalogs } = this.props;
    const Option = Select.Option;
    return catalogs.map((catalog, i) => <Option value={catalog.id} key={i}>{catalog.name}</Option>);
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const { fileList, previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Spin tip="Loading..." spinning={this.props.loading}>
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
                mode="multiple"
                size="large"
                style={{ width: '100%' }}
                placeholder="请选择该文章的标签"
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
              <Button style={{ marginRight: '16px' }} htmlType="submit" onClick={() => { this.setFlag(0); }}>存草稿</Button>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" onClick={() => { this.setFlag(1); }}>发布文章</Button>
            </FormItem>
          </div>
        </Form>
      </Spin>
    );
  }
}

const WrappedWriteArticle = Form.create()(WriteArticle);

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    tags: state.tag.tags,
    catalogs: state.catalog.catalogs,
  };
}

export default connect(mapStateToProps)(WrappedWriteArticle);
