
import { Button } from "@/components/ui/button"
import { IconChevronRight  } from "@tabler/icons-react"
import Link from 'next/link'


const Sideheading = () => {
  return (
    <div className='flex justify-between ms-5 me-5 mb-10 flex-col md:flex-row lg:flex-row'>
      <div>
        <h2 className='font-bold text-3xl'>Featured Vehicles</h2>
        <p className='text-gray-400'>Hand-picked selection of our best vehicles</p>
      </div>
      <div className='mt-5 md:mt-0 ld:mt-0'>
        <Link href="/search">
        <Button variant="outline" size="lg">
           View All <IconChevronRight />
        </Button>
        </Link>
      </div>
    </div>
  )
}

export default Sideheading
