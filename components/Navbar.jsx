'use client'
import React from 'react'
import LInk from 'next/link'
import { signOut } from 'next-auth/react'
import { LogOut} from 'lucide-react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()
    const navigation = [
        {
            name: "Home",
            href: '/dashboard'
        },
        {
            name: "About",
            href: '/about'
        },
        {
            name: "Contact",
            href: '/contact'
        },
        {
            name : "Bills",
            href : '/bills'
        }
    ]
    return (
        <nav className='flex justify-between items-center h-20  px-8'>
            <div>
                Logo
            </div>
            <div className='flex justify-center items-center gap-10' >
                <ul className='flex justify-center items-center gap-10 '>
                    {navigation.map((item) => (
                        <li key={item.name} className=''>
                            <LInk href={item.href} className={pathname === item.href ? 'text-sm font-semibold text-red-400' : 'text-sm font-semibold'}>{item.name}</LInk>
                        </li>
                    ))}
                </ul>
                <button   onClick={() => signOut({ callbackUrl: '/' })}
                 className='flex text-sm items-center justify-center gap-2 bg-red-400 px-4 py-2 rounded-md' >
                    LogOut <LogOut  className='text-sm px-1'/>
                </button>
            </div>
        </nav>
    )
}

export default Navbar