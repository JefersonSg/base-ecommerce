import { Montserrat, Public_Sans, Inter } from 'next/font/google';

export const typeFirst = Montserrat({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'auto',
  variable: '--type-first-montserrat'
});

export const paymentFont = Inter({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'auto',
  variable: '--type-first-payment'
});

export const typeFirstDashboard = Public_Sans({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'auto',
  variable: '--type-first-dashboard'
});
