'use client'
import { IAuthor } from '@/types/index'
import Image from 'next/image'
import Link from 'next/link'

function AuthorCard(author: IAuthor) {
	return (
		<Link
			className='flex flex-col space-y-2 w-52 text-center'
			href={`/author/${author.id}`}
		>
			<div className='w-full h-52 relative'>
				<Image
					src={author?.image?.url ?? '/01.jpg'}
					alt={author.name}
					fill
					className='object-cover p-2 rounded-md grayscale hover:grayscale-0 transition-all'
				/>
			</div>
			<h2 className='text-2xl font-creteRound'>{author.name}</h2>

			<p className='text-muted-foreground'>
				<span className='font-bold text-white'> {author.blogs.length} </span>
				Post Published
			</p>
		</Link>
	)
}

export default AuthorCard
