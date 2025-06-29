import { Public_Sans, Inter, Roboto } from 'next/font/google';

export const typeFirst = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'auto',
  variable: '--type-first-roboto'
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
