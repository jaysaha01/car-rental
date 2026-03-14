import Vehiclebookingform from '@/components/renter/Vehiclebookingform'

const page = () => {
  return (
    <div className='w-5/5 md:w-4/5 lg:w-4/5 m-auto p-3 md:p-0 lg:p-0'>
      <h1 className='font-bold text-2xl'>Add Vehicle</h1>
      <Vehiclebookingform/>
    </div>
  )
}

export default page
