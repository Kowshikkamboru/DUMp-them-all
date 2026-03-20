import './globals.css'

export const metadata = {
  title: 'DUMP them all — Sell Your Junk, Get Cash',
  description: 'Schedule a doorstep pickup for your old books, scrap metal, plastic, e-waste, and valuables. We come to you, weigh it, pay you.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
