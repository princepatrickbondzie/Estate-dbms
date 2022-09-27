import React, { useState, useEffect } from 'react';
import { useUserState } from '../../container/state/store';
import { BankOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const CalcUser = () => {
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(null)
    const users = useUserState((state) => state.users)
    // console.log(users)

    const calculate = () => {
        setLoading(true)
        if (users !== null) {
            const num = users.length;
            setTotal(num)
            setLoading(false)
        } else {
            setTotal(0)
            setLoading(false)
        }
    }

    useEffect(() => { calculate() }, [users])
    return (
        <div className=' bg-pink-500 h-[6rem] shadow rounded-md px-4 py-4'>
            <div className='flex'>
                <div className='text-gray-50'>
                    <UsergroupAddOutlined className='text-[3.5rem] mx-2 ' />
                </div>
                <div className='ml-10'>
                    <h1 className='text-gray-50 font-[600] text-[12px] uppercase'>Users</h1>
                    <h1 className='text-2xl text-gray-50 -mt-1'>{total !== null ? (<span>{total}</span>) : ''}</h1>
                </div>
            </div>
        </div>
    );
}

export default CalcUser;
