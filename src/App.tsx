import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { FoundationPage } from './components/FoundationPage';
import { ResearchPage } from './components/ResearchPage';
import { DesignPage } from './components/DesignPage';
import { TechnologyPage } from './components/TechnologyPage';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (['foundation', 'research', 'design', 'technology'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.location.hash = sectionId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['foundation', 'research', 'design', 'technology'].includes(hash)) {
        setActiveSection(hash);
      } else if (hash === 'home' || !hash) {
        setActiveSection('home');
      } else {
        setActiveSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#1D2440] text-white flex flex-col selection:bg-[#FF9BB4] selection:text-[#1D2440]">
      {/* Contextual & Magnetic Adaptive Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Fixed Floating Top Navigation (Visible on all subpages, and on Home when scrolled) */}
      {(activeSection !== 'home' || isScrolled) && (
        <Navbar 
          activeSection={activeSection} 
          onSelectSection={handleNavigate} 
        />
      )}

      {/* Main Portfolio View with Seamless View Switching */}
      <main className="flex-1 w-full flex flex-col">
        {activeSection === 'foundation' ? (
          <FoundationPage 
            onBackToHome={() => handleNavigate('home')} 
            onNavigate={handleNavigate}
          />
        ) : activeSection === 'research' ? (
          <ResearchPage 
            onBackToHome={() => handleNavigate('home')} 
            onNavigate={handleNavigate} 
          />
        ) : activeSection === 'design' ? (
          <DesignPage 
            onBackToHome={() => handleNavigate('home')} 
            onNavigate={handleNavigate} 
          />
        ) : activeSection === 'technology' ? (
          <TechnologyPage 
            onBackToHome={() => handleNavigate('home')} 
            onNavigate={handleNavigate} 
          />
        ) : (
          <div className="w-full flex flex-col">
            <HeroSection onNavigate={handleNavigate} />
            <ExperienceSection onNavigate={handleNavigate} />
          </div>
        )}
      </main>
    </div>
  );
}



