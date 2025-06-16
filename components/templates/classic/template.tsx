'use client';

import { Phone, Mail, Linkedin, Globe, User } from 'lucide-react';
import ResumeSectionClassic from '@/components/templates/classic/sections';
import { ResumeData } from '@/types/resume-data';

const ClassicTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-8 md:p-12 font-serif text-slate-800">
        <header className="text-center border-b-2 border-slate-400 pb-6 mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">{data.personalInfo.name || "Your Name"}</h1>
            <p className="text-xl text-slate-600 mt-1">{data.personalInfo.jobTitle || "Your Job Title"}</p>
            <div className="flex justify-center gap-x-6 gap-y-2 text-sm mt-4 text-slate-600 flex-wrap">
                {data.personalInfo.phone && <span><Phone size={14} className="inline mr-1" /> {data.personalInfo.phone}</span>}
                {data.personalInfo.email && <span><Mail size={14} className="inline mr-1" /> {data.personalInfo.email}</span>}
                {data.personalInfo.linkedin && <span><Linkedin size={14} className="inline mr-1" /> {data.personalInfo.linkedin}</span>}
                {data.personalInfo.website && <span><Globe size={14} className="inline mr-1" /> {data.personalInfo.website}</span>}
                {data.personalInfo.address && <span className="w-full text-center mt-1"><User size={14} className="inline mr-1" /> {data.personalInfo.address}</span>}
            </div>
        </header>

        {data.summary && (
            <ResumeSectionClassic title="Summary">
                <p className="text-slate-700 leading-relaxed">{data.summary}</p>
            </ResumeSectionClassic>
        )}

        {data.experience.length > 0 && (
            <ResumeSectionClassic title="Experience">
                {data.experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="text-lg font-semibold text-slate-800">{exp.jobTitle}</h3>
                        <p className="text-md font-medium text-slate-700">{exp.company} | {exp.location}</p>
                        <p className="text-sm text-slate-500 mb-1">{exp.startDate} – {exp.endDate || 'Present'}</p>
                        <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 pl-2">
                            {exp.responsibilities.split('\n').map((line, i) => line.trim() && <li key={i}>{line}</li>)}
                        </ul>
                    </div>
                ))}
            </ResumeSectionClassic>
        )}

        {data.education.length > 0 && (
            <ResumeSectionClassic title="Education">
                {data.education.map(edu => (
                    <div key={edu.id} className="mb-3">
                        <h3 className="text-lg font-semibold text-slate-800">{edu.degree} in {edu.major}</h3>
                        <p className="text-md text-slate-700">{edu.institution}</p>
                        <p className="text-sm text-slate-500">{edu.gradYear}</p>
                        {edu.details && <p className="text-sm text-slate-600 mt-1">{edu.details}</p>}
                    </div>
                ))}
            </ResumeSectionClassic>
        )}

        {data.skills.length > 0 && (
            <ResumeSectionClassic title="Skills">
                <div className="flex flex-wrap gap-2">
                    {data.skills.map(skill => (
                        <span key={skill.id} className="bg-slate-200 text-slate-700 px-3 py-1 rounded text-sm">
                            {skill.name}
                        </span>
                    ))}
                </div>
            </ResumeSectionClassic>
        )}

        {data.awards.length > 0 && (
            <ResumeSectionClassic title="Awards & Recognitions">
                {data.awards.map(award => (
                    <div key={award.id} className="mb-3">
                        <h3 className="text-lg font-semibold text-slate-800">{award.name}</h3>
                        <p className="text-md text-slate-700">{award.issuer} | {award.year}</p>
                        {award.description && <p className="text-sm text-slate-600 mt-1">{award.description}</p>}
                    </div>
                ))}
            </ResumeSectionClassic>
        )}
    </div>
);

export default ClassicTemplate;
