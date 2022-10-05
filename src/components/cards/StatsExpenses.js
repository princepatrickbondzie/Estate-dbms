import React from 'react';
import { DatePicker } from 'antd';

const StatsExpenses = () => {
    const onDateChange = (date, dateString) => {
        console.log(dateString);
    }
    return (
        <div className=' h-[70vh] bg-white shadow-sm rounded p-4'>
            <div className='flex justify-between'>
                <h1 className='text-gray-500 font-semibold text-[14px] uppercase'>Expenses</h1>
                <div>
                    <DatePicker picker='month' onChange={onDateChange} />
                </div>
            </div>
            <div className='border my-4'>
            </div>

        </div>
    );
}

export default StatsExpenses;
