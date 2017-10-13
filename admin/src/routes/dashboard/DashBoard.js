import React, { Component } from 'react';
import { Modal } from 'antd';
import LzEditor from 'react-lz-editor/editor/index';

class Home extends Component {
  constructor(props) {
    super(props);
    this.receiveHtml = this.receiveHtml.bind(this);
  }
  receiveHtml(content) {
    console.log('recieved HTML content', content);
  }
  render() {
    return (
      <div>
        <LzEditor
          cbReceiver={this.receiveHtml}
          active
          convertFormat="markdown"
        />
        <Modal />
      </div>
    );
  }
}

export default Home;
