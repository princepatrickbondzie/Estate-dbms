import React, { useState } from 'react'
import { BsArrowLeftShort, BsPerson, BsReverseLayoutTextSidebarReverse, BsFillImageFill, BsSearch, BsChevronDown } from 'react-icons/bs'
import { AiFillEnvironment } from 'react-icons/ai'
import { RiDashboardFill } from 'react-icons/ri'
import { AiOutlineFileText, AiOutlineBarChart, AiOutlineMail, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai'
import { Outlet, NavLink } from 'react-router-dom'

export default function App() {
    const [open, setOpen] = useState(true);
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const Menus = [
        { title: 'Home', path: '/stats' },
        { title: 'Appartments', path: '/appartments', icon: <AiOutlineFileText /> },
        { title: 'Invoice', path: '/invoice', spacing: true, icon: <BsFillImageFill /> },
        // {
        //   title: 'Projetcs',
        //   spacing: true, 
        //   submenu: true, path: '/',
        //   icon: <BsReverseLayoutTextSidebarReverse/>, 
        //   submenuItems: [
        //     {title: 'Submenu 1', path: '/appartments'},
        //     {title: 'Submenu 2', path: '/transactions'},
        //     {title: 'Submenu 3', path: '/users'},
        //   ],
        // },
        { title: 'Transactions', path: '/transactions', icon: <AiOutlineBarChart /> },
        { title: 'Messages', path: '/message', icon: <AiOutlineMail /> },
        { title: 'Users', path: '/users', spacing: true, icon: <BsPerson /> },
        { title: 'Settings', path: '/transactions', icon: <AiOutlineSetting /> },
        { title: 'Logout', path: '/auth', icon: <AiOutlineLogout /> },
    ];

    return (
        <Layout className=''>
            <Header className="p-0 flex items-center justify-between w-full transition"
                style={{
                    position: 'fixed',
                    zIndex: 1,
                }}
            >
                <Button type='' className='bg-none' onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <MenuUnfoldOutlined className='text-xl trigger' /> : <MenuFoldOutlined className='text-xl trigger' />}
                </Button>
                <div className='text-white flex items-center'>
                    {/* <Avatar size="larger" icon={<UserOutlined />} style={{
            backgroundColor: '#87d068',
          }} /> */}
                    <Dropdown overlay={menu} trigger={['click']} className='cursor-pointer'>
                        <div className="flex items-center text-sm" onClick={(e) => e.preventDefault()}>
                            <div className="mx-4">
                                <div className="leading-1">{user.fullname}</div>
                                <div className=" text-gray-500 text-sm">{user.email}</div>
                            </div>
                            <DownOutlined />
                        </div>
                    </Dropdown>
                </div>
            </Header>
            <Layout className="site-layout flex pt-16">
                <SideNavigation collapsed={collapsed} />
                <Content className="site-layout-background p-4">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
