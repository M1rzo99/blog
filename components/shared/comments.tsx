'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatDistanceToNow } from 'date-fns'
import {
	ChevronDown,
	ChevronUp,
	Heart,
	MessageCircle,
	RefreshCw,
	Send,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

/* ─────────────── Types ─────────────── */
interface IReply {
	id: string
	name: string
	message: string
	createdAt: string
	likes: number
	likedByMe: boolean
}

interface IComment extends IReply {
	replies: IReply[]
}

/* ─────────────── Avatar ─────────────── */
const GRADIENTS = [
	'from-violet-500 to-purple-700',
	'from-blue-500 to-indigo-700',
	'from-emerald-500 to-teal-700',
	'from-amber-400 to-orange-600',
	'from-rose-500 to-pink-700',
	'from-cyan-500 to-blue-700',
]

function avatarGradient(name: string) {
	const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
	return GRADIENTS[hash % GRADIENTS.length]
}

function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
	const sz = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
	return (
		<div
			className={`flex-shrink-0 ${sz} rounded-full bg-gradient-to-br ${avatarGradient(name)} flex items-center justify-center font-bold text-white shadow-sm select-none`}
		>
			{name.charAt(0).toUpperCase()}
		</div>
	)
}

/* ─────────────── Author Badge ─────────────── */
function AuthorBadge() {
	return (
		<span className='inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground leading-none'>
			Author
		</span>
	)
}

/* ─────────────── Reply Item ─────────────── */
function ReplyItem({
	reply,
	authorName,
	onLike,
}: {
	reply: IReply
	authorName: string
	onLike: () => void
}) {
	return (
		<div className='flex gap-3 py-3'>
			<Avatar name={reply.name} size='sm' />
			<div className='flex-1 min-w-0'>
				<div className='flex flex-wrap items-center gap-1.5 mb-1'>
					<span className='font-semibold text-sm'>{reply.name}</span>
					{reply.name === authorName && <AuthorBadge />}
					<span className='text-xs text-muted-foreground'>
						{formatDistanceToNow(new Date(reply.createdAt), {
							addSuffix: true,
						})}
					</span>
				</div>
				<p className='text-sm text-foreground/80 leading-relaxed'>
					{reply.message}
				</p>
				<button
					onClick={onLike}
					className={`flex items-center gap-1.5 mt-2 text-xs transition-all duration-150 ${
						reply.likedByMe
							? 'text-rose-500'
							: 'text-muted-foreground hover:text-rose-500'
					}`}
				>
					<Heart
						className={`w-3.5 h-3.5 transition-transform ${
							reply.likedByMe ? 'fill-rose-500 scale-110' : ''
						}`}
					/>
					<span className='tabular-nums'>{reply.likes}</span>
				</button>
			</div>
		</div>
	)
}

