import { Toaster } from '@/components/ui/sonner'
import { ChildProps } from '@/types'
import type { Metadata } from 'next'
import { Luckiest_Guy, Playfair_Display, Work_Sans } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { ThemeProvider } from './(root)/_components/providers/theme-provider'
import './globals.css'

const workSans = Work_Sans({
	weight: ['500', '600'],
	subsets: ['latin'],
	variable: '--font-workSans',
})

const luckiestGuy = Luckiest_Guy({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-luckiestGuy',
	display: 'swap',
})

const playfairDisplay = Playfair_Display({
	weight: ['400', '500', '600', '700', '800'],
	subsets: ['latin'],
	variable: '--font-playfairDisplay',
	display: 'swap',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://q13-blog.ac'),
	authors: [{ name: 'Mirzo Shomuratov', url: 'https://Mirzo.ac' }],
	icons: { icon: '/thirteen.png' },
	title: 'q13-blog ',
	description: 'You can create your own blog',
	keywords:
		'blog, nextjs, typescript, react, tailwindcss, blog-q13, blogs, BLOG, q13',
	openGraph: {
		title: 'q13-blog',
		description: 'You can create your own blog',
		type: 'website',
		url: 'https://q13-blog.ac',
		siteName: 'q13-blog',
		locale: 'en_US',
		images: { url: 'https://q13-blog.ac/thirteen.png' },
		emails: 'accaunoff99@gmail.com',
	},
}

function RootLayout({ children }: ChildProps) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${workSans.variable} ${playfairDisplay.variable} ${luckiestGuy.variable} overflow-x-hidden`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					storageKey='q13-theme'
					disableTransitionOnChange
				>
					<NextTopLoader showSpinner={false} />
					{children}
					<Toaster position='top-center' />
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
