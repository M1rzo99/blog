import https from 'node:https'
import { NextRequest, NextResponse } from 'next/server'

function telegramPost(botToken: string, chatId: string, text: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const bodyBuffer = Buffer.from(
			JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
			'utf-8'
		)
		const req = https.request(
			{
				hostname: 'api.telegram.org',
				port: 443,
				path: `/bot${botToken}/sendMessage`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Content-Length': bodyBuffer.length,
				},
			},
			res => {
				let data = ''
				res.on('data', chunk => { data += chunk })
				res.on('end', () => {
					if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
						resolve(data)
					} else {
						reject(new Error(`HTTP ${res.statusCode}: ${data}`))
					}
				})
				res.on('error', reject)
			}
		)
		req.on('error', reject)
		req.write(bodyBuffer)
		req.end()
	})
}

export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json()

		if (!email || !email.includes('@')) {
			return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
		}

		const botToken = process.env.NEXT_PUBLIC_TG_BOT_API
		const chatId = process.env.NEXT_PUBLIC_TG_CHAT_ID

		if (!botToken || !chatId) {
			return NextResponse.json({ error: 'Telegram not configured' }, { status: 500 })
		}

		await telegramPost(botToken, chatId, `📧 *Yangi obuna!*\nEmail: \`${email}\``)

		return NextResponse.json({ success: true })
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err)
		console.error('[subscribe]', message)
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
