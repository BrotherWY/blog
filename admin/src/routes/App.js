import React, { Component } from 'react';
import { Layout, Menu, Icon, Avatar, Badge, Dropdown, Breadcrumb } from 'antd';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [
        {
          id: 1,
          up_id: 0,
          name: '统计面板',
          url: '/dashboard',
          icon: 'pie-chart',
        },
        {
          id: 2,
          up_id: 0,
          name: '标签管理',
          url: '/tag',
          icon: 'tag',
        },
        {
          id: 3,
          up_id: 0,
          name: '分类管理',
          url: '/catalog',
          icon: 'compass',
        },
        {
          id: 4,
          up_id: 0,
          name: '文章管理',
          url: '',
          icon: 'book',
        },
        {
          id: 5,
          up_id: 4,
          name: '写文章',
          url: '/article/write',
          icon: 'edit',
        },
        {
          id: 6,
          up_id: 0,
          name: '评论管理',
          url: '',
          icon: 'book',
        },
        {
          id: 7,
          up_id: 0,
          name: '系统管理',
          url: '',
          icon: 'setting',
        },
        {
          id: 8,
          up_id: 7,
          name: '菜单管理',
          url: '/system/menu',
          icon: 'setting',
        },
      ],
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect({ selectedKeys }) {
    this.state.menus.forEach((menu) => {
      if (menu.url && menu.id === parseInt(selectedKeys, 0)) {
        this.props.history.push(menu.url);
      }
    });
  }
  renderDropMenus() {
    return (
      <Menu>
        <Menu.Item key="0">
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" disabled>3d menu item（disabled）</Menu.Item>
      </Menu>
    );
  }

  renderLeftMenus() {
    return this.state.menus.map((menu) => {
      if (menu.up_id === 0 && menu.url) {
        return (<Menu.Item key={menu.id}><Icon type={menu.icon} />{menu.name}</Menu.Item>);
      } else if (menu.up_id === 0 && !menu.url) {
        const childMenus = this.state.menus.map((m) => {
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
    const { children } = this.props;

    return (
      <Layout>
        <div style={{ marginBottom: '24px', padding: '0 48px', background: '#fff' }}>
          <div style={{ float: 'left', lineHeight: '80px' }}>
            <img src="" alt="logo" />
          </div>
          <div style={{ lineHeight: '80px', float: 'right', marginRight: '50px' }}>
            <Dropdown overlay={this.renderDropMenus()}>
              <Badge count={1}><Avatar icon="user" size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Badge>
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

export default App;
