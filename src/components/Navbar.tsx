import React from 'react';

interface NavbarProps {
  activeSection?: string;
  onSelectSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home', onSelectSection }) => {
  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'foundation', label: 'Foundation', href: '#foundation' },
    { id: 'design', label: 'Design', href: '#design' },
    { id: 'research', label: 'Research', href: '#research' },
    { id: 'technology', label: 'Technology', href: '#technology' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (onSelectSection) {
      onSelectSection(id);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full flex justify-center pt-3 sm:pt-6 md:pt-8 pb-2 sm:pb-3 px-2 sm:px-4 z-50 pointer-events-none">
      <nav 
        id="main-nav"
        className="inline-flex items-center p-1 sm:p-1.5 rounded-full border border-[#4C4747]/15 bg-[#F7F3EB]/90 md:bg-[#F7F3EB]/85 backdrop-blur-md shadow-[0_8px_32px_rgba(76,71,71,0.12)] pointer-events-auto max-w-[calc(100vw-1rem)] sm:max-w-none overflow-x-auto no-scrollbar"
        aria-label="Portfolio Navigation"
      >
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                id={`nav-link-${item.id}`}
                data-cursor="magnetic"
                onClick={(e) => handleClick(e, item.id)}
                className={`px-2.5 sm:px-4 md:px-6 py-1.5 text-[11px] sm:text-xs md:text-sm font-medium rounded-full transition-colors whitespace-nowrap min-h-[36px] sm:min-h-[40px] md:min-h-[44px] flex items-center justify-center ${
                  isActive
                    ? 'border border-[#DC9BB5] bg-[#DC9BB5]/20 text-[#4C4747] shadow-[0_0_12px_rgba(220,155,181,0.3)] font-semibold'
                    : 'text-[#9D988F] hover:text-[#4C4747] hover:bg-[#4C4747]/5 active:bg-[#4C4747]/10'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
