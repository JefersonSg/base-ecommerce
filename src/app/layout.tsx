import {
  typeFirst,
  typeFirstDashboard,
  paymentFont
} from '../shared/functions/fonts';
import './globals.css';
import './fonts.css';
import './colors.css';
import { GoogleTagManager } from '@next/third-parties/google';

import Providers from '@/src/shared/providers/providers';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-NYKP51D935" />
      <body
        className={`${typeFirst.variable} ${typeFirstDashboard.variable} ${paymentFont.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
