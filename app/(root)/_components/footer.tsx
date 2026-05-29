'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const Footer = () => {
	const [active, setActive] = useState(false)
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!email.trim() || !email.includes('@')) {
			toast.error("Iltimos, to'g'ri email manzil kiriting")
			return
		}

		setLoading(true)
		try {
			const botToken = process.env.NEXT_PUBLIC_TG_BOT_API
			const chatId = process.env.NEXT_PUBLIC_TG_CHAT_ID

			const res = await fetch(
				`https://api.telegram.org/bot${botToken}/sendMessage`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						chat_id: chatId,
						text: `📧 *Yangi obuna!*\nEmail: \`${email}\``,
						parse_mode: 'Markdown',
					}),
				}
			)

			if (res.ok) {
				toast.success("Muvaffaqiyatli obuna bo'ldingiz! 🎉")
				setEmail('')
			} else {
				toast.error("Xatolik yuz berdi, qayta urinib ko'ring")
			}
		} catch {
			toast.error('Xatolik yuz berdi')
		} finally {
			setLoading(false)
		}
	}

	return (
		<footer className='flex-center py-24 flex-col container max-w-2xl space-y-12'>
			<h1 className='text-4xl text-center font-luckiest'>
				Pastga Email Manzilingizni Kiritsangiz Bo'ladi!
			</h1>
			<form
				onSubmit={handleSubmit}
				className='grid grid-cols-1 md:grid-cols-3 w-full gap-2 md:gap-4'
			>
				<Input
					type='email'
					onFocus={() => setActive(true)}
					onBlur={() => setActive(false)}
					placeholder='Your email address'
					value={email}
					onChange={e => setEmail(e.target.value)}
					className='w-full md:col-span-2'
					disabled={loading}
				/>
				<Button
					type='submit'
					size='lg'
					disabled={loading}
					className='w-full md:w-auto'
					variant={active ? 'default' : 'outline'}
				>
					<User2 className='me-2 w-4 h-4' />
					<span>{loading ? 'Yuborilmoqda...' : 'Join Today'}</span>
				</Button>
			</form>
		</footer>
	)
}

export default Footer
