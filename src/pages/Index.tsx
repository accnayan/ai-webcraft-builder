
import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import WebsiteBuilder from '@/components/WebsiteBuilder';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'builder'>('landing');
  const [builderPrompt, setBuilderPrompt] = useState('');

  const handleBuildWebsite = (prompt: string) => {
    setBuilderPrompt(prompt);
    setCurrentView('builder');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setBuilderPrompt('');
  };

  if (currentView === 'builder') {
    return (
      <WebsiteBuilder 
        initialPrompt={builderPrompt}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  return (
    <LandingPage onBuildWebsite={handleBuildWebsite} />
  );
};

export default Index;
