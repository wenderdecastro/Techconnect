import './globals.css';
import { Inter } from 'next/font/google';


export const metadata = {
  title: 'My App',
  description: 'App description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}