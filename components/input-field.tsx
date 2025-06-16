'use client';

import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';

const InputField = ({ label, name, type = "text", value, onChange, placeholder, Icon }: { label: string, name: string, type?: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement>, placeholder?: string, Icon?: (ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>) }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <div className="relative">
            {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Icon className="w-5 h-5" />
            </div>}
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow ${Icon ? 'pl-10' : ''}`}
            />
        </div>
    </div>
);

export default InputField;
