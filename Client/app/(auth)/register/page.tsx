
import Createuserform from '@/components/auth/Createuserform'

const page = () => {
  return (
    <div className='flex align-middle p-5 md:p-0 lg:p-0'>
      <div className='w-3/6 bg-gray-500 relative hidden md:block lg:block'>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('authimg.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 w-full"></div>
      </div>
      <Createuserform />
    </div>
  )
}

export default page
