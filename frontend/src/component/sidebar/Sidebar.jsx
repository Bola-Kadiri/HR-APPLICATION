
import { Menu } from 'antd';
import { useState } from 'react';
import '../../component/sidebar/Sidebar.css'
import {
    AppstoreOutlined,
    // ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    PieChartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
  import {  Link } from 'react-router-dom';
  import { Button} from 'antd';

const items = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: <Link to="/view-application">View Application</Link>
    },
    {
      key: '3',
      icon: <AppstoreOutlined />,
      label: <Link to="/view-job">View Job</Link>
    },
    
    
    {
      key: '24',
      label: 'Analytics',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: '25',
          label: <Link to="/facility">Application history</Link>,
        },
        {
          key: '26',
          label: <Link to="/occupant">Job history</Link>,
        },
       
      ],
    },

      {
        key: '7',
        icon: <MailOutlined />,
        label: <Link to="/logout">Logout</Link>
      },
    
      
  ];
  

const Sidebar = ()=>{
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
      };
    return(
        <div
        className='menu'
        style={{
          width: collapsed ? '60px' : '280px', // Adjust width based on collapsed state
          transition: 'width 0.2s', // Smooth transition when collapsing or expanding
          height: '100%'
        }}
        >
             <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            position: 'absolute',
            top: '10px',
            left: collapsed ? '10px' : '180px',
            marginBottom: '30px',
            marginTop: '15px',
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
          style={{
            backgroundColor: '#0c1b32',
            boxShadow: "0px 2px 14px 8px rgba(0, 0, 0, 0.15)",
            fontWeight: '500',
            paddingTop: '100px',
            minHeight: '100vh',
            fontSize: '15px',
            width: '100%', // Set to 100% so it uses the full width of the parent div
            textDecoration: 'none',
          }}
        />
        </div>
    )
}

export default Sidebar