import React, { Component } from 'react';
import { Modal } from 'antd';

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleClick() {
    this.setState({
      visible: true,
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { src } = this.props;
    const { visible } = this.state;
    return (
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          width: 80,
          height: 50,
          cursor: 'pointer',
        }}
        onClick={this.handleClick}
      >
        <img
          src={src}
          alt="cover"
          style={{
            width: '100px',
            position: 'absolute',
            left: '50%',
            marginLeft: '-50px',
          }}
        />
        <Modal
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <img src={src} alt="cover" style={{ width: 488 }} />
        </Modal>
      </div>
    );
  }
}

export default Image;
