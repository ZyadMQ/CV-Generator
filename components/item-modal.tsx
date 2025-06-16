'use client';

import ModalInputField from '@/components/modal-input-field';
import { useState, useEffect } from 'react';
import { generateId } from '@/utils';
import { X } from 'lucide-react';

/* eslint-disable @typescript-eslint/no-explicit-any */
const ItemModal = ({ type, item, onSave, onClose }: { type: string, item: any, onSave: React.MouseEventHandler<HTMLButtonElement>, onClose: React.MouseEventHandler<HTMLButtonElement> }) => {
    const isExperience = type === 'experience';
    const isEducation = type === 'education';
    const isAward = type === 'awards';

    const initialFormState = item || (isExperience
        ? { jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '' }
        : isEducation
            ? { degree: '', major: '', institution: '', gradYear: '', details: '' }
            : isAward
                ? { name: '', issuer: '', year: '', description: '' }
                : {});

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        setFormData(item || (isExperience
            ? { jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '' }
            : isEducation
                ? { degree: '', major: '', institution: '', gradYear: '', details: '' }
                : isAward
                    ? { name: '', issuer: '', year: '', description: '' }
                    : {}));
    }, [item, type, isExperience, isEducation, isAward]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave({ ...formData, id: item?.id || generateId() });
    };

    let title = "Add Item";
    if (item) title = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    else title = `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`;


    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-slate-700">{title}</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {isExperience && (
                        <>
                            <ModalInputField name="jobTitle" label="Job Title" value={formData.jobTitle} onChange={handleChange} placeholder="e.g., Senior Developer" />
                            <ModalInputField name="company" label="Company" value={formData.company} onChange={handleChange} placeholder="e.g., Tech Solutions Inc." />
                            <ModalInputField name="location" label="Location" value={formData.location} onChange={handleChange} placeholder="e.g., New York, NY" />
                            <div className="grid grid-cols-2 gap-4">
                                <ModalInputField name="startDate" label="Start Date" type="month" value={formData.startDate} onChange={handleChange} />
                                <ModalInputField name="endDate" label="End Date (leave blank if current)" type="month" value={formData.endDate} onChange={handleChange} />
                            </div>
                            <label htmlFor="responsibilities" className="block text-sm font-medium text-slate-600 mb-1">Responsibilities & Achievements</label>
                            <textarea name="responsibilities" rows={4} value={formData.responsibilities} onChange={handleChange} placeholder="Describe your key tasks and accomplishments. Use new lines for bullet points." className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500" />
                        </>
                    )}
                    {isEducation && (
                        <>
                            <ModalInputField name="degree" label="Degree" value={formData.degree} onChange={handleChange} placeholder="e.g., Bachelor of Science" />
                            <ModalInputField name="major" label="Major/Field of Study" value={formData.major} onChange={handleChange} placeholder="e.g., Computer Science" />
                            <ModalInputField name="institution" label="Institution" value={formData.institution} onChange={handleChange} placeholder="e.g., University of Technology" />
                            <ModalInputField name="gradYear" label="Graduation Year" type="text" value={formData.gradYear} onChange={handleChange} placeholder="e.g., 2020" />
                            <label htmlFor="details" className="block text-sm font-medium text-slate-600 mb-1">Additional Details (Optional)</label>
                            <textarea name="details" rows={3} value={formData.details} onChange={handleChange} placeholder="e.g., GPA, Honors, Relevant Coursework" className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500" />
                        </>
                    )}
                    {isAward && (
                        <>
                            <ModalInputField name="name" label="Award/Recognition Name" value={formData.name} onChange={handleChange} placeholder="e.g., Employee of the Month" />
                            <ModalInputField name="issuer" label="Issuing Organization" value={formData.issuer} onChange={handleChange} placeholder="e.g., Tech Solutions Inc." />
                            <ModalInputField name="year" label="Year Received" type="text" value={formData.year} onChange={handleChange} placeholder="e.g., 2023" />
                            <label htmlFor="description" className="block text-sm font-medium text-slate-600 mb-1">Description (Optional)</label>
                            <textarea name="description" rows={3} value={formData.description} onChange={handleChange} placeholder="Briefly describe the award" className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500" />
                        </>
                    )}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
                        <button type="submit" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemModal;
