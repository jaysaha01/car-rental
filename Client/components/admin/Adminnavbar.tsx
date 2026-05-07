import { Button } from "@/components/ui/button"
import Link from 'next/link'

const Adminnavbar = ({ title }: { title: string }) => {
    return (
        <div className="navbar bg-base-100 shadow-sm bg-white ">
            <div className="flex-1">
                <h1 className='font-semibold text-2xl'>{title}</h1>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <Link href="/">
                    <Button variant="outline" size="lg">
                        View Site
                    </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Adminnavbar
