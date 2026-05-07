
import Loginuserform from '@/components/auth/Loginuserform'
const page = () => {
  return (
    <div className='flex align-middle p-5 md:p-0 lg:p-0'>
      <Loginuserform />
      <div className='w-3/6 bg-gray-500 h-screen relative hidden md:block lg:block'>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('loginimg.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 w-full"></div>
      </div>
    </div>
  )
}

export default page
