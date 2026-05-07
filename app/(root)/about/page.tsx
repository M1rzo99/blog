import AuthorCard from '@/components/cards/author'
import { getAuthors } from '@/services/author.service'
import { Dot, Home } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'About us',
}

async function AboutPage() {
	const authors = await getAuthors()
	return (
		<div className='max-w-6xl mx-auto'>
			<div className='relative min-h-[40vh] flex items-center justify-center flex-col'>
				<h2 className='text-center text-4xl section-title font-creteRound'>
					<span>About</span>
				</h2>

				<div className='flex gap-1 items-center mt-4'>
					<Home className='w-4 h-4' />
					<Link
						href={'/'}
						className='opacity-90 hover:underline hover:opacity-100'
					>
						Home
					</Link>
					<Dot />
					<p className='text-muted-foreground'>About</p>
				</div>
			</div>
			<h1 className='text-center text-4xl font-creteRound'>
				Hi, I am Mirzo Shomuratov,content creator and writer.
			</h1>

			<div className='grid grid-cols-4 gap-4 min-h-96 mt-6'>
				<div className='h-80 self-center relative max-md:col-span-2 max-md:h-72'>
					<Image
						src={'/about/0424.JPG'}
						alt='about'
						fill
						className='rounded-md object-cover'
					/>
				</div>
				<div className='col-span-2 max-md:col-span-4 relative h-80'>
					<Image
						src={'/about/0007.JPG'}
						alt='about'
						fill
						className='rounded-md object-cover'
					/>
				</div>
				<div className='relative self-center h-80 max-md:col-span-2 max-md:mb-8 max-md:h-72'>
					<Image
						src={'/about/0971.JPG'}
						alt='about'
						fill
						className='rounded-md object-cover'
					/>
				</div>
			</div>

			<div className='max-w-6xl mx-auto mt-12 flex flex-col text-center space-y-4 text-muted-foreground'>
				<p>
					Hi👋. I am Mirzobek Shomuratov I am graduated a bachelor degreed in
					South Korea,CS. I have decided to start a blog to share my
					experiences, challenges, opportunities, and the knowledge I have
					gained along the way. If what I share can be helpful to someone, I
					will be truly happy.
				</p>
			</div>

			<h2 className='text-center text-4xl section-title font-creteRound my-12'>
				<span>Our writers</span>
			</h2>

			<div className='flex justify-around max-md:flex-col max-md:space-y-4 max-md:items-center'>
				{authors.map(c => (
					<AuthorCard key={c.name} {...c} />
				))}
			</div>
		</div>
	)
}

export default AboutPage
