'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

    const handleSignUp = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email,
            password
        })
        if (error) {
            alert(error.message)
        } else {
            alert('Check your email for the confirmation link!')
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border-4 border-amber-200">
                <h1 className="text-3xl font-bold text-center mb-8 text-amber-900">Login to Code Ranch</h1>
                <div className="flex flex-col gap-4">
                    <p className="text-center text-gray-600">Sign in to save your high scores!</p>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 outline-none text-black"
                            placeholder="cowboy@coderanch.com"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 outline-none text-black"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="flex-1 py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 disabled:opacity-50"
                        >
                            {loading ? 'Loading...' : 'Sign In'}
                        </button>
                        <button
                            onClick={handleSignUp}
                            disabled={loading}
                            className="flex-1 py-3 bg-white text-amber-600 border-2 border-amber-600 rounded-lg font-bold hover:bg-amber-50 disabled:opacity-50"
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <button
                        onClick={async () => {
                            setLoading(true)
                            const { error } = await supabase.auth.signInWithOAuth({
                                provider: 'github',
                                options: {
                                    redirectTo: `${location.origin}/auth/callback`,
                                },
                            })
                            if (error) {
                                alert(error.message)
                                setLoading(false)
                            }
                        }}
                        disabled={loading}
                        className="w-full py-3 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 disabled:opacity-50"
                    >
                        Sign in with GitHub
                    </button>
                </div>
            </div>
        </div>
    );
}
