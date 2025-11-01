import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

export default function ActiveLinks({path,children}) {
    const pathname = usePathname()
     const active = pathname === path;

  return (
    
         <Link className={active ? 'text-red-500 font-bold' : ''} href={path}>{children}</Link>
  
  )
}
