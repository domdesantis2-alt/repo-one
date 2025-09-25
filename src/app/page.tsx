'use client';

import { useState } from 'react';
import type { Verse } from '@/lib/verses';
import versesData from '@/lib/verses.json';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { VerseCard } from '@/components/verse-card';

export default function Home() {
  const verses: Verse[] = versesData.verses;

  const getDailyVerse = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return verses[dayOfYear % verses.length];
  };

  const [initialVerse] = useState(getDailyVerse());

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        <VerseCard initialVerse={initialVerse} allVerses={verses} />
      </main>
      <Footer />
    </div>
  );
}
