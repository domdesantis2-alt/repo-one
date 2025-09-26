import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

const StainedGlassBackground = () => (
  <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="pattern-squares" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="40" height="40" fill="hsl(var(--background))"/>
          <path d="M 10 0 L 10 40 M 0 10 L 40 10" stroke="hsl(var(--primary) / 0.1)" strokeWidth="1"/>
          <path d="M 30 0 L 30 40 M 0 30 L 40 30" stroke="hsl(var(--primary) / 0.1)" strokeWidth="1"/>
          <rect x="10" y="10" width="20" height="20" fill="hsl(var(--primary) / 0.05)" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-squares)"/>
    </svg>
  </div>
);

export const metadata: Metadata = {
  title: 'Daily Scripture Spark',
  description: 'Daily Bible verses with inspiration, wisdom, and easy sharing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,700;1,7..72,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <StainedGlassBackground />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
