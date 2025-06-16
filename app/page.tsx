'use client';

import { Briefcase, User, Phone, Mail, Linkedin, Globe, PlusCircle, Eye, Award, BookOpen, MessageSquare, Star, X, ChevronLeft, Printer } from 'lucide-react';
import CreativeTemplate from '@/components/templates/creative/template';
import ClassicTemplate from '@/components/templates/classic/template';
import ModernTemplate from '@/components/templates/modern/template';
import EditableListItem from '@/components/editable-list-item';
import InputField from '@/components/input-field';
import { ResumeData } from '@/types/resume-data';
import ItemModal from '@/components/item-modal';
import Section from '@/components/section';
import React, { useState } from 'react';
import { generateId } from '@/utils';

// Initial empty state for resume data
const initialResumeData: ResumeData = {
    personalInfo: {
        name: '',
        jobTitle: '',
        phone: '',
        email: '',
        linkedin: '',
        website: '',
        address: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    awards: [],
};

const templates: { id: 'classic' | 'modern' | 'creative', name: string, previewImage: string }[] = [
    { id: 'classic', name: 'Classic Professional', previewImage: '/thumbnails/classic.webp' },
    { id: 'modern', name: 'Modern Minimalist', previewImage: '/thumbnails/modern.webp' },
    { id: 'creative', name: 'Creative Spark', previewImage: '/thumbnails/creative.webp' },
];

const App = () => {
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
    const [currentView, setCurrentView] = useState<string>('form');
    const [selectedTemplate, setSelectedTemplate] = useState<'classic' | 'modern' | 'creative'>(templates[0].id);
    const [editingItem, setEditingItem] = useState(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<'experience' | 'education' | 'awards' | ''>('');

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [name]: value }
        }));
    };

    const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResumeData(prev => ({ ...prev, summary: e.target.value }));
    };

    const openAddModal = (type: 'experience' | 'education' | 'awards') => {
        setModalType(type);
        setEditingItem(null);
        setShowModal(true);
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const openEditModal = (type: 'experience' | 'education' | 'awards', item: any) => {
        setModalType(type);
        setEditingItem(item);
        setShowModal(true);
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const handleAddItem = (type: 'experience' | 'education' | 'awards' | '', newItem: any) => {
        if (type === '') return;
        if (!newItem || Object.values(newItem).every(val => val === '')) return;
        setResumeData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...newItem, id: generateId() }]
        }));
        setShowModal(false);
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const handleEditItem = (type: 'experience' | 'education' | 'awards' | '', updatedItem: any) => {
        if (type === '') return;
        setResumeData(prev => ({
            ...prev,
            [type]: prev[type].map(item => item.id === updatedItem.id ? updatedItem : item)
        }));
        setShowModal(false);
        setEditingItem(null);
    };

    const handleDeleteItem = (type: 'experience' | 'education' | 'awards', itemId: string) => {
        setResumeData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.id !== itemId)
        }));
    };


    const [currentSkill, setCurrentSkill] = useState<string>('');
    const handleAddSkill = () => {
        if (currentSkill.trim() && !resumeData.skills.some(skill => skill.name === currentSkill.trim())) {
            setResumeData(prev => ({
                ...prev,
                skills: [...prev.skills, { id: generateId(), name: currentSkill.trim() }]
            }));
            setCurrentSkill('');
        }
    };
    const handleDeleteSkill = (skillId: string) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill.id !== skillId)
        }));
    };

    const goToTemplates = () => {
        if (!resumeData.personalInfo.name || !resumeData.personalInfo.email) {
            alert("Please fill in at least your Name and Email before proceeding."); // In a real app, use a nicer modal
            return;
        }
        setCurrentView('templates');
    };

    const goToForm = () => setCurrentView('form');

    const goToResume = (templateId: 'classic' | 'modern' | 'creative') => {
        setSelectedTemplate(templateId);
        setCurrentView('resume');
    };

    const renderFormView = () => (
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-700">Resume Builder</h1>
                <p className="text-slate-500 mt-2">Fill in your details below to generate your professional resume.</p>
            </header>

            <Section title="Personal Information" icon={<User className="w-5 h-5 mr-2" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" name="name" value={resumeData.personalInfo.name} onChange={handlePersonalInfoChange} placeholder="e.g., Jane Doe" Icon={User} />
                    <InputField label="Job Title / Desired Role" name="jobTitle" value={resumeData.personalInfo.jobTitle} onChange={handlePersonalInfoChange} placeholder="e.g., Software Engineer" Icon={Briefcase} />
                    <InputField label="Phone Number" name="phone" type="tel" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} placeholder="e.g., (555) 123-4567" Icon={Phone} />
                    <InputField label="Email Address" name="email" type="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} placeholder="e.g., jane.doe@example.com" Icon={Mail} />
                    <InputField label="LinkedIn Profile URL" name="linkedin" value={resumeData.personalInfo.linkedin} onChange={handlePersonalInfoChange} placeholder="e.g., linkedin.com/in/janedoe" Icon={Linkedin} />
                    <InputField label="Personal Website/Portfolio" name="website" value={resumeData.personalInfo.website} onChange={handlePersonalInfoChange} placeholder="e.g., janedoe.com" Icon={Globe} />
                </div>
                <InputField label="Full Address (Optional)" name="address" value={resumeData.personalInfo.address} onChange={handlePersonalInfoChange} placeholder="e.g., 123 Main St, Anytown, USA" />
            </Section>

            <Section title="Professional Summary" icon={<MessageSquare className="w-5 h-5 mr-2" />}>
                <textarea
                    name="summary"
                    value={resumeData.summary}
                    onChange={handleSummaryChange}
                    rows={5}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    placeholder="A brief overview of your career, skills, and goals..."
                />
            </Section>

            <Section title="Work Experience" icon={<Briefcase className="w-5 h-5 mr-2" />}>
                {resumeData.experience.map((exp) => (
                    <EditableListItem key={exp.id} item={exp} type="experience" onDelete={handleDeleteItem} onEdit={openEditModal}>
                        <h3 className="font-semibold text-slate-700">{exp.jobTitle} at {exp.company}</h3>
                        <p className="text-sm text-slate-500">{exp.startDate} - {exp.endDate || 'Present'} | {exp.location}</p>
                        <ul className="list-disc list-inside text-slate-600 mt-1 text-sm">
                            {exp.responsibilities.split('\n').map((line, i) => line.trim() && <li key={i}>{line}</li>)}
                        </ul>
                    </EditableListItem>
                ))}
                <button onClick={() => openAddModal('experience')} className="mt-4 flex items-center text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
                    <PlusCircle className="w-5 h-5 mr-2" /> Add Experience
                </button>
            </Section>

            <Section title="Education" icon={<BookOpen className="w-5 h-5 mr-2" />}>
                {resumeData.education.map((edu) => (
                    <EditableListItem key={edu.id} item={edu} type="education" onDelete={handleDeleteItem} onEdit={openEditModal}>
                        <h3 className="font-semibold text-slate-700">{edu.degree} in {edu.major}</h3>
                        <p className="text-sm text-slate-500">{edu.institution} | {edu.gradYear}</p>
                        {edu.details && <p className="text-slate-600 mt-1 text-sm">{edu.details}</p>}
                    </EditableListItem>
                ))}
                <button onClick={() => openAddModal('education')} className="mt-4 flex items-center text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
                    <PlusCircle className="w-5 h-5 mr-2" /> Add Education
                </button>
            </Section>

            <Section title="Skills" icon={<Star className="w-5 h-5 mr-2" />}>
                <div className="flex flex-wrap gap-2 mb-4">
                    {resumeData.skills.map(skill => (
                        <span key={skill.id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                            {skill.name}
                            <button onClick={() => handleDeleteSkill(skill.id)} className="ml-2 text-blue-500 hover:text-blue-700">
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        placeholder="e.g., JavaScript, Project Management"
                        className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    />
                    <button onClick={handleAddSkill} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        <PlusCircle size={18} className="mr-1 sm:mr-2" /> Add Skill
                    </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">Press Enter or click &quot;Add Skill&quot;.</p>
            </Section>

            <Section title="Awards & Recognitions" icon={<Award className="w-5 h-5 mr-2" />}>
                {resumeData.awards.map((award) => (
                    <EditableListItem key={award.id} item={award} type="awards" onDelete={handleDeleteItem} onEdit={openEditModal}>
                        <h3 className="font-semibold text-slate-700">{award.name}</h3>
                        <p className="text-sm text-slate-500">{award.issuer} | {award.year}</p>
                        {award.description && <p className="text-slate-600 mt-1 text-sm">{award.description}</p>}
                    </EditableListItem>
                ))}
                <button onClick={() => openAddModal('awards')} className="mt-4 flex items-center text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
                    <PlusCircle className="w-5 h-5 mr-2" /> Add Award
                </button>
            </Section>

            <div className="mt-12 flex justify-end">
                <button
                    onClick={goToTemplates}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all text-lg flex items-center"
                >
                    Choose Template <Eye className="w-5 h-5 ml-2" />
                </button>
            </div>
            {showModal && <ItemModal type={modalType} item={editingItem} onSave={editingItem ? (data) => handleEditItem(modalType, data) : (data) => handleAddItem(modalType, data)} onClose={() => setShowModal(false)} />}
        </div>
    );

    const renderTemplateSelectionView = () => (
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            <button onClick={goToForm} className="mb-8 flex items-center text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
                <ChevronLeft className="w-5 h-5 mr-2" /> Back to Form
            </button>
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-700">Choose a Template</h1>
                <p className="text-slate-500 mt-2">Select a style that best represents you.</p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map(template => (
                    <div key={template.id} className="border border-slate-300 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group bg-white" onClick={() => goToResume(template.id)}>
                        <div className="bg-slate-200 h-72 flex items-center justify-center">
                            <img src={template.previewImage} alt={template.name} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">{template.name}</h3>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
                                Use This Template
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderResumeView = () => {
        const TemplateComponent = templatesComponents[selectedTemplate] || templatesComponents.classic;

        return (
            <div className="max-w-5xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                    <button onClick={() => setCurrentView('templates')} className="flex items-center text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
                        <ChevronLeft className="w-5 h-5 mr-2" /> Back to Templates
                    </button>
                    <div className="flex gap-3">
                        <button onClick={() => window.print()} className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm">
                            <Printer size={18} className="mr-2" /> Print / Save PDF
                        </button>
                        {/* <button onClick={() => alert("Download functionality to be implemented!")} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm">
                            <Download size={18} className="mr-2" /> Download
                        </button> */}
                    </div>
                </div>

                <div id="resume-to-print" className="bg-white shadow-2xl rounded-lg overflow-hidden">
                    <TemplateComponent data={resumeData} />
                </div>
                <style jsx global>{`
                @media print {
                  body * {
                    visibility: hidden;
                  }
                  #resume-to-print, #resume-to-print * {
                    visibility: visible;
                  }
                  #resume-to-print {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: auto;
                    margin: 0;
                    padding: 0;
                    box-shadow: none;
                    border-radius: 0;
                  }
                  /* Add more print-specific styles */
                  .no-print { display: none !important; }
                }
            `}</style>
            </div>
        );
    };


    return (
        <div className="bg-slate-100 min-h-screen font-sans">
            {currentView === 'form' && renderFormView()}
            {currentView === 'templates' && renderTemplateSelectionView()}
            {currentView === 'resume' && renderResumeView()}
        </div>
    );
}

export default App;



// --- Mapping templates to components ---
const templatesComponents = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    creative: CreativeTemplate,
};
