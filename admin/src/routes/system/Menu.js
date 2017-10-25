import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button, Modal, message, Icon } from 'antd';
import { FETCH_ALL, PAGING, UPDATE, DELETE, ADD, BATCH_DELETE, SEARCH } from '../../constants/ActionType';
import AddAndUpdate from '../../components/AddAndUpdate';
import Search from '../../components/Search';
import FormatDate from '../../utils/date';

class Menu extends Component {
  constructor(props) {
    super(props);
    const formItems = [{
      label: '菜单名',
      name: 'name',
      disabled: false,
      validate: {
        rules: [{
          required: true, message: '菜单名不能为空',
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
      label: '图标',
      name: 'icon',
      disabled: false,
      isSelect: true,
      selects: [{
        name: '统计面板',
        value: 'pie-chart',
      }, {
        name: '标签',
        value: 'tag-o',
      }, {
        name: '文章管理',
        value: 'book',
      }, {
        name: '垃圾箱',
        value: 'delete',
      }, {
        name: '写作',
        value: 'edit',
      }, {
        name: '草稿箱',
        value: 'file-text',
      }, {
        name: '系统管理',
        value: 'setting',
      }, {
        name: '菜单',
        value: 'menu-fold',
      }, {
        name: '分类管理',
        value: 'bars',
      }, {
        name: '评论',
        value: 'mail',
      }],
      validate: {
        rules: [{
          required: true, message: '图标不能为空',
        }],
      },
    }, {
      label: '类型',
      name: 'flag',
      disabled: false,
      isSelect: true,
      selects: [{
        name: '前台',
        value: '0',
      }, {
        name: '后台',
        value: '1',
      }],
      validate: {
        rules: [{
          required: true, message: '类型不能为空',
        }],
      },
    }, {
      label: '上层菜单',
      name: 'up_id',
      disabled: false,
      isSelect: true,
      // 配置菜单数据
      selects: this.formatAddMenu(),
      validate: {
        rules: [{
          required: true, message: '上层菜单不能为空',
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
        label: '菜单名',
        name: 'name',
        disabled: false,
      }],
      columns: [
        { title: '菜单名', dataIndex: 'name', key: 'name' },
        { title: '图标', dataIndex: 'icon', key: 'icon', render: text => <Icon type={text} /> },
        { title: 'url', dataIndex: 'url', key: 'url' },
        { title: '排序', dataIndex: 'sort', key: 'sort' },
        { title: '类型', dataIndex: 'flag', key: 'flag', render: text => this.formatType(text) },
        { title: '上层菜单', dataIndex: 'up_id', key: 'up_id', render: text => this.formatMenu(text) },
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
      type: `menu/${PAGING}`,
      payload: {
        pageIndex,
        pageSize,
      },
    });
    dispatch({ type: `menu/${FETCH_ALL}` });
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

  formatAddMenu() {
    return [{ name: '顶层菜单', value: '0' }].concat(this.props.allMenus.map((m) => {
      return { name: m.name, value: m.id };
    }));
  }

  formatMenu(val) {
    const { allMenus } = this.props;
    if (val === '0') {
      return '顶层菜单';
    } else {
      const name = allMenus.map((menu) => {
        if (menu.id === val) {
          return menu.name;
        }
        return null;
      });
      return name;
    }
  }

  formatType(val) {
    const types = ['前台', '后台'];
    return types[val];
  }

  handleDelete(id) {
    const { dispatch } = this.props;
    const { pageIndex, pageSize } = this.state;
    dispatch({
      type: `menu/${DELETE}`,
      payload: { id, pageIndex, pageSize },
    });
  }

  handleEdit(record) {
    const data = {
      id: record.id,
      name: record.name,
      url: record.url,
      icon: record.icon,
      sort: record.sort,
      up_id: record.up_id,
      flag: record.flag,
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
      type: `menu/${BATCH_DELETE}`,
      payload: { pageIndex, pageSize, selectIds },
    });
  }

  handleAdd() {
    this.setState({ addVisible: true });
  }

  handlePageChange(pageIndex, pageSize) {
    const { dispatch } = this.props;
    dispatch({
      type: `menu/${PAGING}`,
      payload: {
        pageIndex,
        pageSize,
      },
    });
    this.setState({ pageIndex: pageIndex });
  }

  render() {
    const { menus, loading, dispatch, total } = this.props;
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
          type={`menu/${SEARCH}`}
          otherType={`menu/${PAGING}`}
          handleAdd={this.handleAdd}
          dispatch={dispatch}
        />
        <Table
          columns={columns}
          dataSource={menus}
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
          title="增加菜单"
          dispatch={dispatch}
          type={`menu/${ADD}`}
          visible={addVisible}
          loading={loading}
          handleCancel={this.handleCancel}
          formItems={addFormItems}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
        <AddAndUpdate
          title="修改菜单"
          dispatch={dispatch}
          type={`menu/${UPDATE}`}
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
    menus: state.menu.menus,
    total: state.menu.total,
    allMenus: state.menu.allMenus,
  };
}

export default connect(mapStateToProps)(Menu);
