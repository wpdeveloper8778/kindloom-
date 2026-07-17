import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Kindloom — Custom T-Shirt & Print-on-Demand Store',
  description: 'Design your own custom t-shirts, hoodies, and more. Upload your logo, choose colors, and get high-quality printing delivered to your door.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1 bg-white">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
