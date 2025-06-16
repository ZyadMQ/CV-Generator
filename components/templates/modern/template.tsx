'use client';

import { Phone, Mail, Linkedin, Globe, User } from 'lucide-react';
import { ModernSectionAside, ModernSectionMain } from '@/components/templates/modern/sections';
import { ResumeData } from '@/types/resume-data';

const ModernTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-6 md:p-10 font-sans flex gap-x-6">
        {/* Left Column (Contact & Skills) */}
        <aside className="w-1/3 bg-slate-800 text-white p-6 rounded-lg">
            <div className="text-center mb-8">
                {/* Placeholder for an optional photo */}
                {/* <div className="w-32 h-32 bg-slate-700 rounded-full mx-auto mb-4 border-4 border-slate-600"></div> */}
                <h1 className="text-3xl font-bold text-white">{data.personalInfo.name || "Your Name"}</h1>
                <p className="text-lg text-slate-300">{data.personalInfo.jobTitle || "Your Job Title"}</p>
            </div>

            <ModernSectionAside title="Contact">
                {data.personalInfo.phone && <p className="text-sm mb-1"><Phone size={14} className="inline mr-2" />{data.personalInfo.phone}</p>}
                {data.personalInfo.email && <p className="text-sm mb-1"><Mail size={14} className="inline mr-2" />{data.personalInfo.email}</p>}
                {data.personalInfo.address && <p className="text-sm mb-1"><User size={14} className="inline mr-2" />{data.personalInfo.address}</p>}
                {data.personalInfo.linkedin && <p className="text-sm mb-1 truncate"><Linkedin size={14} className="inline mr-2" />{data.personalInfo.linkedin.replace('https://', '').replace('www.', '')}</p>}
                {data.personalInfo.website && <p className="text-sm truncate"><Globe size={14} className="inline mr-2" />{data.personalInfo.website.replace('https://', '').replace('www.', '')}</p>}
            </ModernSectionAside>

            {data.skills.length > 0 && (
                <ModernSectionAside title="Skills">
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map(skill => (
                            <span key={skill.id} className="bg-slate-600 text-slate-100 text-xs px-2 py-1 rounded-md">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </ModernSectionAside>
            )}

            {data.education.length > 0 && (
                <ModernSectionAside title="Education">
                    {data.education.map(edu => (
                        <div key={edu.id} className="mb-3">
                            <h3 className="text-md font-semibold text-slate-100">{edu.degree}</h3>
                            <p className="text-sm text-slate-300">{edu.institution}</p>
                            <p className="text-xs text-slate-400">{edu.major} - {edu.gradYear}</p>
                            {edu.details && <p className="text-xs text-slate-400 mt-0.5">{edu.details}</p>}
                        </div>
                    ))}
                </ModernSectionAside>
            )}
        </aside>

        {/* Right Column (Summary, Experience) */}
        <main className="w-2/3">
            {data.summary && (
                <ModernSectionMain title="Summary">
                    <p className="text-slate-600 leading-relaxed text-sm">{data.summary}</p>
                </ModernSectionMain>
            )}

            {data.experience.length > 0 && (
                <ModernSectionMain title="Experience">
                    {data.experience.map(exp => (
                        <div key={exp.id} className="mb-5">
                            <h3 className="text-xl font-semibold text-slate-700">{exp.jobTitle}</h3>
                            <div className="flex justify-between items-baseline">
                                <p className="text-md text-blue-600 font-medium">{exp.company}</p>
                                <p className="text-xs text-slate-500">{exp.startDate} – {exp.endDate || 'Present'}</p>
                            </div>
                            <p className="text-xs text-slate-500 mb-1">{exp.location}</p>
                            <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 pl-1">
                                {exp.responsibilities.split('\n').map((line, i) => line.trim() && <li key={i}>{line}</li>)}
                            </ul>
                        </div>
                    ))}
                </ModernSectionMain>
            )}

            {data.awards.length > 0 && (
                <ModernSectionMain title="Awards">
                    {data.awards.map(award => (
                        <div key={award.id} className="mb-3">
                            <h3 className="text-lg font-semibold text-slate-700">{award.name}</h3>
                            <p className="text-sm text-slate-600">{award.issuer} - {award.year}</p>
                            {award.description && <p className="text-xs text-slate-500 mt-0.5">{award.description}</p>}
                        </div>
                    ))}
                </ModernSectionMain>
            )}
        </main>
    </div>
);

export default ModernTemplate;
