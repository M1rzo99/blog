import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { popularCategories, popularTags } from '@/constants'
import {  Search } from 'lucide-react'
import React from 'react'
import { Badge } from "@/components/ui/badge"

function GlobalSearch() {
  return (
    <Drawer>
  <DrawerTrigger>
            <div className='hover:bg-blue-400/20 cursor-pointer rounded-sm transition-colors flex items-center gap-1 px-3 py-2'>
           <span className='hidden md:flex'> Search</span>
           <Search className='w-4 h-4'/>
            </div>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <div className='container max-w-6xl mx-auto py-12'>
        <Input
        placeholder='Type to search blog...'
        className='bg-secondary'
        />

        <div className='flex flex-col space-y-2 mt-4'>
            <p className='font-creteRound text-2xl'> See posts by Categories</p>
            <div className='flex flex-wrap gap-2'>
                {popularCategories.map(item=>(
                    <Badge key={item.slug} >
                        {item.name}
                    </Badge>
                ))}
            </div>
        </div>


        <div className='flex flex-col space-y-2 mt-4'>
            <p className='font-creteRound text-2xl'> See posts by Tags</p>
            <div className='flex flex-wrap gap-2'>
                {popularTags.map(item=>(
                    <Badge key={item.slug} >
                        {item.name}
                    </Badge>
                ))}
            </div>
        </div>
      </div>
    </DrawerHeader>
  </DrawerContent>
</Drawer>

  )
}

export default  GlobalSearch