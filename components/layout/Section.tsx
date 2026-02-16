type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({ children, className = "" }: SectionProps) {
  return (
    <section
      className={`
        w-full 
        px-4 sm:px-6 md:px-8 lg:px-12 
        py-10 sm:py-14 md:py-20
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
