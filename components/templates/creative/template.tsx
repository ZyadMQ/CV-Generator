'use client';

import { Phone, Mail, Linkedin, Globe, User, Star } from 'lucide-react';
import CreativeSection from '@/components/templates/creative/sections';
import { ResumeData } from '@/types/resume-data';

const CreativeTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-8 md:p-10 font-sans bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800">
        <header className="relative mb-10 text-center">
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-pink-300 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-300 rounded-lg transform rotate-12 opacity-50"></div>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 relative z-10">{data.personalInfo.name || "Your Name"}</h1>
            <p className="text-xl text-indigo-700 mt-2 relative z-10">{data.personalInfo.jobTitle || "Your Job Title"}</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
                <CreativeSection title="Connect">
                    {data.personalInfo.phone && <p className="text-sm"><Phone size={14} className="inline mr-2 text-purple-600" /> {data.personalInfo.phone}</p>}
                    {data.personalInfo.email && <p className="text-sm"><Mail size={14} className="inline mr-2 text-purple-600" /> {data.personalInfo.email}</p>}
                    {data.personalInfo.linkedin && <p className="text-sm truncate"><Linkedin size={14} className="inline mr-2 text-purple-600" /> {data.personalInfo.linkedin.replace('https://', '')}</p>}
                    {data.personalInfo.website && <p className="text-sm truncate"><Globe size={14} className="inline mr-2 text-purple-600" /> {data.personalInfo.website.replace('https://', '')}</p>}
                    {data.personalInfo.address && <p className="text-sm"><User size={14} className="inline mr-2 text-purple-600" />{data.personalInfo.address}</p>}
                </CreativeSection>

                {data.skills.length > 0 && (
                    <CreativeSection title="My Superpowers">
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map(skill => (
                                <span key={skill.id} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </CreativeSection>
                )}
                {data.awards.length > 0 && (
                    <CreativeSection title="Kudos">
                        {data.awards.map(award => (
                            <div key={award.id} className="mb-2 last:mb-0">
                                <h3 className="text-md font-semibold text-purple-700">{award.name}</h3>
                                <p className="text-xs text-pink-600">{award.issuer} - {award.year}</p>
                            </div>
                        ))}
                    </CreativeSection>
                )}
            </div>

            <div className="md:col-span-2 space-y-8">
                {data.summary && (
                    <CreativeSection title="My Story">
                        <p className="text-gray-700 leading-relaxed text-sm italic border-l-4 border-purple-400 pl-4">{data.summary}</p>
                    </CreativeSection>
                )}

                {data.experience.length > 0 && (
                    <CreativeSection title="Adventures So Far">
                        {data.experience.map(exp => (
                            <div key={exp.id} className="mb-4 p-3 bg-white/70 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-purple-700">{exp.jobTitle}</h3>
                                <p className="text-md text-pink-600">{exp.company} <span className="text-gray-500 text-xs">| {exp.location}</span></p>
                                <p className="text-xs text-gray-500 mb-1">{exp.startDate} – {exp.endDate || 'Present'}</p>
                                <ul className="list-none text-gray-600 text-sm space-y-1">
                                    {exp.responsibilities.split('\n').map((line, i) => line.trim() && <li key={i} className="flex items-start"><Star size={12} className="mr-2 mt-1 text-yellow-500 flex-shrink-0" />{line}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CreativeSection>
                )}

                {data.education.length > 0 && (
                    <CreativeSection title="Knowledge Quests">
                        {data.education.map(edu => (
                            <div key={edu.id} className="mb-3 p-3 bg-white/70 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-purple-700">{edu.degree} in {edu.major}</h3>
                                <p className="text-md text-pink-600">{edu.institution}</p>
                                <p className="text-xs text-gray-500">{edu.gradYear}</p>
                                {edu.details && <p className="text-xs text-gray-500 mt-1">{edu.details}</p>}
                            </div>
                        ))}
                    </CreativeSection>
                )}
            </div>
        </div>
    </div>
);

export default CreativeTemplate;
