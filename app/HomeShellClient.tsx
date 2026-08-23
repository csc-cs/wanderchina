'use client';

import { useState } from 'react';
import { Hero } from '@/components/homepage/Hero';
import { FeatureNav } from '@/components/homepage/FeatureNav';
import { CityQuickEntry } from '@/components/homepage/CityQuickEntry';
import { HotPosts } from '@/components/homepage/HotPosts';
import { HotSpots } from '@/components/homepage/HotSpots';
import { Explore } from '@/components/homepage/Explore';
import { AiEntry } from '@/components/homepage/AiEntry';
import { AiAssistantModal } from '@/components/homepage/AiAssistantModal';
import { Footer } from '@/components/layout/Footer';

export function HomeShellClient() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <>
      <Hero onAiClick={() => setAiOpen(true)} />
      <main className="bg-brand-surface">
        <FeatureNav />
        <CityQuickEntry />
        <HotPosts />
        <HotSpots />
        <Explore />
      </main>
      <Footer />
      <AiEntry onOpen={() => setAiOpen(true)} />
      <AiAssistantModal open={aiOpen} onClose={() => setAiOpen(false)} />
    </>
  );
}