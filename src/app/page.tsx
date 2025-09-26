'use client';

import { useState } from 'react';
import type { Verse } from '@/lib/verses';
import versesData from '@/lib/verses.json';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { VerseCard } from '@/components/verse-card';

export default function Home() {
  const verses: Verse[] = versesData.verses;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        <VerseCard allVerses={verses} />
      </main>
      <Footer />
    </div>
  );
}
