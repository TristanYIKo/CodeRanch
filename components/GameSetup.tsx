'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface GameSetupProps {
    onStart: (language: string) => void
    preferredLanguage?: string
}

const languages = [
    { id: 'python', name: 'PYTHON', weapon: 'Reliable Rifle' },
    { id: 'java', name: 'JAVA', weapon: 'Gatling Gun' },
    { id: 'javascript', name: 'JAVASCRIPT', weapon: 'Quick Revolver' },
    { id: 'cpp', name: 'C++', weapon: 'Heavy Shotgun' },
]

export default function GameSetup({ onStart, preferredLanguage = 'javascript' }: GameSetupProps) {
    const [selected, setSelected] = useState(preferredLanguage)
    const router = useRouter()

    useEffect(() => {
        setSelected(preferredLanguage)
    }, [preferredLanguage])

    return (
        <div className="relative z-10 max-w-md w-full bg-[#8b5e3c] p-2 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] border-4 border-[#5d3a24]">
            {/* Inner Border */}
            <div className="border-4 border-[#a07048] rounded p-4 bg-[#6d4528] flex flex-col gap-4">

                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold text-white drop-shadow-[2px_2px_0_#000] font-mono tracking-wider text-center w-full">
                        CHOOSE YOUR IRON
                    </h2>
                    <button
                        onClick={() => router.push('/')}
                        className="absolute top-6 right-6 text-[#5d3a24] hover:text-white bg-[#a07048] p-1 rounded border-2 border-[#5d3a24]"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Language Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {languages.map((lang) => (
                        <button
                            key={lang.id}
                            onClick={() => setSelected(lang.id)}
                            className={`
                flex flex-col items-center justify-center p-3 rounded border-4 transition-all
                ${selected === lang.id
                                    ? 'bg-[#5d3a24] border-[#f4a261] translate-y-1 shadow-none'
                                    : 'bg-[#4a2c1d] border-[#2a1810] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:bg-[#5d3a24]'
                                }
              `}
                        >
                            <span className="text-white font-bold font-mono text-lg">{lang.name}</span>
                            <span className="text-[#c2a58d] text-xs font-mono">({lang.weapon})</span>
                        </button>
                    ))}
                </div>

                {/* Instructions Paper */}
                <div className="bg-[#e6d5ac] p-4 rounded border-4 border-[#c2a58d] text-[#4a2c1d] font-mono text-sm leading-relaxed shadow-inner relative mt-2">
                    {/* Paper tear effect placeholder */}
                    <div className="absolute -left-1 top-4 w-2 h-4 bg-[#6d4528] rounded-r-full"></div>
                    <div className="absolute -right-1 top-4 w-2 h-4 bg-[#6d4528] rounded-l-full"></div>

                    <h3 className="font-bold mb-2 uppercase border-b-2 border-[#c2a58d] pb-1 inline-block">How to Play:</h3>
                    <p className="mb-2">
                        Bandits (bugs) are approaching. The code above their heads is their weakness.
                    </p>
                    <p className="mb-2">
                        Type it exactly to fire.
                    </p>
                    <p>
                        Don't let them reach the left side.
                    </p>
                </div>

                {/* Start Button */}
                <button
                    onClick={() => onStart(selected)}
                    className="w-full py-4 mt-2 bg-gradient-to-b from-[#ff7e5f] to-[#d43f00] text-white font-bold font-mono text-xl rounded border-4 border-[#7a2300] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:translate-y-1 hover:shadow-none transition-all uppercase tracking-widest"
                >
                    Saddle Up
                    <span className="block text-xs normal-case opacity-90 tracking-normal">(Start Game)</span>
                </button>

            </div>
        </div>
    )
}
