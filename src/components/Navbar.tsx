import React from 'react';

interface NavbarProps {
  activeSection?: string;
  onSelectSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home', onSelectSection }) => {
  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'foundation', label: 'Foundation', href: '#foundation' },
    { id: 'research', label: 'Research', href: '#research' },
    { id: 'design', label: 'Design', href: '#design' },
    { id: 'technology', label: 'Technology', href: '#technology' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (onSelectSection) {
      onSelectSection(id);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full flex justify-center pt-6 sm:pt-8 pb-3 px-4 z-50 pointer-events-none">
      <nav 
        id="main-nav"
        className="inline-flex items-center p-1 sm:p-1.5 rounded-full border border-white/20 bg-[#252E4D]/85 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)] pointer-events-auto"
        aria-label="Portfolio Navigation"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              id={`nav-link-${item.id}`}
              data-cursor="magnetic"
              onClick={(e) => handleClick(e, item.id)}
              className={`px-4 sm:px-6 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors ${
                isActive
                  ? 'border border-[#FF9BB4] bg-[#FF9BB4]/15 text-white shadow-[0_0_12px_rgba(255,155,180,0.25)]'
                  : 'text-[#B8BED0] hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
};
