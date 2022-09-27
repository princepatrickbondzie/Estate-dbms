import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/layout.css'
import {

} from '@ant-design/icons';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    SlidersOutlined,
    PieChartOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    FileDoneOutlined
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(<NavLink to="/expense">Expense</NavLink>, '1', <FileDoneOutlined />),
    getItem(<NavLink to='/facility-management'>Facility Management</NavLink>, '2', <PieChartOutlined />),
    getItem(<NavLink to='/appartments'>Appartments</NavLink>, '3', <AppstoreOutlined />),
    getItem(<NavLink to='/system'>System</NavLink>, '4', <SlidersOutlined />),
    getItem(<NavLink to='/users'>Users</NavLink>, '5', <UserOutlined />),
    getItem(<NavLink to='/message'>Notification</NavLink>, '6', <MailOutlined />),
];

export default function SideNavigation({ collapsed }) {
    return (
        <div className='min-h-[100vh] bg-[#001529]'>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ overflow: 'auto', height: '100vh', position: 'sticky', top: 0, left: 0, }} className=''>
                <div className="h-16">
                    <div></div>
                </div>
                <Menu className="menu"
                    theme='dark'
                    mode="inline"
                    items={items}
                />
            </Sider>
        </div>
    )
}
