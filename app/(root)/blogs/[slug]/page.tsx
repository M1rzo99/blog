import Comments from '@/components/shared/comments'
import PostStats from '@/components/shared/post-stats'
import { Badge } from '@/components/ui/badge'
import { getReadingTime } from '@/lib/utils'
import { getBlogDetails } from '@/services/blog.service'
import { format } from 'date-fns'
import { ArrowUpRight, CalendarDays, Clock, Layers2, Tags } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ShareBtns from '../../_components/share-btns'
import { TranslatableBlog } from './_components/translatable-blog'

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}) {
	const blog = await getBlogDetails(params.slug)
	return {
		title: blog.title,
		description: blog.description,
		openGraph: { image: blog.image?.url },
	}
}

async function SlugPage({ params }: { params: { slug: string } }) {
	const blog = await getBlogDetails(params.slug)

	return (
		<div className='pt-[12vh] max-w-4xl mx-auto px-4 pb-24'>

			{/* Category & Tag Badges */}
			<div className='flex items-center gap-2 mb-6'>
				{blog.category?.slug && (
					<Link href={`/categories/${blog.category.slug}`}>
						<Badge variant='default' className='gap-1.5 text-sm px-3 py-1 cursor-pointer'>
							<Layers2 className='w-3.5 h-3.5' />
							{blog.category.name}
						</Badge>
					</Link>
				)}
				{blog.tag?.slug && (
					<Link href={`/tags/${blog.tag.slug}`}>
						<Badge variant='outline' className='gap-1.5 text-sm px-3 py-1 cursor-pointer'>
							<Tags className='w-3.5 h-3.5' />
							{blog.tag.name}
						</Badge>
					</Link>
				)}
			</div>

			{/* Author & Meta Row */}
			<div className='flex flex-wrap items-center gap-6 mb-10 pb-8 border-b border-border/60'>
				{blog.author?.id && (
					<Link href={`/author/${blog.author.id}`} className='flex items-center gap-3 group'>
						<Image
							src={blog.author.image?.url ?? '/01.jpg'}
							alt={blog.author.name}
							width={46}
							height={46}
							className='object-cover rounded-full ring-2 ring-primary/20 group-hover:ring-primary transition-all duration-300'
						/>
						<div>
							<p className='text-sm font-semibold group-hover:text-primary transition-colors duration-200'>
								{blog.author.name}
							</p>
							<p className='text-xs text-muted-foreground'>Muallif</p>
						</div>
					</Link>
				)}
				<div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
					<CalendarDays className='w-4 h-4' />
					<span>{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</span>
				</div>
				<div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
					<Clock className='w-4 h-4' />
					<span>{getReadingTime(blog.content.html)} daqiqa o&apos;qish</span>
				</div>
			</div>

			{/* Hero Image */}
			<div className='relative rounded-xl overflow-hidden mb-14 shadow-lg'>
				<Image
					src={blog.image?.url ?? '/01.jpg'}
					alt='blog rasmi'
					width={1200}
					height={630}
					className='w-full h-[420px] md:h-[520px] object-cover'
					priority
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent' />
			</div>

			{/* Content + Share Buttons */}
			<div className='flex md:gap-14 max-md:flex-col-reverse relative'>
				<div>
					<div className='sticky top-36'>
						<p className='text-xs uppercase tracking-widest text-muted-foreground mb-3'>
							Ulashing
						</p>
						<ShareBtns />
					</div>
				</div>
				<TranslatableBlog
					title={blog.title}
					contentHtml={blog.content.html}
					slug={params.slug}
				/>
			</div>

			{/* Post Stats: likes · views · comments */}
			<PostStats slug={params.slug} />

			{/* Author Bio Card */}
			{blog.author && (
				<div className='rounded-xl border border-border/60 bg-secondary/30 p-6 md:p-8 flex flex-col sm:flex-row gap-5 items-start'>
					<Image
						src={blog.author.image?.url ?? '/01.jpg'}
						alt={blog.author.name}
						width={80}
						height={80}
						className='rounded-full object-cover flex-shrink-0 ring-2 ring-primary/30'
					/>
					<div className='flex-1'>
						<p className='text-xs uppercase tracking-widest text-muted-foreground mb-1'>
							Muallif haqida
						</p>
						{blog.author.id ? (
							<Link
								href={`/author/${blog.author.id}`}
								className='font-luckiest text-2xl hover:text-primary transition-colors duration-200'
							>
								{blog.author.name}
							</Link>
						) : (
							<span className='font-luckiest text-2xl'>
								{blog.author.name}
							</span>
						)}
						{blog.author.bio && (
							<p className='text-muted-foreground mt-2 leading-relaxed text-sm'>
								{blog.author.bio}
							</p>
						)}
						{blog.author.id && (
							<Link
								href={`/author/${blog.author.id}`}
								className='inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-primary hover:underline underline-offset-4'
							>
								Barcha maqolalarni ko&apos;rish
								<ArrowUpRight className='w-4 h-4' />
							</Link>
						)}
					</div>
				</div>
			)}

			{/* Comments Section */}
			<Comments slug={params.slug} authorName={blog.author?.name ?? ''} />
		</div>
	)
}

export default SlugPage
