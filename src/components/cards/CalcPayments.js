import React, { useState, useEffect } from 'react';
import { useUserState } from '../../container/state/store';

const CalcPayments = () => {
    const [loading, setLoading] = useState(false)
    const [transactions, setTransactions] = useState(null)
    const [total, setTotal] = useState(null)
    const payments = useUserState((state) => state.payments)
    // console.log(payments)

    const calculate = () => {
        setLoading(true)
        if (payments !== null) {
            const sum = payments.reduce((accumulator, object) => {
                return accumulator + object.amount;
            }, 0);
            const num = payments.length;
            // console.log('num', sum)
            setTransactions(num)
            setTotal(sum)
            setLoading(false)
        } else {
            setTransactions(0)
            setTotal(0)
            setLoading(false)
        }
    }

    useEffect(() => { calculate() }, [payments])

    return (
        <div className=' bg-red-500 h-[6rem] shadow rounded-md px-4 py-4'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='text-gray-50 font-[600] text-[10px] uppercase'>Total Fee Received</h1>
                    <h1 className='text-2xl text-gray-50 -mt-1'>{total !== null ? (<span>&#x20B5;{total}</span>) : ''}</h1>
                </div>
                <div>
                    <h1 className='text-gray-50 font-[600] text-[10px] uppercase'>No. of Transactions</h1>
                    <h1 className='text-2xl text-gray-50 -mt-1'>{transactions !== null ? (<span className='mx-auto'>{transactions}</span>) : 'no data'}</h1>
                </div>
            </div>
        </div>
    );
}

export default CalcPayments;
