import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button, Modal, message } from 'antd';
import { PAGING, UPDATE, DELETE, ADD, BATCH_DELETE, SEARCH } from '../../constants/ActionType';
import AddAndUpdate from '../../components/AddAndUpdate';
import Search from '../../components/Search';
import FormatDate from '../../utils/date';

class Tag extends Component {
  constructor(props) {
    super(props);
    const formItems = [{
      label: '标签名',
      name: 'name',
      disabled: false,
      validate: {
        rules: [{
          required: true, message: '标签名不能为空',
        }],
      },
    }, {
      label: '标签介绍',
      name: 'intro',
      disabled: false,
      validate: {
        rules: [{
          required: true, message: '标签介绍不能为空',
        }],
      },
    }];
    this.state = {
      updateVisible: false,
      addVisible: false,
      updateData: {},
      pageIndex: 1,
      pageSize: 10,
      selectIds: [], // 多选的id数组
      batchVisible: false, // 批量删除提示框是否显示
      addFormItems: formItems,
      updateFormItems: formItems.concat({
        label: 'id',
        name: 'id',
        disabled: true,
        validate: {},
      }),
      searchFormItems: [{
        label: '标签名',
        name: 'name',
        disabled: false,
      }],
      columns: [
        { title: '标签名', dataIndex: 'name', key: 'name' },
        { title: '文章数量', dataIndex: 'count', key: 'count' },
        { title: '介绍', dataIndex: 'intro', key: 'intro' },
        { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', render: text => this.formatTime(text) },
        { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt', render: text => this.formatTime(text) },
        { title: '当前版本', dataIndex: 'version', key: 'version' },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          render: (text, record) => (
            <span>
              <span style={{ marginRight: '16px', color: '#4396ec', cursor: 'pointer' }} onClick={() => { this.handleEdit(record); }}>编辑</span>
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
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleBatchDel = this.handleBatchDel.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const { pageIndex, pageSize } = this.state;
    dispatch({
      type: `tag/${PAGING}`,
      payload: {
        pageIndex,
        pageSize,
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.props.loading) {
      this.setState({
        updateVisible: false,
        addVisible: false,
        batchVisible: false,
      });
    }
  }

  formatTime(val) {
    return new FormatDate(val).farmat('YYYY-MM-DD hh:mm');
  }

  handleDelete(id) {
    const { dispatch } = this.props;
    const { pageIndex, pageSize } = this.state;
    dispatch({
      type: `tag/${DELETE}`,
      payload: { id, pageIndex, pageSize },
    });
  }

  handleEdit(record) {
    const data = { id: record.id, name: record.name, intro: record.intro };
    this.setState({ updateVisible: true, updateData: data });
  }

  handleCancel() {
    this.setState({ updateVisible: false, addVisible: false, batchVisible: false });
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
    dispatch({
      type: `tag/${BATCH_DELETE}`,
      payload: { pageIndex, pageSize, selectIds },
    });
  }

  handleAdd() {
    this.setState({ addVisible: true });
  }

  handlePageChange(pageIndex, pageSize) {
    const { dispatch } = this.props;
    dispatch({
      type: `tag/${PAGING}`,
      payload: {
        pageIndex,
        pageSize,
      },
    });
    this.setState({ pageIndex: pageIndex });
  }

  render() {
    const { tags, loading, dispatch, total } = this.props;
    const {
      updateVisible,
      addVisible,
      columns,
      addFormItems,
      updateData,
      updateFormItems,
      pageIndex,
      pageSize,
      batchVisible,
      searchFormItems,
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
          formItems={searchFormItems}
          pageIndex={pageIndex}
          pageSize={pageSize}
          type={`tag/${SEARCH}`}
          otherType={`tag/${PAGING}`}
          handleAdd={this.handleAdd}
          dispatch={dispatch}
        />
        <Table
          columns={columns}
          dataSource={tags}
          pagination={pagination}
          loading={loading}
          rowKey={record => record.id}
          bordered
          footer={() => (<Button type="primary" icon="delete" onClick={this.handleBatchDel}>批量删除</Button>)}
          rowSelection={{
            onChange: this.handleSelect,
          }}
        />
        <AddAndUpdate
          title="增加标签"
          dispatch={dispatch}
          type={`tag/${ADD}`}
          visible={addVisible}
          loading={loading}
          handleCancel={this.handleCancel}
          formItems={addFormItems}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
        <AddAndUpdate
          title="修改标签"
          dispatch={dispatch}
          type={`tag/${UPDATE}`}
          visible={updateVisible}
          loading={loading}
          handleCancel={this.handleCancel}
          formItems={updateFormItems}
          data={updateData}
          pageIndex={pageIndex}
          pageSize={pageSize}
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
    tags: state.tag.tags,
    total: state.tag.total,
  };
}

export default connect(mapStateToProps)(Tag);