/* ─────────────── Comment Item ─────────────── */
function CommentItem({
	comment,
	authorName,
	onCommentLike,
	onReplyLike,
	onAddReply,
}: {
	comment: IComment
	authorName: string
	onCommentLike: () => void
	onReplyLike: (replyId: string) => void
	onAddReply: (name: string, message: string) => void
}) {
	const [replyOpen, setReplyOpen] = useState(false)
	const [showReplies, setShowReplies] = useState(true)
	const [replyName, setReplyName] = useState('')
	const [replyMsg, setReplyMsg] = useState('')
	const textRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (replyOpen) textRef.current?.focus()
	}, [replyOpen])

	const submitReply = () => {
		if (!replyName.trim() || !replyMsg.trim()) {
			toast.error('Ism va javob matnini kiriting')
			return
		}
		onAddReply(replyName.trim(), replyMsg.trim())
		setReplyName('')
		setReplyMsg('')
		setReplyOpen(false)
	}

	return (
		<div className='py-5 border-b border-border/50 last:border-0'>
			{/* Main comment */}
			<div className='flex gap-3'>
				<Avatar name={comment.name} />
				<div className='flex-1 min-w-0'>
					<div className='flex flex-wrap items-center gap-1.5 mb-1.5'>
						<span className='font-semibold text-sm'>{comment.name}</span>
						{comment.name === authorName && <AuthorBadge />}
						<span className='text-xs text-muted-foreground'>
							{formatDistanceToNow(new Date(comment.createdAt), {
								addSuffix: true,
							})}
						</span>
					</div>
					<p className='text-sm text-foreground/80 leading-relaxed mb-3'>
						{comment.message}
					</p>
					<div className='flex items-center gap-4'>
						<button
							onClick={onCommentLike}
							className={`flex items-center gap-1.5 text-xs transition-all duration-150 ${
								comment.likedByMe
									? 'text-rose-500'
									: 'text-muted-foreground hover:text-rose-500'
							}`}
						>
							<Heart
								className={`w-3.5 h-3.5 transition-transform ${
									comment.likedByMe ? 'fill-rose-500 scale-125' : ''
								}`}
							/>
							<span className='tabular-nums'>{comment.likes}</span>
						</button>
						<button
							onClick={() => setReplyOpen(v => !v)}
							className={`flex items-center gap-1.5 text-xs transition-colors ${
								replyOpen
									? 'text-primary'
									: 'text-muted-foreground hover:text-primary'
							}`}
						>
							<MessageCircle className='w-3.5 h-3.5' />
							<span>Reply</span>
						</button>
					</div>
				</div>
			</div>

			{/* Inline reply form */}
			{replyOpen && (
				<div className='ml-[52px] mt-4 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200'>
					<Input
						placeholder='Ismingiz'
						value={replyName}
						onChange={e => setReplyName(e.target.value)}
						className='h-8 text-sm bg-muted/40'
					/>
					<Textarea
						ref={textRef}
						placeholder='Javobingiz...'
						value={replyMsg}
						onChange={e => setReplyMsg(e.target.value)}
						rows={2}
						className='text-sm resize-none bg-muted/40'
					/>
					<div className='flex items-center justify-end gap-2'>
						<Button
							size='sm'
							variant='ghost'
							onClick={() => setReplyOpen(false)}
							className='h-7 text-xs px-3'
						>
							Bekor
						</Button>
						<Button
							size='sm'
							onClick={submitReply}
							className='h-7 text-xs px-3 gap-1'
						>
							<Send className='w-3 h-3' />
							Yuborish
						</Button>
					</div>
				</div>
			)}

			{/* Replies thread */}
			{comment.replies.length > 0 && (
				<div className='ml-[52px] mt-3'>
					<button
						onClick={() => setShowReplies(v => !v)}
						className='flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mb-2'
					>
						{showReplies ? (
							<ChevronUp className='w-3 h-3' />
						) : (
							<ChevronDown className='w-3 h-3' />
						)}
						{comment.replies.length} ta javob
					</button>
					{showReplies && (
						<div className='border-l-2 border-border/60 pl-4 divide-y divide-border/30'>
							{comment.replies.map(reply => (
								<ReplyItem
									key={reply.id}
									reply={reply}
									authorName={authorName}
									onLike={() => onReplyLike(reply.id)}
								/>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	)
}

/* ─────────────── Main Comments ─────────────── */
function Comments({ slug, authorName }: { slug: string; authorName: string }) {
	const STORAGE_KEY = `comments_v2_${slug}`
	const [comments, setComments] = useState<IComment[]>([])
	const [name, setName] = useState('')
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const [mounted, setMounted] = useState(false)

	const load = () => {
		const stored = localStorage.getItem(STORAGE_KEY)
		if (stored) setComments(JSON.parse(stored))
	}

	useEffect(() => {
		setMounted(true)
		load()
	}, [slug])

	const save = (updated: IComment[]) => {
		setComments(updated)
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
		window.dispatchEvent(new Event(`comment_update_${slug}`))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!name.trim() || !message.trim()) {
			toast.error('Ism va izohni kiriting')
			return
		}
		setLoading(true)
		setTimeout(() => {
			const c: IComment = {
				id: Date.now().toString(),
				name: name.trim(),
				message: message.trim(),
				createdAt: new Date().toISOString(),
				likes: 0,
				likedByMe: false,
				replies: [],
			}
			save([c, ...comments])
			setName('')
			setMessage('')
			setLoading(false)
			toast.success("Izoh qo'shildi!")
		}, 400)
	}

	const handleCommentLike = (id: string) => {
		save(
			comments.map(c =>
				c.id === id
					? {
							...c,
							likes: c.likedByMe ? c.likes - 1 : c.likes + 1,
							likedByMe: !c.likedByMe,
						}
					: c
			)
		)
	}

	const handleReplyLike = (commentId: string, replyId: string) => {
		save(
			comments.map(c =>
				c.id === commentId
					? {
							...c,
							replies: c.replies.map(r =>
								r.id === replyId
									? {
											...r,
											likes: r.likedByMe ? r.likes - 1 : r.likes + 1,
											likedByMe: !r.likedByMe,
										}
									: r
							),
						}
					: c
			)
		)
	}

	const handleAddReply = (
		commentId: string,
		rName: string,
		rMessage: string
	) => {
		const reply: IReply = {
			id: `r_${Date.now()}`,
			name: rName,
			message: rMessage,
			createdAt: new Date().toISOString(),
			likes: 0,
			likedByMe: false,
		}
		save(
			comments.map(c =>
				c.id === commentId ? { ...c, replies: [...c.replies, reply] } : c
			)
		)
		toast.success("Javob qo'shildi!")
	}

	if (!mounted) return null

	return (
		<section className='mt-16 max-w-2xl border-t border-border/50 pt-12'>
			{/* Header */}
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center gap-2.5'>
					<MessageCircle className='w-5 h-5 text-primary' />
					<h3 className='font-luckiest text-xl tracking-tight'>
						{comments.length} ta izoh
					</h3>
				</div>
				<button
					onClick={load}
					className='flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors group'
				>
					<RefreshCw className='w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500' />
					Yangilash
				</button>
			</div>

			{/* New comment form */}
			<div className='mb-8 rounded-xl border border-border/60 bg-secondary/20 p-5'>
				<div className='flex gap-3'>
					<div className='w-10 h-10 rounded-full bg-muted flex-shrink-0 flex items-center justify-center border border-border/60 text-muted-foreground'>
						<MessageCircle className='w-4 h-4' />
					</div>
					<form onSubmit={handleSubmit} className='flex-1 space-y-3'>
						<Input
							placeholder='Ismingiz'
							value={name}
							onChange={e => setName(e.target.value)}
							className='h-9 bg-background text-sm'
						/>
						<Textarea
							placeholder='Fikringizni yozing...'
							value={message}
							onChange={e => setMessage(e.target.value)}
							rows={4}
							className='bg-background resize-none text-sm'
						/>
						<div className='flex items-center justify-between'>
							<Button
								type='submit'
								size='sm'
								disabled={loading}
								className='gap-1.5 h-8 px-4'
							>
								<Send className='w-3.5 h-3.5' />
								{loading ? '...' : 'Yuborish'}
							</Button>
						</div>
					</form>
				</div>
			</div>

			{/* List */}
			{comments.length === 0 ? (
				<div className='text-center py-14 rounded-xl border border-dashed border-border/50'>
					<MessageCircle className='w-8 h-8 text-muted-foreground/25 mx-auto mb-3' />
					<p className='text-sm text-muted-foreground'>
						Hali izoh yo&apos;q. Birinchi bo&apos;ling!
					</p>
				</div>
			) : (
				<div>
					{comments.map(comment => (
						<CommentItem
							key={comment.id}
							comment={comment}
							authorName={authorName}
							onCommentLike={() => handleCommentLike(comment.id)}
							onReplyLike={rId => handleReplyLike(comment.id, rId)}
							onAddReply={(n, m) => handleAddReply(comment.id, n, m)}
						/>
					))}
				</div>
			)}
		</section>
	)
}

export default Comments
