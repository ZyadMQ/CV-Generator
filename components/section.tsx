'use client';

const Section = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-slate-700 mb-6 flex items-center border-b pb-3 border-slate-200">
            {icon} {title}
        </h2>
        <div className="space-y-4">{children}</div>
    </section>
);

export default Section;
