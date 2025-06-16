'use client';

const ModernSectionAside = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-6">
        <h2 className="text-lg font-semibold text-blue-300 border-b-2 border-blue-400 pb-1 mb-3 uppercase tracking-wide">{title}</h2>
        {children}
    </section>
);

const ModernSectionMain = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-6">
        <h2 className="text-2xl font-bold text-slate-700 pb-1 mb-4 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-1 after:bg-blue-600">
            {title}
        </h2>
        {children}
    </section>
);

export { ModernSectionAside, ModernSectionMain }; // Exporting as an object to use in the template file
