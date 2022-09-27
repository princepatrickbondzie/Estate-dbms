import React, { useState, useEffect } from 'react';
import { useUserState } from '../../container/state/store';

const CalculateExpense = () => {
    // const [loading, setLoading] = useState(false)
    const [totalExpenses, setTotalExpenses] = useState(null)
    const [totalExpenseAmount, setTotalExpenseAmount] = useState(null)
    const expenses = useUserState((state) => state.expenses)
    // console.log(expenses)



    useEffect(() => {
        const calculate = () => {
            // setLoading(true)
            if (expenses !== null) {
                const sum = expenses.reduce((accumulator, object) => {
                    return accumulator + object.amount;
                }, 0);
                const num = expenses.length;
                // console.log('num', num)
                setTotalExpenses(num)
                setTotalExpenseAmount(sum)
            } else {

            }
        }
        calculate()
    }, [expenses])

    return (
        <div className=' bg-blue-500 h-[6rem] shadow rounded-md px-4 py-4'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='text-gray-50 font-[600] text-[10px] uppercase'>Total Expenses</h1>
                    <h1 className='text-2xl text-gray-50 -mt-1'>{totalExpenseAmount !== null ? (<span>&#x20B5;{totalExpenseAmount}</span>) : ''}</h1>
                </div>
                <div>
                    <h1 className='text-gray-50 font-[600] text-[10px] uppercase'>Number of expense</h1>
                    <h1 className='text-2xl text-gray-50 -mt-1'>{totalExpenses !== null ? (<span className='mx-auto'>{totalExpenses}</span>) : 'd'}</h1>
                </div>
            </div>
        </div>
    );
}

export default CalculateExpense;
