import React, { useState, useEffect } from 'react';
import { useUserState } from '../../container/state/store';
import moment from 'moment';

let high = "text-green-700 text-xs tracking-wide font-bold leading-normal pl-1"
let low = ""

export default function CardStat() {
    const [loading, setLoading] = useState("stack")

    const [totalExpenses, setTotalExpenses] = useState(null)
    const [totalExpenseAmount, setTotalExpenseAmount] = useState(null)
    const [expPercent, setExpPercent] = useState(null);
    const expenses = useUserState((state) => state.expenses)

    const [transactions, setTransactions] = useState(null)
    const [total, setTotal] = useState(null)
    const [payPercent, setPayPercent] = useState(null);
    const payments = useUserState((state) => state.payments)

    const calcPayments = () => {
        let today = new Date()

        if (payments !== null) {
            const sum = payments.reduce((accumulator, object) => {
                return accumulator + object.amount;
            }, 0);
            const num = payments.length;
            setTransactions(num)
            setTotal(sum)

            //payments past
            let pastPay = payments.filter((value) => moment(new Date(value.createdAt)).format("DD MMMM YYYY") !== moment(today).format("DD MMMM YYYY"))
            let pastResult = pastPay.reduce((accumulator, object) => { return accumulator + object.totalAmount; }, 0);

            //payments today
            let todaysPay = payments.filter((value) => moment(new Date(value.createdAt)).format("DD MMMM YYYY") !== moment(today).format("DD MMMM YYYY"));
            let todaysResult = todaysPay.reduce((accumulator, object) => { return accumulator + object.totalAmount; }, 0);

            //do the math
            let percentage = todaysResult / pastResult * 100;
            setPayPercent(percentage.toFixed(1))
            // console.log(percentage.toFixed(1))
        } else {
            setTransactions(0)
            setTotal(0)
            setPayPercent(0)
        }
    }

    const calcExpenses = () => {
        let today = new Date()

        if (expenses !== null) {
            const sum = expenses.reduce((accumulator, object) => {
                return accumulator + object.totalAmount;
            }, 0);

            const num = expenses.length;
            setTotalExpenses(num)
            setTotalExpenseAmount(sum)

            //Expense Past
            let pastExp = expenses.filter((value) => moment(new Date(value.createdAt)).format("DD MMMM YYYY") !== moment(today).format("DD MMMM YYYY"))
            let pastResult = pastExp.reduce((accumulator, object) => { return accumulator + object.totalAmount; }, 0);

            //Payments Today
            let todaysExp = expenses.filter((value) => moment(new Date(value.createdAt)).format("DD MMMM YYYY") === moment(today).format("DD MMMM YYYY"));
            let todaysResult = todaysExp.reduce((accumulator, object) => { return accumulator + object.totalAmount; }, 0);

            //do the math
            let percentage = todaysResult / pastResult * 100;
            setExpPercent(percentage.toFixed(1))
            // console.log(percentage.toFixed(1))
        } else {
            setTotalExpenses(0)
            setTotalExpenseAmount(0)
            setExpPercent(0)
        }
    }

    useEffect(() => {
        setLoading("loading")
        calcPayments()
        calcExpenses();
        setLoading("done")
        // eslint-disable-next-line
    }, [expenses, payments])

    return (
        <div className="w-full py-10">
            <div className="container mx-auto px-6 flex items-start justify-center">
                <div className="w-full">
                    <dh-component>
                        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            <div className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-gray-100 bg-white">
                                <div className=" dark:bg-gray-800 rounded shadow p-6">
                                    <div className="flex items-center justify-between w-full sm:w-full mb-8">
                                        <div className="flex items-center">
                                            <div className="p-4 bg-blue-200 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-discount" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2B6CB0" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <line x1="9" y1="15" x2="15" y2="9" />
                                                    <circle cx="9.5" cy="9.5" r=".5" />
                                                    <circle cx="14.5" cy="14.5" r=".5" />
                                                    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55 v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55 v-1" />
                                                </svg>
                                            </div>
                                            <div className="ml-6">
                                                <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">{loading !== "done" ? "checking" : (<>{totalExpenseAmount !== null ? (<span>&#x20B5;{totalExpenseAmount}</span>) : ''}</>)}</h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">Expenses</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center pl-3 text-green-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="3 17 9 11 13 15 21 7" />
                                                    <polyline points="14 7 21 7 21 14" />
                                                </svg>
                                                <p className="text-green-700 text-xs tracking-wide font-bold leading-normal pl-1">{loading !== "done" ? "checking" : (
                                                    <p>{expPercent}%</p>
                                                )}</p>
                                            </div>
                                            <p className="font-normal text-xs text-right leading-4 text-green-700 tracking-normal">Today</p>
                                        </div>
                                    </div>
                                    <div className="relative mb-3">
                                        <hr className="h-1 rounded-sm bg-gray-200" />
                                        <hr className="absolute top-0 h-1 w-7/12 rounded-sm bg-indigo-700 border-indigo-700 left-0" />
                                    </div>
                                    <h4 className="text-base text-gray-600 dark:text-gray-400 font-normal tracking-normal leading-5">Yearly Goal</h4>
                                </div>
                            </div>
                            <div className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-gray-100 bg-white">
                                <div className=" dark:bg-gray-800 rounded shadow p-6">
                                    <div className="flex items-center justify-between w-full sm:w-full mb-8">
                                        <div className="flex items-center">
                                            <div className="p-4 bg-yellow-200 rounded-lg text-green-800">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-click" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#C05621" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <line x1="3" y1="12" x2="6" y2="12" />
                                                    <line x1="12" y1="3" x2="12" y2="6" />
                                                    <line x1="7.8" y1="7.8" x2="5.6" y2="5.6" />
                                                    <line x1="16.2" y1="7.8" x2="18.4" y2="5.6" />
                                                    <line x1="7.8" y1="16.2" x2="5.6" y2="18.4" />
                                                    <path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
                                                </svg>
                                            </div>
                                            <div className="ml-6">
                                                <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">{loading !== "done" ? "checking" : (<>{total !== null ? (<span>&#x20B5;{total}</span>) : ''}</>)}</h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">Recieved</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center text-red-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="3 7 9 13 13 9 21 17" />
                                                    <polyline points="21 10 21 17 14 17" />
                                                </svg>
                                                <p className="text-red-700 text-xs tracking-wide font-bold leading-normal pl-1">{loading !== "done" ? "checking" : (
                                                    <p>{payPercent}%</p>
                                                )}</p>
                                            </div>
                                            <p className="font-normal text-right text-xs leading-4 text-red-700 tracking-normal pb-1">Decrease</p>
                                        </div>
                                    </div>
                                    <div className="relative mb-3">
                                        <hr className="h-1 rounded-sm bg-gray-200" />
                                        <hr className="absolute top-0 h-1 w-7/12 rounded-sm bg-indigo-700 border-indigo-700 left-0" />
                                    </div>

                                    <h4 className="text-base text-gray-600 dark:text-gray-400 font-normal tracking-normal leading-5">Yearly Goal</h4>
                                </div>
                            </div>
                            <div className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-gray-100 bg-white"><div className=" dark:bg-gray-800 rounded shadow p-6">
                                <div className="flex items-center justify-between w-full sm:w-full mb-8">
                                    <div className="flex items-center">
                                        <div className="p-4 bg-green-200 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-credit-card" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#276749" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <rect x="3" y="5" width="18" height="14" rx="3" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                                <line x1="7" y1="15" x2="7.01" y2="15" />
                                                <line x1="11" y1="15" x2="13" y2="15" />
                                            </svg>
                                        </div>
                                        <div className="ml-6">
                                            <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">2,330</h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">Profit Earned</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center pl-3 text-green-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <polyline points="3 17 9 11 13 15 21 7" />
                                                <polyline points="14 7 21 7 21 14" />
                                            </svg>
                                            <p className="text-green-700 text-xs tracking-wide font-bold leading-normal pl-1">12%</p>
                                        </div>
                                        <p className="font-normal text-xs text-right leading-4 text-green-700 tracking-normal pb-1">Increase</p>
                                    </div>
                                </div>
                                <div className="relative mb-3">
                                    <hr className="h-1 rounded-sm bg-gray-200" />
                                    <hr className="absolute top-0 h-1 w-7/12 rounded-sm bg-indigo-700 border-indigo-700 left-0" />
                                </div>
                                <h4 className="text-base text-gray-600 dark:text-gray-400 font-normal tracking-normal leading-5">Yearly Goal</h4>
                            </div>
                            </div>
                        </div>
                    </dh-component>
                </div>
            </div>
        </div>
    )
}
