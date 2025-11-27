import GameCanvas from '@/components/GameCanvas';
import LanguageSelector from '@/components/LanguageSelector';

export default function PlayPage() {
    return (
        <div className="flex min-h-screen flex-col items-center bg-slate-900 p-4">
            <div className="w-full max-w-6xl flex flex-col gap-4">
                <header className="flex justify-between items-center text-white p-4 bg-slate-800 rounded-lg border-2 border-slate-700">
                    <h1 className="text-2xl font-bold text-amber-400">Code Ranch</h1>
                    <div className="flex gap-4">
                        <div>Score: <span className="font-mono text-xl">0</span></div>
                        <div>WPM: <span className="font-mono text-xl">0</span></div>
                    </div>
                </header>

                <div className="flex gap-4 h-[600px]">
                    <div className="w-1/4 flex flex-col gap-4">
                        <LanguageSelector />
                        <div className="flex-1 bg-slate-800 rounded-lg p-4 border-2 border-slate-700 text-white">
                            <h3 className="font-bold mb-2 text-amber-400">Instructions</h3>
                            <p className="text-sm text-slate-300">
                                Type the code snippets to stop the bulls!
                                <br /><br />
                                Select a language to start.
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 bg-black rounded-lg border-4 border-slate-700 overflow-hidden relative">
                        <GameCanvas />
                    </div>
                </div>
            </div>
        </div>
    );
}
