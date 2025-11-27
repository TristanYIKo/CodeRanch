'use client';

import { useState } from 'react';

const languages = [
    { id: 'python', name: 'Python', color: 'bg-blue-500' },
    { id: 'javascript', name: 'JavaScript', color: 'bg-yellow-500' },
    { id: 'cpp', name: 'C++', color: 'bg-indigo-500' },
    { id: 'java', name: 'Java', color: 'bg-red-500' },
];

export default function LanguageSelector() {
    const [selected, setSelected] = useState('python');

    return (
        <div className="bg-slate-800 rounded-lg p-4 border-2 border-slate-700">
            <h3 className="font-bold mb-4 text-white">Select Language</h3>
            <div className="flex flex-col gap-2">
                {languages.map((lang) => (
                    <button
                        key={lang.id}
                        onClick={() => setSelected(lang.id)}
                        className={`
              p-3 rounded-lg font-bold text-left transition-all
              ${selected === lang.id
                                ? `${lang.color} text-white translate-x-2`
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}
            `}
                    >
                        {lang.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
