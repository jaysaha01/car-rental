import Profile from '@/components/renter/Profile'

const page = () => {
  return (
    <div className='p-6'>
      <div className='mb-5'>
        <h2 className='text-3xl font-bold mb-1'>Profile & Settings</h2>
        <p className='text-gray-500'>Manage your account settings and preferences</p>
      </div>
      <div>
        <Profile/>
      </div>
    </div>
  )
}

export default page
