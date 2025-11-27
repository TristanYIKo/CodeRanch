'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type ViewState = 'login' | 'signup'
type SignUpStep = 'email' | 'details'

export default function LoginPage() {
    const [view, setView] = useState<ViewState>('login')
    const [step, setStep] = useState<SignUpStep>('email')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if (error) {
            alert(error.message)
        } else {
            router.push('/')
            router.refresh()
        }
        setLoading(false)
    }

    const handleSignUpStep1 = () => {
        if (!email) {
            alert('Please enter your email')
            return
        }
        setStep('details')
    }

    const handleSignUpStep2 = async () => {
        setLoading(true)
        // 1. Sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        })

        if (authError) {
            alert(authError.message)
            setLoading(false)
            return
        }

        if (authData.user) {
            // 2. Create profile with username
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: authData.user.id,
                    username: username,
                    preferred_language: 'javascript'
                })

            if (profileError) {
                console.error('Error creating profile:', profileError)
                // Continue anyway, user can update profile later
            }

            alert('Check your email for the confirmation link!')
            setView('login')
            setStep('email')
        }
        setLoading(false)
    }

    const handleOAuthLogin = async (provider: 'github' | 'google') => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
        if (error) {
            alert(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50 font-mono">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border-4 border-amber-200 relative">
                <Link href="/" className="absolute top-4 left-4 text-gray-400 hover:text-amber-900">
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                <h1 className="text-3xl font-bold text-center mb-8 text-amber-900 mt-4">
                    {view === 'login' ? 'Login to Code Ranch' : 'Join the Posse'}
                </h1>

                <div className="flex flex-col gap-4">
                    {view === 'login' ? (
                        <>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 outline-none text-black"
                                    placeholder="cowboy@coderanch.com"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 outline-none text-black"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="w-full py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-1 hover:shadow-none transition-all border-b-4 border-amber-800 active:border-b-0"
                            >
                                {loading ? 'Loading...' : 'Sign In'}
                            </button>
                        </>
                    ) : (
                        <>
                            {step === 'email' ? (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 outline-none text-black"
                                            placeholder="cowboy@coderanch.com"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSignUpStep1}
                                        className="w-full py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-1 hover:shadow-none transition-all border-b-4 border-amber-800 active:border-b-0"
                                    >
                                        Continue
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            disabled
                                            className="p-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-gray-700">Username</label>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 outline-none text-black"
                                            placeholder="SheriffCode"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 outline-none text-black"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setStep('email')}
                                            className="px-4 py-3 text-gray-500 font-bold hover:text-gray-700"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleSignUpStep2}
                                            disabled={loading}
                                            className="flex-1 py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-1 hover:shadow-none transition-all border-b-4 border-amber-800 active:border-b-0"
                                        >
                                            {loading ? 'Creating...' : 'Create Account'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => handleOAuthLogin('github')}
                            disabled={loading}
                            className="w-full py-3 bg-[#24292e] text-white rounded-lg font-bold hover:bg-[#2f363d] disabled:opacity-50 flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-1 hover:shadow-none transition-all border-b-4 border-black active:border-b-0"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            GitHub
                        </button>
                        <button
                            onClick={() => handleOAuthLogin('google')}
                            disabled={loading}
                            className="w-full py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-bold hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:translate-y-1 hover:shadow-none transition-all active:border-b-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <button
                            onClick={() => {
                                setView(view === 'login' ? 'signup' : 'login')
                                setStep('email')
                            }}
                            className="text-amber-700 font-bold hover:underline"
                        >
                            {view === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
