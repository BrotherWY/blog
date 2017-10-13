import React, { Component } from 'react';
import LzEditor from 'react-lz-editor';
import { Button, Select } from 'antd';
// LzEditor和dva可能有冲突 样式无法自己加载
import 'antd/lib/modal/style';
import 'antd/lib/popconfirm/style';

class WriteArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseList: [],
      content: '',
    };
    this.saveDraft = this.saveDraft.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.receiveMarkdown = this.receiveMarkdown.bind(this);
    this.publishArticle = this.publishArticle.bind(this);
  }

  receiveMarkdown(content) {
    this.setState({ content: content });
  }

  publishArticle() {

  }

  saveDraft() {

  }

  handleChange() {

  }

  renderSelectTag() {
    // const Option = Select.Option;
  }

  render() {
    return (
      <div>
        <LzEditor
          cbReceiver={this.receiveMarkdown}
          active
          video={false}
          audio={false}
          image={false}
          convertFormat="markdown"
        />
        <Select
          mode="tags"
          style={{ width: '100%' }}
          tokenSeparators={[',']}
        >
          {this.renderSelectTag()}
        </Select>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button style={{ marginRight: '16px' }} onClick={this.saveDraft}>存草稿</Button>
          <Button type="primary" onClick={this.publishArticle}>发布文章</Button>
        </div>
      </div>
    );
  }
}

export default WriteArticle;
