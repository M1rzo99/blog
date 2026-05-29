'use client'
import { Eye, Heart, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface IStats {
	likes: number
	liked: boolean
	views: number
}

function PostStats({ slug }: { slug: string }) {
	const [stats, setStats] = useState<IStats>({
		likes: 0,
		liked: false,
		views: 0,
	})
	const [commentCount, setCommentCount] = useState(0)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)

		const statsKey = `post_stats_${slug}`
		const stored = localStorage.getItem(statsKey)
		const base: IStats = stored
			? JSON.parse(stored)
			: { likes: 0, liked: false, views: 0 }
		const updated = { ...base, views: base.views + 1 }
		setStats(updated)
		localStorage.setItem(statsKey, JSON.stringify(updated))

		const cs = localStorage.getItem(`comments_v2_${slug}`)
		if (cs) setCommentCount(JSON.parse(cs).length)

		const onUpdate = () => {
			const fresh = localStorage.getItem(`comments_v2_${slug}`)
			if (fresh) setCommentCount(JSON.parse(fresh).length)
		}
		window.addEventListener(`comment_update_${slug}`, onUpdate)
		return () => window.removeEventListener(`comment_update_${slug}`, onUpdate)
	}, [slug])

	const toggleLike = () => {
		const updated: IStats = {
			...stats,
			liked: !stats.liked,
			likes: stats.liked ? stats.likes - 1 : stats.likes + 1,
		}
		setStats(updated)
		localStorage.setItem(`post_stats_${slug}`, JSON.stringify(updated))
	}

	if (!mounted) return null

	return (
		<div className='flex items-center gap-8 py-5 border-y border-border/60 my-10'>
			<button
				onClick={toggleLike}
				className={`flex items-center gap-2 group transition-all duration-200 ${
					stats.liked
						? 'text-rose-500'
						: 'text-muted-foreground hover:text-rose-500'
				}`}
			>
				<Heart
					className={`w-5 h-5 transition-all duration-200 ${
						stats.liked ? 'fill-rose-500 scale-110' : 'group-hover:scale-110'
					}`}
				/>
				<span className='text-sm font-medium tabular-nums'>{stats.likes}</span>
			</button>

			<div className='flex items-center gap-2 text-muted-foreground'>
				<Eye className='w-4.5 h-4.5' />
				<span className='text-sm tabular-nums'>
					{stats.views.toLocaleString()}
				</span>
			</div>

			<div className='flex items-center gap-2 text-muted-foreground'>
				<MessageCircle className='w-4.5 h-4.5' />
				<span className='text-sm tabular-nums'>{commentCount}</span>
			</div>
		</div>
	)
}

export default PostStats
