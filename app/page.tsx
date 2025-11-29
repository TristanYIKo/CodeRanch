import Link from 'next/link';
import Image from 'next/image';
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
      <section className="relative py-12 px-4 border-b-4 border-black overflow-hidden h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/big-dessert-bg.png"
            alt="Desert Background"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left Column: Title and CTA */}
          <div className="flex flex-col items-start text-left pl-8">
            <h1 className="text-3xl md:text-5xl font-black text-black mb-6 tracking-widest uppercase leading-tight font-[family-name:var(--font-pixel)]" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}>
              THE FASTEST SYNTAX<br />IN THE WEST
            </h1>

            <Link
              href="/play"
              className="px-16 py-4 bg-[#b48b68] text-xl font-bold text-black rounded-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all uppercase font-mono tracking-widest"
            >
              Start Bounty Hunt
            </Link>
          </div>

          {/* Right Column: Scene */}
          <div className="relative h-full min-h-[400px] flex items-end justify-center">
            {/* Characters Container */}
            <div className="flex items-end gap-40 relative z-10 translate-y-8 -translate-x-12">
              {/* Cowboy */}
              <div className="relative w-56 h-72">
                <Image
                  src="/homescreen_cowboy2.png"
                  alt="Cowboy"
                  fill
                  className="object-contain object-bottom"
                />
              </div>

              {/* Bandit & Bubble */}
              <div className="relative">
                {/* Speech Bubble - Coming from Bandit */}
                <div className="absolute bottom-full right-16 -mb-8 bg-[#1a1a1a] text-green-400 p-4 rounded-xl border-4 border-white w-80 font-mono text-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] tracking-wide z-20">
                  <p>const shoot = (aim) ={'>'} {'{'}</p>
                  <p className="pl-4">return aim ? true : false;</p>
                  <p>{'}'}</p>
                  {/* Tail pointing to Bandit */}
                  <div className="absolute -bottom-4 right-2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-white border-r-[10px] border-r-transparent"></div>
                </div>

                <div className="relative w-48 h-64">
                  <Image
                    src="/homescreen_bandit2.png"
                    alt="Bandit"
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
