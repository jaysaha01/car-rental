import React from 'react'

type AdminCardProps = {
  data: string;
  icon: React.ReactNode;
  title: string;
};

const Admincard = ({data, icon, title}: AdminCardProps) => {

  return (
    <div className='bg-white border border-b-gray-200 p-4 rounded-2xl w-full shadow-lg'>
     <div className='flex justify-between items-center'>
        <div className='dtls mb-6'>
            <span className='text-lg font-bold'>{title}</span>
            <h6 className='text-gray-400'>{data}</h6>
        </div>
        <div className='bg-green-200 p-2 rounded-md border border-green-300'>{icon}</div>
     </div>
     <p className='text-green-500'>+8.9% from last month</p>
    </div>
  )
}

export default Admincard
