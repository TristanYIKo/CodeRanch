import Link from 'next/link';
import { Code, Globe, Swords } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import UserNav from '@/components/UserNav';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    profile = data;
  }

  return (
    <main className="min-h-screen flex flex-col font-mono">
      {/* Navigation Bar */}
      <nav className="bg-[#2a2a2a] text-white p-4 border-b-4 border-black">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Logo Placeholder */}
            <div className="w-10 h-10 bg-stone-600 rounded flex items-center justify-center">
              <span className="text-xl">🔫</span>
            </div>
            <span className="text-2xl font-bold tracking-wider">CodeRanch</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-[#b48b68] text-black font-bold rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all border-2 border-black">
              Leaderboard
            </button>
            <button className="px-4 py-2 bg-[#b48b68] text-black font-bold rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all border-2 border-black">
              About
            </button>
            {user ? (
              <UserNav user={user} profile={profile} />
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 bg-orange-500 text-black font-bold rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all border-2 border-black uppercase"
              >
                Saddle Up / Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#e76f51] to-[#f4a261] py-12 px-4 border-b-4 border-black overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-black text-black mb-8 tracking-tighter uppercase leading-none" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}>
            The Fastest Syntax<br />In The West
          </h1>

          <Link
            href="/play"
            className="px-12 py-6 bg-[#b48b68] text-2xl font-bold text-black rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase mb-12"
          >
            Start Bounty Hunt
          </Link>

          {/* Character Placeholders */}
          <div className="w-full flex justify-between items-end max-w-4xl mt-10 h-64">
            <div className="w-32 h-48 bg-stone-800/20 border-4 border-black/20 rounded flex items-center justify-center">
              <span className="text-black/40 font-bold">Cowboy</span>
            </div>

            {/* Speech Bubble */}
            <div className="mb-32 bg-[#1a1a1a] text-green-400 p-4 rounded-xl border-4 border-white relative max-w-sm text-left font-mono text-sm">
              <p>const shoot = (aim) ={'>'} {'{'}</p>
              <p className="pl-4">return aim ? true : false;</p>
              <p>{'}'}</p>
              <div className="absolute -bottom-4 right-10 w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-white border-r-[10px] border-r-transparent"></div>
            </div>

            <div className="w-32 h-48 bg-stone-800/20 border-4 border-black/20 rounded flex items-center justify-center">
              <span className="text-black/40 font-bold">Bandit</span>
            </div>
          </div>
        </div>

        {/* Sun */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-yellow-400 rounded-t-full border-t-4 border-x-4 border-black opacity-80 pointer-events-none"></div>

        {/* Landscape Elements */}
        <div className="absolute bottom-0 left-10 w-16 h-32 bg-green-800 rounded-t-lg border-4 border-black opacity-60"></div>
        <div className="absolute bottom-0 right-10 w-16 h-48 bg-green-800 rounded-t-lg border-4 border-black opacity-60"></div>
      </section>

      {/* Quick Draw Section */}
      <section className="bg-[#2a2a2a] py-4 border-b-4 border-black">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-white text-center font-bold mb-2 uppercase tracking-widest">Quick Draw</h3>
          <div className="bg-[#1a1a1a] p-4 rounded border-2 border-stone-600 font-mono text-sm text-gray-400">
            <p>grep -r "TODO" ./src | xargs rm -rf</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-[#1a1a1a] py-16 px-4 flex-grow">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-[#2a2a2a] p-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-lg border-4 border-black mb-4 flex items-center justify-center">
              <Code className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2 uppercase">Real-World Syntax</h3>
            <p className="text-gray-400 text-sm">Practice actual code patterns from popular languages.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#2a2a2a] p-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-lg border-4 border-black mb-4 flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2 uppercase">Multi-Language Support</h3>
            <p className="text-gray-400 text-sm">Master Python, JavaScript, TypeScript, and more.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#2a2a2a] p-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-500 rounded-lg border-4 border-black mb-4 flex items-center justify-center">
              <Swords className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2 uppercase">Duel Mode</h3>
            <p className="text-gray-400 text-sm">Challenge friends to a syntax showdown.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
