import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
export const metadata = {

  title: 'Techconnect',
  description: 'App description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}