'use client'
import { cn, getReadingTime } from '@/lib/utils'
import { IBlog } from '@/types/'
import { format } from 'date-fns'
import { CalendarDays, Clock, Layers2, Tags } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '../ui/badge'

interface Props extends IBlog {
	isVertical?: boolean
}

function BlogCard(blog: Props) {
	return (
		<div
			className={cn(
				'grid gap-6 group',
				blog.isVertical ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
			)}
		>
			{/* Image */}
			<Link href={`/blogs/${blog.slug}`} className='block overflow-hidden'>
				<div className='relative bg-secondary rounded-md overflow-hidden'>
					<Image
						src={blog.image.url}
						alt='blog rasmi'
						width={900}
						height={500}
						style={{ height: '300px', width: '100%', objectFit: 'cover' }}
						className='rounded-md group-hover:-translate-y-7 -translate-y-6 transition-all duration-500 object-cover grayscale group-hover:grayscale-0 max-md:-translate-y-2 max-md:group-hover:-translate-y-3'
					/>
				</div>
			</Link>

			{/* Content */}
			<div className='flex flex-col justify-between gap-4'>
				<Link href={`/blogs/${blog.slug}`}>
					<div className='flex flex-col space-y-3'>
						{/* Meta */}
						<div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
							<div className='flex items-center gap-1.5'>
								<CalendarDays className='w-4 h-4' />
								<span>{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</span>
							</div>
							<span className='text-border'>·</span>
							<div className='flex items-center gap-1.5'>
								<Clock className='w-4 h-4' />
								<span>{getReadingTime(blog.content.html)} daqiqa</span>
							</div>
						</div>

						{/* Title */}
						<h2 className='text-4xl max-md:text-3xl font-luckiest leading-snug group-hover:text-blue-500 transition-colors duration-200'>
							{blog.title}
						</h2>

						{/* Description */}
						<p className='text-muted-foreground line-clamp-3 leading-relaxed'>
							{blog.description}
						</p>
					</div>
				</Link>

				{/* Author + Badges */}
				<div className='flex flex-wrap items-center gap-3'>
					{blog.author && (
						<div className='flex items-center gap-2'>
							<Image
								src={blog.author.image?.url ?? '/01.jpg'}
								alt={blog.author.name}
								width={32}
								height={32}
								className='object-cover rounded-full ring-1 ring-border'
							/>
							<span className='text-sm font-medium'>{blog.author.name}</span>
						</div>
					)}

					<div className='flex items-center gap-2 ml-auto'>
						{blog.tag?.slug && (
							<Link href={`/tags/${blog.tag.slug}`}>
								<Badge
									variant='secondary'
									role='button'
									className='gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer'
								>
									<Tags className='w-3 h-3' />
									{blog.tag.name}
								</Badge>
							</Link>
						)}
						{blog.category?.slug && (
							<Link href={`/categories/${blog.category.slug}`}>
								<Badge
									variant='outline'
									role='button'
									className='gap-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 cursor-pointer'
								>
									<Layers2 className='w-3 h-3' />
									{blog.category.name}
								</Badge>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlogCard
