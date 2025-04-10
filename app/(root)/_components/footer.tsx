"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User2 } from 'lucide-react'
import React, { useState } from 'react'

const Footer = () => {
  const [active,setActive]  = useState(false)
  return (
  <footer className='flex-center py-24 flex-col container max-w-2xl space-y-12'>
    <h1 className='text-5xl max-md:text-3xl text-center font-creteRound'>
      Get Latest Posts Delivered Right To Your Inbox
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-3 w-full gap-2 md:gap-4'>
  <Input
    onFocus={() => setActive(true)}
    onBlur={() => setActive(false)}
    placeholder='Your email address'
    className='w-full md:col-span-2'
  />

  <Button
    size={'lg'}
    className='w-full md:w-auto'
    variant={active ? 'default' : 'outline'}
  >
    <User2 className='me-2 w-4 h-4' />
    <span>Join Today</span>
  </Button>
</div>

  </footer>
  )
}

export default Footer