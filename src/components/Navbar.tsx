import Logo from '@/assets/logo.png';
import Image from "next/image";
import Link from "next/link";
import { Button } from './ui/button';


export const Navbar = () => {
    return (
        <header className="shadow-sm">
            <nav className="max-w-5xl m-auto px-3 py-5 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Image src={Logo} alt="Logo Comapgny Name" width={40} height={40} priority />
                    <span className='text-xl font-bold tracking-tight'>Flow Jobs</span>
                </Link>
                <Button asChild>
                    <Link href="/jobs/new">Post a job</Link>
                </Button>
            </nav>
        </header>
    )
}