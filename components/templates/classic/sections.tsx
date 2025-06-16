'use client';

const ResumeSectionClassic = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-6">
        <h2 className="text-xl font-bold text-slate-700 border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider">{title}</h2>
        {children}
    </section>
);

export default ResumeSectionClassic;
