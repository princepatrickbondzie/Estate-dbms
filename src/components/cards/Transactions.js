import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd';
import instance from '../../container/services/provider';

const exp = async () => {
    const { data } = await instance.get('/expense/all')
    return data.expenses;
}

const pym = async () => {
    const { data } = await instance.get('/record-payment/all')
    return data.recordPayments;
}

export default function Transactions() {
    const [loading, setLoading] = useState(false)
    const [month, setMonth] = useState('')
    const [expense, setExpense] = useState()
    const [payment, setPayment] = useState()

    const onChange = (dateString) => {
        setMonth(dateString)
    };

    const getData = async () => {
        setLoading(true)
        Promise.all([exp(), pym()]).then((value) => {
            console.log(value)
            setExpense(value[0])
            setPayment(value[1])
        })
        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])


    const filt = () => {
        if (month && month !== '') {
            const filtExpress = expense.filter(
                (value) =>
                    [new Date(value.createdAt).getFullYear(), new Date(value.createdAt).getMonth()].join('-') === month
            )

            const filtPay = payment.filter(
                (value) =>
                    [new Date(value.createdAt).getFullYear(), new Date(value.createdAt).getMonth()].join('-') === month
            )

            Promise.all([filtExpress, filtPay]).then((value) => {
                
            })

        }
    }


    return (
        <div>
            <div className="">
                <div className="max-w-sm bg-white shadow rounded p-6">
                    <div className="flex items-center justify-between">
                        <p className="focus:outline-none text-xl font-semibold text-gray-800">Transactions</p>
                        <DatePicker onChange={onChange} picker="month" value={month} className='w-[8rem]' />
                    </div>
                    <p tabindex="0" className="focus:outline-none text-sm leading-normal text-gray-500 pt-2">43 transactions</p>
                    <div className="mt-6 bg-gray-100 p-1 rounded w-full flex items-center justify-between">
                        <button className="focus:ring-offset-2 focus:ring-gray-400 focus:ring-2 text-sm py-2 focus:outline-none hover:bg-white bg-white px-14 hover:shadow shadow rounded-md leading-normal text-gray-600">Paid</button>
                        <button className="focus:ring-offset-2 focus:ring-gray-400 focus:ring-2 text-sm py-2 focus:outline-none hover:bg-white px-14 focus:bg-white hover:shadow focus:shadow rounded-md leading-normal text-gray-600 ml-4">Recieved</button>
                    </div>
                    <div className="flex items-start justify-between mt-6 w-full">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-100 rounded">
                                <img src="https://cdn.tuk.dev/assets/components/misc/profile-img-1.png" alt="woman avatar" tabindex="0" className="focus:outline-none w-full h-full" />
                            </div>
                            <div className="pl-3">
                                <p tabindex="0" className="focus:outline-none text-sm font-medium leading-normal text-gray-800">Sandra Rogers</p>
                                <p tabindex="0" className="focus:outline-none text-xs leading-3 pt-2 text-gray-600">3 bills</p>
                            </div>
                        </div>
                        <p tabindex="0" className="focus:outline-none text-sm font-medium leading-normal text-right text-red-700">$12,847</p>
                    </div>
                    <div className="flex items-start justify-between mt-6 w-full">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <img src="https://cdn.tuk.dev/assets/components/misc/RT.png" alt="profile" tabindex="0" className="focus:outline-none " />
                            </div>
                            <div className="pl-3">
                                <p tabindex="0" className="focus:outline-none text-sm font-medium leading-normal text-gray-800">Raymond Tusk</p>
                                <p tabindex="0" className="focus:outline-none text-xs leading-3 pt-2 text-gray-600">7 bills</p>
                            </div>
                        </div>
                        <p tabindex="0" className="focus:outline-none text-sm font-medium leading-normal text-right text-red-700">$11,847</p>
                    </div>
                    <div className="flex items-start justify-between mt-6 w-full">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <img src="https://cdn.tuk.dev/assets/components/misc/JR.png" alt="profile" tabindex="0" className="focus:outline-none " />
                            </div>
                            <div className="pl-3">
                                <p tabindex="0" className="focus:outline-none text-sm font-medium leading-normal text-gray-800">Jane Roberts</p>
                                <p tabindex="0" className="focus:outline-none text-xs leading-3 pt-2 text-gray-600">4 bills</p>
                            </div>
                        </div>
                        <p tabindex="0" className="focus:outline-none text-sm font-medium leading-normal text-right text-red-700">$21,847</p>
                    </div>
                    <div className="flex items-start justify-between mt-6 w-full">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <img src="https://cdn.tuk.dev/assets/components/misc/profile-img-2.png" alt="woman avatar" tabindex="0" className="focus:outline-none " />
                            </div>
                            <div className="pl-3">
                                <p tabindex="0" className="focus:outline-none text-sm font-medium leading-normal text-gray-800">Maia Kelly</p>
                                <p tabindex="0" className="focus:outline-none text-xs leading-3 pt-2 text-gray-600">2 bills</p>
                            </div>
                        </div>
                        <p tabindex="0" className="focus:outline-none text-sm font-medium leading-normal text-right text-red-700">$2,847</p>
                    </div>
                    <div className="flex items-start justify-between mt-6 w-full">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <img src="https://cdn.tuk.dev/assets/components/misc/LW.png" alt="profile" tabindex="0" className="focus:outline-none " />
                            </div>
                            <div className="pl-3">
                                <p tabindex="0" className="focus:outline-none text-sm font-medium leading-normal text-gray-800">Laurine Watson</p>
                                <p tabindex="0" className="focus:outline-none text-xs leading-3 pt-2 text-gray-600">2 bills</p>
                            </div>
                        </div>
                        <p tabindex="0" className="focus:outline-none text-sm font-medium leading-normal text-right text-red-700">$2,847</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
