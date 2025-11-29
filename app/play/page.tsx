'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import GameCanvas from '@/components/GameCanvas'
import GameSetup from '@/components/GameSetup'

export default function PlayPage() {
    const [gameState, setGameState] = useState<'setup' | 'playing'>('setup')
    const [language, setLanguage] = useState('javascript')
    const [preferredLanguage, setPreferredLanguage] = useState('javascript')

    // Game Stats
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(60)
    const [wpm, setWpm] = useState(0)

    const supabase = createClient()

    useEffect(() => {
        const fetchPreferredLanguage = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('preferred_language')
                    .eq('id', user.id)
                    .single()

                if (data?.preferred_language) {
                    setPreferredLanguage(data.preferred_language)
                }
            }
        }
        fetchPreferredLanguage()
    }, [supabase])

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
                <GameSetup onStart={handleStartGame} preferredLanguage={preferredLanguage} />
            )}

            {gameState === 'playing' && (
                <div className="w-full h-screen relative z-10 flex flex-col font-mono">
                    {/* Top HUD */}
                    <div className="w-full bg-[#2a2a2a] border-b-4 border-black p-2 flex justify-between items-center text-white z-20 shadow-[0_4px_0px_0px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-stone-600 rounded flex items-center justify-center border-2 border-black">
                                    <span className="text-xl">🔫</span>
                                </div>
                                <span className="font-bold text-xl tracking-wider">CodeRanch</span>
                            </div>
                        </div>

                        <div className="flex gap-8 text-xl font-bold tracking-widest">
                            <div>SCORE: <span className="text-[#4ade80]">{score.toString().padStart(5, '0')}</span></div>
                            <div>TIME: <span className="text-white">{timeLeft}s</span></div>
                            <div>CPM: <span className="text-[#4ade80]">{wpm.toString().padStart(3, '0')}</span></div>
                        </div>

                        <button
                            onClick={() => setGameState('setup')}
                            className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-1 rounded border-b-4 border-[#991b1b] active:border-b-0 active:translate-y-1 transition-all font-bold tracking-wider flex items-center gap-2"
                        >
                            <span className="bg-[#991b1b] px-1 rounded text-sm">[ESC]</span>
                            ABORT
                        </button>
                    </div>

                    {/* Main Game Area */}
                    <div className="flex-grow relative bg-[#1a1a1a] overflow-hidden flex flex-col items-center justify-center">

                        {/* Game Content Container */}
                        <div className="w-full max-w-6xl px-12 h-full relative z-10 flex flex-col justify-center">

                            {/* Characters Row */}
                            <div className="flex justify-between items-end mb-12">
                                {/* Cowboy (Left) */}
                                <div className="flex flex-col items-center">
                                    <div className="w-48 h-72 bg-stone-800/20 border-4 border-stone-700/50 rounded-xl flex items-center justify-center mb-4">
                                        <span className="text-stone-600 font-bold text-2xl">Cowboy</span>
                                    </div>
                                </div>

                                {/* Bandit (Right) & Bubble */}
                                <div className="flex flex-col items-center relative">
                                    {/* Code Bubble - Positioned relative to Bandit (Above and Left) */}
                                    <div className="absolute bottom-full right-[80%] mb-4 w-[500px] bg-[#1a1a1a] text-green-400 p-6 rounded-xl border-4 border-white font-mono text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] z-20">
                                        <p>const shoot = (aim) ={'>'} {'{'}</p>
                                        <p className="pl-8">return aim ? true : false;</p>
                                        <p>{'}'}</p>
                                        {/* Tail pointing to Bandit */}
                                        <div className="absolute -bottom-4 right-10 w-0 h-0 border-l-[15px] border-l-transparent border-t-[20px] border-t-white border-r-[15px] border-r-transparent"></div>
                                    </div>

                                    <div className="w-48 h-72 bg-stone-800/20 border-4 border-stone-700/50 rounded-xl flex items-center justify-center mb-4">
                                        <span className="text-stone-600 font-bold text-2xl">Bandit</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Draw Input - Moved up */}
                            <div className="w-full max-w-3xl mx-auto">
                                <h3 className="text-stone-500 text-center font-bold mb-2 uppercase tracking-[0.2em] text-sm">Quick Draw</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        autoFocus
                                        className="w-full bg-[#0f0f0f] text-green-400 font-mono text-xl p-4 rounded border-4 border-stone-700 focus:border-white focus:outline-none placeholder-stone-700 uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]"
                                        placeholder="TYPE HERE..."
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-600 text-sm">
                                        PRESS ENTER
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Game Canvas Layer (Optional Effects) */}
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <GameCanvas />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
