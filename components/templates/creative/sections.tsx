'use client';

const CreativeSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">{title}</h2>
        {children}
    </section>
);

export default CreativeSection;
