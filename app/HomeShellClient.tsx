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
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';

export function HomeShellClient() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <>
      <Hero onAiClick={() => setAiOpen(true)} />
      <main className="bg-brand-surface">
        <ErrorBoundary>
          <FeatureNav />
        </ErrorBoundary>
        <ErrorBoundary>
          <CityQuickEntry />
        </ErrorBoundary>
        <ErrorBoundary>
          <HotPosts />
        </ErrorBoundary>
        <ErrorBoundary>
          <HotSpots />
        </ErrorBoundary>
        <ErrorBoundary>
          <Explore />
        </ErrorBoundary>
      </main>
      <Footer />
      <AiEntry onOpen={() => setAiOpen(true)} />
      <AiAssistantModal open={aiOpen} onClose={() => setAiOpen(false)} />
    </>
  );
}