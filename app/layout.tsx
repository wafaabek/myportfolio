import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { LocaleProvider } from './contexts/locale-context';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wafaa Bekkhoucha - Full Stack Engineer',
  description: 'Portfolio of Wafaa Bekkhoucha, Full Stack Developer specializing in React, Next.js, Django and AI integration.',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${geist.className}`}>
      <body className="antialiased bg-slate-950 text-white overflow-x-hidden">
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}