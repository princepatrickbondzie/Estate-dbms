import React from 'react';
import { useUserState } from '../../container/state/store'

const Greetings = () => {
    const user = useUserState((state) => state.user)
    // console.log(user)
    return (
        <div className='my-8'>
            <h1 className=' leading-3 font-bold capitalize'>👋 Hey {user.fullname},</h1>
            <p className=' text-sm text-gray-500 font-medium ml-5'>Here are all your dashboard analytics overview.</p>
        </div>
    );
}

export default Greetings;
