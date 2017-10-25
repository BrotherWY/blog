import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button, Modal, message } from 'antd';
import { PAGING, DELETE, BATCH_DELETE, SEARCH } from '../../constants/ActionType';
import Search from '../../components/Search';
import FormatDate from '../../utils/date';
import Image from '../../components/Image';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      pageSize: 10,
      selectIds: [], // 多选的id数组
      batchVisible: false, // 批量删除提示框是否显示
      columns: [
        { title: '文章标题', dataIndex: 'title', key: 'title' },
        { title: '文章封面', dataIndex: 'cover', key: 'cover', render: text => <Image src={text} /> },
        { title: '观看数', dataIndex: 'views', key: 'views' },
        { title: '文章状态', dataIndex: 'flag', key: 'flag', render: statu => this.formatStatu(statu) },
        { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', render: text => this.formatTime(text) },
        { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt', render: text => this.formatTime(text) },
        { title: '当前版本', dataIndex: 'version', key: 'version' },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          render: (text, record) => (
            <span>
              <span style={{ marginRight: '16px', color: '#4396ec', cursor: 'pointer' }} onClick={() => { this.handleView(record); }}>查看</span>
              <Popconfirm title="确定删除吗?" onConfirm={() => { this.handleDelete(record.id); }} okText="yes" cancelText="no">
                <span style={{ color: '#4396ec', cursor: 'pointer' }}>删除</span>
              </Popconfirm>
            </span>
          ),
        },
      ],
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleBatchDel = this.handleBatchDel.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const { pageIndex, pageSize } = this.state;
    const flag = 2;
    dispatch({
      type: `article/${PAGING}`,
      payload: {
        pageIndex,
        pageSize,
        flag,
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.props.loading) {
      this.setState({
        batchVisible: false,
      });
    }
  }

  formatTime(val) {
    return new FormatDate(val).farmat('YYYY-MM-DD hh:mm');
  }

  formatStatu(val) {
    const status = ['未发布', '已发布', '已下架'];
    return status[val];
  }

  handleDelete(id) {
    const { dispatch } = this.props;
    const { pageIndex, pageSize } = this.state;
    const flag = 2;
    dispatch({
      type: `article/${DELETE}`,
      payload: { id, pageIndex, pageSize, flag },
    });
  }

  handleView() {
    // 前往独立页面查看
  }

  handleEdit() {
    // 不在本页面编辑
  }

  handleCancel() {
    this.setState({ batchVisible: false });
  }

  handleSelect(ids, selectedRows) {
    this.setState({ selectIds: selectedRows });
  }

  handleBatchDel() {
    if (this.state.selectIds.length < 1) {
      message.warn('请至少选择一行');
      return;
    }
    this.setState({ batchVisible: true });
  }

  handleOk() {
    const { dispatch } = this.props;
    const { pageIndex, pageSize, selectIds } = this.state;
    const flag = 2;
    dispatch({
      type: `article/${BATCH_DELETE}`,
      payload: { pageIndex, pageSize, selectIds, flag },
    });
  }

  handlePageChange(pageIndex, pageSize) {
    const { dispatch } = this.props;
    const flag = 2;
    dispatch({
      type: `article/${PAGING}`,
      payload: {
        pageIndex,
        pageSize,
        flag,
      },
    });
    this.setState({ pageIndex: pageIndex });
  }

  render() {
    const { articles, loading, dispatch, total } = this.props;
    const {
      columns,
      pageIndex,
      pageSize,
      batchVisible,
     } = this.state;
    const pagination = {
      total: total,
      pageSize: pageSize,
      current: pageIndex,
      onChange: this.handlePageChange,
    };
    return (
      <div>
        <Search
          pageIndex={pageIndex}
          pageSize={pageSize}
          type={`article/${SEARCH}`}
          otherType={`article/${PAGING}`}
          handleAdd={this.handleAdd}
          dispatch={dispatch}
        />
        <Table
          columns={columns}
          dataSource={articles}
          pagination={pagination}
          loading={loading}
          rowKey={record => record.id}
          bordered
          footer={() => (<Button type="primary" icon="delete" onClick={this.handleBatchDel}>批量删除</Button>)}
          rowSelection={{
            onChange: this.handleSelect,
          }}
        />
        <Modal
          title="批量删除"
          visible={batchVisible}
          onOk={this.handleOk}
          confirmLoading={loading}
          onCancel={this.handleCancel}
        >
          <p>是否批量删除???</p>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    articles: state.article.articles,
    total: state.article.total,
  };
}

export default connect(mapStateToProps)(Article);
