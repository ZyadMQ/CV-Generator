'use client';

const ModalInputField = ({ name, label, value, onChange, type = "text", placeholder }: { name: string, label: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement>, type?: string, placeholder?: string }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <input type={type} name={name} id={name} value={value || ''} onChange={onChange} placeholder={placeholder} className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500" />
    </div>
);

export default ModalInputField;
