import React, { Component } from 'react';
import { Layout, Menu, Icon, Avatar, Badge, Dropdown, Breadcrumb } from 'antd';
import { connect } from 'dva';
import { FETCH_ALL } from '../constants/ActionType';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }


  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({ type: `menu/${FETCH_ALL}` });
  }


  handleSelect({ selectedKeys }) {
    this.props.allMenus.forEach((menu) => {
      if (menu.url !== '/' && menu.id === selectedKeys[0]) {
        this.props.history.push(menu.url);
      }
    });
  }
  renderDropMenus() {
    return (
      <Menu>
        <Menu.Item key="0">
          <a target="_blank" rel="noopener noreferrer">个人信息</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a target="_blank" rel="noopener noreferrer">更改头像</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a target="_blank" rel="noopener noreferrer" >退出系统</a>
        </Menu.Item>
      </Menu>
    );
  }

  renderLeftMenus() {
    // 先根据sort排个序
    this.props.allMenus.sort((a, b) => {
      return a.sort - b.sort;
    });
    return this.props.allMenus.map((menu) => {
      if (menu.up_id === '0' && menu.url !== '/') {
        return (<Menu.Item key={menu.id}><Icon type={menu.icon} />{menu.name}</Menu.Item>);
      } else if (menu.up_id === '0' && menu.url === '/') {
        const childMenus = this.props.allMenus.map((m) => {
          if (menu.id === m.up_id) {
            return (<Menu.Item key={m.id}><Icon type={m.icon} />{m.name}</Menu.Item>);
          }
          return null;
        });
        return (
          <SubMenu
            key={menu.id}
            title={<span><Icon type={menu.icon} /><span>{menu.name}</span></span>}
          >
            {childMenus}
          </SubMenu>);
      }
      return null;
    });
  }

  renderBreadcrumb() {
    const { location } = this.props;
    const paths = location.pathname.split('/'); // paths is array [0] 空
    let breadcrumbItem = {};
    if (paths.length > 2) {
      breadcrumbItem = paths.map((path, i) => {
        if (path) {
          return (<Breadcrumb.Item key={i}>{path}</Breadcrumb.Item>);
        }
        return null;
      });
    } else {
      breadcrumbItem = (
        <Breadcrumb.Item>{paths[1]}</Breadcrumb.Item>
      );
    }
    return (
      <Breadcrumb separator="/" style={{ height: 32 }}>
        <Breadcrumb.Item href="/dashboard"><Icon type="home" /></Breadcrumb.Item>
        {breadcrumbItem}
      </Breadcrumb>
    );
  }

  render() {
    const { children, history } = this.props;

    return (
      <Layout style={{ minHeight: '100%' }}>
        <div style={{ marginBottom: '24px', padding: '0 48px', background: '#fff' }}>
          <a style={{ float: 'left', lineHeight: '80px', fontSize: '20px' }} onClick={() => history.push('/dashboard')}>
            博客后台
          </a>
          <div style={{ lineHeight: '80px', float: 'right', marginRight: '50px' }}>
            <Dropdown overlay={this.renderDropMenus()}>
              <Badge count={0}><Avatar icon="user" size="large" src="" /></Badge>
            </Dropdown>
          </div>
        </div>
        <Layout style={{ padding: '0 48px' }}>
          <Sider width={240} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['dashboard']}
              style={{ height: '100%', borderRight: 0, fontSize: '14px' }}
              onSelect={this.handleSelect}
            >
              {this.renderLeftMenus()}
            </Menu>
          </Sider>
          <Layout style={{ borderLeft: '1px solid #ECECEC' }}>
            <Content style={{ background: '#fff', padding: 16, margin: 0, minHeight: 280 }}>
              {this.renderBreadcrumb()}
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>);
  }
}

function mapStateToProps(state) {
  return {
    allMenus: state.menu.allMenus,
  };
}

export default connect(mapStateToProps)(App);

