import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import ReactToPrint from "react-to-print";
import logo from "../../assets/image/logo.jpg"

const InvoiceComponent = React.forwardRef((props, ref) => {
    const location = useLocation()
    const data = location.state
    // console.log(data.record)
    // console.log(data.record.monthDue.length)

    const generateId = () => {
        let token = '';
        let codeLenght = parseInt(5);
        const chars = '0123456789';
        for (var i = 0; i < codeLenght; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    }

    function getMonthDifference(startDate, endDate) {
        return (
            new Date(endDate).getMonth() -
            new Date(startDate).getMonth() +
            12 * (new Date(endDate).getFullYear() - new Date(startDate).getFullYear())
        );
    }
    
    return (
        <div ref={ref} className='flex justify-center my-4'>
            <div className='py-4 px-4 bg-white w-[90%] min-h-[50vh] block'>
                <div className=' w-full flex justify-between mx-auto text-center'>
                    <div className=' text-left'>
                        <span className='text-[1.8rem] font-bold'>OSEI TUTU II ESTATE</span>
                        <span className='block text-[1rem] font-medium'>FACILITY MANAGEMENT FEE</span>
                    </div>
                    <div className='font-semibold text-[0.9rem] text-right'>
                        <span className=''>(032) 249 8822</span>
                        <span className='block'>(233) 546 924 284</span>
                        <span className='block'>oseitutuiiestate@gmail.com</span>
                        <span className=' leading-[20px] block'>AAK-318-4262</span>
                    </div>
                </div>
                <div className='flex justify-between my-8'>
                    <div>
                        <h3 className='text-base'>Parment Details</h3>
                        <table>
                            <thead className='bg-gray-800 border text-white'>
                                <tr className='text-sm border px-2 font-[400]'>
                                    <th className='text-xs border border-gray-500 px-2 font-[400]'>APPT. NO.</th>
                                    <th className='text-xs border border-gray-500 px-2 font-[400]'>CLIENT</th>
                                    <th className='text-xs border border-gray-500 px-2 font-[400]'>PAYMENT METHOD</th>
                                    <th className='text-xs border border-gray-500 px-2 font-[400]'>ACCOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-center text-sm'>
                                    <td className='text-xs border border-gray-500 px-2'>{data.record.appartment}</td>
                                    <td className='text-xs border border-gray-500 px-2'>{data.record.paidBy}</td>
                                    <td className='text-xs border border-gray-500 px-2'>{data.record.paymentMode}</td>
                                    <td className='text-xs border border-gray-500 px-2'>{data.record.accountNumber}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3 className='text-base'>Invoice #{generateId()}</h3>
                        <h3 className='text-sm -mt-2'>Date: {moment(data.record.createdAt).format('DD MMMM YYYY')}</h3>
                    </div>
                </div>

                <div className='my-4'>
                    <table className='w-full'>
                        <thead className='border h-10 bg-gray-800 text-white text-[0.85rem] py-2'>
                            <tr className='h-full w-full'>
                                <th className='border-2 border-gray-500'>
                                    MONTHS
                                </th>
                                <th className='border-2 border-gray-500'>
                                    DESCRIPTION
                                </th>
                                <th className='border-2 border-gray-500'>
                                    PRICE &#8373;
                                </th>
                                <th className='border-2 border-gray-500'>
                                    TOTAL &#8373;
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='text-center border-2 border-gray-500 px-4'>{getMonthDifference(data.record.monthDue[0], data.record.monthDue[1])}</td>
                                <td className='text-center border-2 border-gray-500 px-4'>{data.record.monthDue.length === 0 ? moment(data.record.monthDue[0]).format('MMMM YYYY') : (
                                    <>
                                        {data.record.monthDue[0] === data.record.monthDue[1] ? moment(data.record.monthDue[0]).format('MMMM YYYY') : (
                                            <>
                                                {moment(data.record.monthDue[0]).format('MMMM YYYY')} to {moment(data.record.monthDue[1]).format('MMMM YYYY')}
                                            </>
                                        )}
                                    </>
                                )}</td>
                                <td className='text-center border-2 border-gray-500 px-4'>200.00</td>
                                <td className='text-center border-2 border-gray-500 px-4'>{data.record.amount}.00</td>
                            </tr>
                            <tr className='text-center h-10 text-base'>
                                <td className='text-center border-2 border-gray-500'></td>
                                <td className='text-center border-2 border-gray-500'></td>
                                <td className='text-center border-2 border-gray-500 font-semibold'>Total</td>
                                <td className='text-center border-2 border-gray-500 font-semibold'>&#8373;{data.record.amount}.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-end mt-20'>
                    <div className='mr-8'>
                        <h1 className='font-bold'>--------------------------</h1>
                        <h1>SIGNATURE & STAMP</h1>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default function FeeInvoice() {
    const componentRef = useRef();

    return (
        <div className='mt-8 text-black'>
            <div className=''>
                <ReactToPrint className="mr-8"
                    trigger={() => (
                        <button className="bg-slate-500 text-white active:bg-slate-600 flex font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            <div>Print</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-printer font-semibold ml-2" viewBox="0 0 16 16">
                                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                            </svg>
                        </button>)}
                    content={() => componentRef.current}
                />
            </div>
            <InvoiceComponent ref={componentRef} />
        </div>
    )
}