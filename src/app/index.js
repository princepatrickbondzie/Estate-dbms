import React, { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import {
  AppstoreOutlined,
  DesktopOutlined,
  MailOutlined,
  SlidersOutlined,
  PieChartOutlined,
  UserOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import AntBreadcrumbs from '../components/AntBreadcrumbs';
import { Dropdown, Menu } from 'antd';
import { useUserState } from '../container/state/store'


const navList = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <DesktopOutlined className='mr-2' />,
  },
  {
    name: 'Expenses',
    path: '/expense',
    icon: <FileDoneOutlined className='mr-2' />,
  },
  {
    name: 'Facility Management',
    path: '/facility-management',
    icon: <PieChartOutlined className='mr-2' />,
  },
  {
    name: 'Appartments',
    path: '/appartments',
    icon: <AppstoreOutlined className='mr-2' />,
  },
  {
    name: 'Users',
    path: '/users',
    icon: <UserOutlined className='mr-2' />,
  },
  {
    name: 'Messages',
    path: '/message',
    icon: <MailOutlined className='mr-2' />,
  },
  {
    name: 'Settings',
    path: '/system',
    icon: <SlidersOutlined className='mr-2' />,
  },
]

export default function App() {
  const [time, setTime] = useState();
  const logOut = useUserState((state) => state.logOut)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div className=' cursor-pointer' onClick={() => logOut()}>
              Logout
            </div>
          ),
        },
        // {
        //   key: '4',
        //   danger: true,
        //   label: 'a danger item',
        // },
      ]}
    />
  );

  // console.log(time)
  return (
    <div className='flex'>
      <div className='min-h-screen w-[17%]'>
        <div className='w-full h-16 items-center'>
          <div className="flex items-center justify-between w-full h-full px-3">
            <h2 className="font-semibold mt-3 inline-flex items-center text-gray-800 dark:text-white">
              <svg
                className="w-5 text-green-500"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12" />
                <rect x="3" y="17" width="7" height="6" />
                <rect x="14" y="1" width="7" height="6" />
                <rect x="14" y="11" width="7" height="12" />
              </svg>
              <span className="ml-1 text-xs font-bold tracking-wide uppercase">
                OSEI TUTU II ESTATE
              </span>
            </h2>
            {/* <h2 class="text-2xl font-semibold mt-4 text-gray-800 dark:text-white">Company</h2> */}
            <button className="">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-7 h-7 fill-current dark:text-gray-100">
                <rect width="352" height="32" x="80" y="96"></rect>
                <rect width="352" height="32" x="80" y="240"></rect>
                <rect width="352" height="32" x="80" y="384"></rect>
              </svg>
            </button>
          </div>
        </div>
        <ul className='flex flex-col justify-around w-full mt-4'>
          {navList.map((item, idx) => (
            <li key={idx} className='h-10 w-full px-4 my-1 hover:bg-gray-200 active:bg-gray-200 hover:rounded-full hover:shadow-md'>
              <NavLink to={item.path} className='w-full h-full items-center flex text-gray-700 hover:text-gray-800 font-medium '>
                {item.icon} <span className=''>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className='bg-gray-100 min-h-screen w-[83%] p-0'>
        <nav className='bg-white w-full h-16 flex justify-between px-4 items-center'>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
            <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-green-400 dark:focus:border-green-300 focus:ring-green-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
          </div>
          <div className=' w-[21rem] flex items-center justify-evenly'>
            <div className=''>
              {time ? moment(`${time}`).format('MMMM Do YYYY, h:mm:ss A') : 'Time Loading ...'}
            </div>
            <button className=" text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* <button type="button" className="items-center focus:outline-none" aria-label="toggle profile dropdown">
              <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar" />
              </div>
            </button> */}
            <Dropdown overlay={menu} trigger={['click']} className='cursor-pointer'>
              <div className="flex items-center text-sm" onClick={(e) => e.preventDefault()}>
                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar" />
                </div>
                {/* <DownOutlined /> */}
              </div>
            </Dropdown>
          </div>
        </nav>
        <div className='py-4 px-4'>
          <div>
            <AntBreadcrumbs />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}