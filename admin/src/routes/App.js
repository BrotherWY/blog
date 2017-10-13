import React, { Component } from 'react';
import { Layout, Menu, Icon, Avatar, Badge, Dropdown } from 'antd';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class App extends Component {

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

  render() {
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
          <Sider width={240} style={{ background: '#fff', minHeight: '800px' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0, fontSize: '14px' }}
            >
              <Menu.Item key="1"><Icon type="mail" />dashboard</Menu.Item>
              <Menu.Item key="2"><Icon type="mail" />标签管理</Menu.Item>
              <Menu.Item key="3"><Icon type="mail" />分类管理</Menu.Item>
              <SubMenu key="4" title={<span><Icon type="setting" /><span>文章管理</span></span>}>
                <Menu.Item key="5">写文章</Menu.Item>
              </SubMenu>
              <SubMenu key="6" title={<span><Icon type="setting" /><span>评论管理</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
              </SubMenu>
              <SubMenu key="7" title={<span><Icon type="setting" /><span>系统管理</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ borderLeft: '1px solid #ECECEC' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>);
  }
}

export default App;
