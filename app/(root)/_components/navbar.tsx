import ModeToggle from '@/components/shared/mode-toggle'
import { navLinks } from '@/constants'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[10vh] backdrop-blur-sm border-b fixed z-40 inset-0 bg-background'>
      <div className='container w-full max-w-6xl mx-auto h-[10vh] justify-between flex items-center'>
    {/* logo */}
        <Link href={'/'}>
        <h1 className='text-4xl font-creteRound'>q13</h1>
        </Link>
        {/* Nav Links */}
        <div className='gap-2 hidden md:flex'>
            {navLinks.map(nav=>(
                <Link
                key={nav.route}
                href={nav.route}
                className='hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors'
                >
                    {nav.name}
                </Link>
            ))}
        </div>
        {/* Search */}
        <div className='flex items-center gap-1'>
            <div className='hover:bg-blue-400/20 cursor-pointer rounded-sm transition-colors flex items-center gap-1 px-3 py-2'>
           <span className='hidden md:flex'> Search</span>
           <Search className='w-4 h-4'/>
            </div>
           <ModeToggle/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
