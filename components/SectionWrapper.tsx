import React from 'react';

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, className = "", children }) => {
  return (
    <section id={id} className={`py-20 md:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
};