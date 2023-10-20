import { useState } from "react";
import { useNavigate } from "react-router-dom";

import  { Layout, Menu, Button, theme } from "antd";
import { Outlet } from "react-router-dom";
import localStorage from "../../services/localStorage";
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const AppHeader = () => {

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }} = theme.useToken();

  const [menuItems, setMenuItems] = useState([
    {
      label: "Dashboard",
      link: "dashboard"
    },
    {
      label: "Profile",
      link: "profile"
    },
    {
      label: "Ask Voluteer",
      link: "addPost"

    },
    {
      label: "History",
      link: "posts"
    },
    {
      label: "Events",
      link: "event"
    }
  ])

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate("/login")
  }

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={
              [ 
                ...menuItems.map((item, index) => {
                  return {
                    key: index,
                    icon: <UserOutlined />,
                    label: item.label,
                    onClick: () => {navigate(item.link)}
                  }
                })

                ,{
                  key: menuItems.length,
                  icon: <VideoCameraOutlined />,
                  label: 'Logout',
                  onClick: ()=> {logout()}
                }
              ]
   
          }
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default AppHeader
