import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm } from 'antd';
import { FETCH_ALL, UPDATE, DELETE, ADD } from '../../constants/ActionType';
import Add from '../../components/Add';
import Update from '../../components/Update';

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
      columns: [
        { title: '标签名', dataIndex: 'name', key: 'name' },
        { title: '文章数量', dataIndex: 'count', key: 'count' },
        { title: '介绍', dataIndex: 'intro', key: 'intro' },
        { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
        { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt' },
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
      addFormItems: formItems,
      updateFormItems: formItems.concat({
        label: 'id',
        name: 'id',
        disabled: true,
        validate: {},
      }),
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: `tag/${FETCH_ALL}`,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.props.loading) {
      this.setState({ updateVisible: false, addVisible: false });
    }
  }

  handleDelete(id) {
    const { dispatch } = this.props;
    dispatch({
      type: `tag/${DELETE}`,
      payload: id,
    });
  }

  handleEdit(record) {
    const data = { id: record.id, name: record.name, intro: record.intro };
    this.setState({ updateVisible: true, updateData: data });
  }

  handleCancel() {
    this.setState({ updateVisible: false, addVisible: false });
  }

  handleSelectAll(selected, selectedRows, changeRows) {
    console.debug(selectedRows, changeRows);
  }

  render() {
    const { tags, loading, dispatch } = this.props;
    const { updateVisible, addVisible, columns, addFormItems, updateData, updateFormItems } = this.state;
    return (
      <div>
        <Table
          columns={columns}
          dataSource={tags}
          pagination
          loading={loading}
          rowKey={record => record.id}
          bordered
          rowSelection={{
            onSelectAll: this.handleSelectAll,
          }}
        />
        <Add
          title="增加标签"
          dispatch={dispatch}
          type={`tag/${ADD}`}
          visible={addVisible}
          loading={loading}
          handleCancel={this.handleCancel}
          formItems={addFormItems}
        />
        <Update
          title="修改标签"
          dispatch={dispatch}
          type={`tag/${UPDATE}`}
          visible={updateVisible}
          loading={loading}
          handleCancel={this.handleCancel}
          formItems={updateFormItems}
          data={updateData}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    tags: state.tag.tags,
  };
}

export default connect(mapStateToProps)(Tag);
