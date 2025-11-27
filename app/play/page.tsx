'use client'

import { useState, useEffect } from 'react'
import GameCanvas from '@/components/GameCanvas'
import GameSetup from '@/components/GameSetup'

export default function PlayPage() {
    const [gameState, setGameState] = useState<'setup' | 'playing'>('setup')
    const [language, setLanguage] = useState('javascript')

    // Game Stats
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(60)
    const [wpm, setWpm] = useState(0)

    const handleStartGame = (selectedLanguage: string) => {
        setLanguage(selectedLanguage)
        setGameState('playing')
        // Reset stats
        setScore(0)
        setTimeLeft(60)
        setWpm(0)
    }

    // Handle ESC key to abort mission
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && gameState === 'playing') {
                setGameState('setup')
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [gameState])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#2a1810] relative overflow-hidden font-mono">
            {/* Background - Sunset Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#8a3324] via-[#c25e00] to-[#e9c46a] opacity-80 z-0"></div>

            {/* Decorative Landscape (Placeholder) */}
            <div className="absolute bottom-0 w-full h-1/3 bg-[#4a2c1d] opacity-90 z-0 clip-path-hills"></div>

            {gameState === 'setup' && (
                <GameSetup onStart={handleStartGame} />
            )}

            {gameState === 'playing' && (
                <div className="w-full h-screen relative z-10 flex flex-col">
                    {/* Top HUD */}
                    <div className="w-full bg-[#1a1a1a] border-b-4 border-[#5d3a24] p-2 flex justify-between items-center text-white z-20 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#8b5e3c] rounded border-2 border-[#5d3a24]"></div> {/* Avatar Placeholder */}
                                <span className="font-bold text-xl tracking-wider">CodeRanch</span>
                            </div>
                        </div>

                        <div className="flex gap-8 text-xl font-bold tracking-widest">
                            <div>SCORE: <span className="text-[#4ade80]">{score.toString().padStart(5, '0')}</span></div>
                            <div>TIME LEFT: <span className="text-white">{timeLeft}s</span></div>
                            <div>WPM: <span className="text-[#4ade80]">{wpm.toString().padStart(3, '0')}</span></div>
                        </div>

                        <button
                            onClick={() => setGameState('setup')}
                            className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-1 rounded border-b-4 border-[#991b1b] active:border-b-0 active:translate-y-1 transition-all font-bold tracking-wider flex items-center gap-2"
                        >
                            <span className="bg-[#991b1b] px-1 rounded text-sm">[ESC]</span>
                            ABORT MISSION
                        </button>
                    </div>

                    {/* Top Typing Bar */}
                    <div className="w-full bg-[#1a1a1a] border-b-4 border-[#5d3a24] p-4 z-20 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center h-24">
                        <div className="w-full max-w-4xl bg-[#0f0f0f] border-4 border-[#333] rounded-lg p-2 flex items-center justify-center relative overflow-hidden h-16">
                            {/* Scanline effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>

                            <span className="font-mono text-4xl text-[#4ade80] drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] tracking-wide z-20">
                                for (let i=0; i&lt;5; i++)
                            </span>
                        </div>
                    </div>

                    {/* Game Canvas Layer */}
                    <div className="absolute inset-0 z-0">
                        <GameCanvas />
                    </div>
                </div>
            )}
        </div>
    )
}
