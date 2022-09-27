import React from 'react'
import SendSMS from '../../components/cards/SendSMS'

export default function Messages() {
  return (
    <div className='py-8 px-2'>
      <div className='grid grid-cols-2 gap-8'>
        <SendSMS />
      </div>
    </div>
  )
}
