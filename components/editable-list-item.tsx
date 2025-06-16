'use client';

import { Edit3, Trash2 } from 'lucide-react';

/* eslint-disable @typescript-eslint/no-explicit-any */
const EditableListItem = ({ children, item, type, onDelete, onEdit }: { children: React.ReactNode, item: any, type: 'experience' | 'education' | 'awards', onDelete: (type: 'experience' | 'education' | 'awards', itemId: string) => void, onEdit: (type: 'experience' | 'education' | 'awards', item: any) => void }) => (
    <div className="p-4 border border-slate-200 rounded-lg mb-3 bg-slate-50 relative group">
        {children}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(type, item)} className="text-blue-500 hover:text-blue-700 p-1 bg-white rounded-full shadow-sm hover:shadow-md">
                <Edit3 size={18} />
            </button>
            <button onClick={() => onDelete(type, item.id)} className="text-red-500 hover:text-red-700 p-1 bg-white rounded-full shadow-sm hover:shadow-md">
                <Trash2 size={18} />
            </button>
        </div>
    </div>
);

export default EditableListItem;
