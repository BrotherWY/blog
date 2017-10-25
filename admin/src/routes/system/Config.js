import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button, Modal, message } from 'antd';
import { PAGING, UPDATE, DELETE, ADD, BATCH_DELETE, SEARCH } from '../../constants/ActionType';
import AddAndUpdate from '../../components/AddAndUpdate';
import Search from '../../components/Search';
import FormatDate from '../../utils/date';
import Image from '../../components/Image';

class Config extends Component {
  constructor(props) {
    super(props);
    const formItems = [{
      label: '配置名',
      name: 'name',
      disabled: false,
      validate: {
        rules: [{
          required: true, message: '配置名不能为空',
        }],
      },
    }, {
      label: 'url',
      name: 'url',
      disabled: false,
      validate: {
        rules: [{
          required: true, message: 'url不能为空',
        }],
      },
    }, {
      label: '排序',
      name: 'sort',
      disabled: false,
      validate: {
        rules: [{
          required: true, message: '排序不能为空',
        }],
      },
    }, {
      label: '图片',
      name: 'img_url',
      disabled: false,
      isUpload: true,
      validate: {
        rules: [{
          required: true, message: '图片不能为空',
        }],
      },
    }, {
      label: '代码',
      name: 'code',
      disabled: false,
      isSelect: false,
      validate: {
        rules: [{
          required: true, message: '代码不能为空',
        }],
      },
    }, {
      label: '内容',
      name: 'content',
      disabled: false,
      isSelect: false,
      validate: {
        rules: [{
          required: true, message: '内容不能为空',
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
        label: '配置名',
        name: 'name',
        disabled: false,
      }, {
        label: '代码名',
        name: 'code',
        disabled: false,
      }],
      columns: [
        { title: '配置名', dataIndex: 'name', key: 'name' },
        { title: '图片', dataIndex: 'img_url', key: 'img_url', render: text => <Image src={text} /> },
        { title: 'url', dataIndex: 'url', key: 'url' },
        { title: '排序', dataIndex: 'sort', key: 'sort' },
        { title: '代码', dataIndex: 'code', key: 'code' },
        { title: '内容', dataIndex: 'content', key: 'content' },
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
      type: `config/${PAGING}`,
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
      type: `config/${DELETE}`,
      payload: { id, pageIndex, pageSize },
    });
  }

  handleEdit(record) {
    const data = {
      id: record.id,
      name: record.name,
      url: record.url,
      img_url: record.img_url,
      sort: record.sort,
      code: record.code,
      content: record.content,
    };
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
      type: `config/${BATCH_DELETE}`,
      payload: { pageIndex, pageSize, selectIds },
    });
  }

  handleAdd() {
    this.setState({ addVisible: true });
  }

  handlePageChange(pageIndex, pageSize) {
    const { dispatch } = this.props;
    dispatch({
      type: `config/${PAGING}`,
      payload: {
        pageIndex,
        pageSize,
      },
    });
    this.setState({ pageIndex: pageIndex });
  }

  render() {
    const { configs, loading, dispatch, total } = this.props;
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
          type={`config/${SEARCH}`}
          otherType={`config/${PAGING}`}
          handleAdd={this.handleAdd}
          dispatch={dispatch}
        />
        <Table
          columns={columns}
          dataSource={configs}
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
          title="增加配置"
          dispatch={dispatch}
          type={`config/${ADD}`}
          visible={addVisible}
          loading={loading}
          handleCancel={this.handleCancel}
          formItems={addFormItems}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
        <AddAndUpdate
          title="修改配置"
          dispatch={dispatch}
          type={`config/${UPDATE}`}
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
    configs: state.config.configs,
    total: state.config.total,
    allConfigs: state.config.allConfigs,
  };
}

export default connect(mapStateToProps)(Config);
