import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import ReactToPrint from "react-to-print";

const InvoiceComponent = React.forwardRef((props, ref) => {
  console.log('ref:', ref)
  const location = useLocation()
  const data = location.state
  console.log(data.record)

  // const todays = () => {
  //   return moment(Date().toLocaleString()).format('DD MMMM YYYY')
  // }

  const generateId = () => {
    let token = '';
    let codeLenght = parseInt(5);
    const chars = '0123456789';
    for (var i = 0; i < codeLenght; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  return (
    <div ref={ref} className='flex justify-center my-4'>
      <div className='py-4 px-4 bg-white w-[80%] min-h-[50vh] block'>
        <div className=' w-full flex justify-between mx-auto text-center'>
          <div className=' text-left'>
            <span className='text-[2rem] font-bold'>OSEI TUTU II ESTATE</span>
            <span className='block text-[1rem] font-medium'>EXPENSES</span>
          </div>
          <div className='font-semibold text-base text-right'>
            <span className=''>(032) 249 8822</span>
            <span className='block'>(233) 546 924 284</span>
            <span className='block'>oseitutuiiestate@gmail.com</span>
            <span className=' leading-[20px] block'>AAK-318-4262</span>
          </div>
        </div>
        <div className='flex justify-between my-8'>
          <div className=''>
            <h1 className='text-base'>Purchase Invoice</h1>
            <div className=' text-sm capitalize'>Date: {moment(data.record.createdAt).format('DD MMMM YYYY')}</div>
          </div>
          <div>
            <h1 className='text-base'>Invoice #{generateId()}</h1>
          </div>
        </div>
        <div className='my-4'>
          <table className='w-full'>
            <thead className='border bg-gray-800 text-white h-10 text-[0.85rem] py-2'>
              <tr className='h-full w-full '>
                <th className='border-2 border-gray-500'>
                  PRODUCT/ITEM
                </th>
                <th className='border-2 border-gray-500'>
                  QUANTTY
                </th>
                <th className='border-2 border-gray-500'>
                  PRICE
                </th>
                <th className='border-2 border-gray-500'>
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-center'>
                <td className='border-2 border-gray-500'>{data.record.item}</td>
                <td className='border-2 border-gray-500'>{data.record.quantity}</td>
                <td className='border-2 border-gray-500'>&#8373;{data.record.unitPrice}.00</td>
                <td className='border-2 border-gray-500'>&#8373;{data.record.totalAmount}.00</td>
              </tr>
              <tr className='text-center h-10 text-base'>
                <td className='border-2 border-gray-500'></td>
                <td className='border-2 border-gray-500'></td>
                <td className=' font-bold border-2 border-gray-500'>Total</td>
                <td className='border-2 border-gray-500 font-semibold'>&#8373;{data.record.totalAmount}.00</td>
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

export default function ExpenseInvoice() {
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
