'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [preferredLanguage, setPreferredLanguage] = useState('javascript')
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const getProfile = async () => {
            try {
                setLoading(true)
                const { data: { user } } = await supabase.auth.getUser()

                if (!user) {
                    router.push('/login')
                    return
                }

                setEmail(user.email || '')

                const { data, error } = await supabase
                    .from('profiles')
                    .select('username, preferred_language')
                    .eq('id', user.id)
                    .single()

                if (error && error.code !== 'PGRST116') {
                    throw error
                }

                if (data) {
                    setUsername(data.username || '')
                    setPreferredLanguage(data.preferred_language || 'javascript')
                }
            } catch (error: any) {
                console.error('Error loading user data:', error.message)
            } finally {
                setLoading(false)
            }
        }

        getProfile()
    }, [router, supabase])

    const handleUpdateProfile = async () => {
        try {
            setUpdating(true)
            setMessage(null)

            const { data: { user } } = await supabase.auth.getUser()

            if (!user) throw new Error('No user logged in')

            const updates = {
                id: user.id,
                username,
                preferred_language: preferredLanguage,
                updated_at: new Date().toISOString(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)

            if (error) throw error

            setMessage({ type: 'success', text: 'Profile updated successfully!' })
            router.refresh()
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message })
        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-amber-50">
                <div className="text-2xl font-bold text-amber-900 animate-pulse">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-amber-50 font-mono p-8">
            <div className="max-w-2xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-amber-900 font-bold mb-8 hover:underline"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Ranch
                </Link>

                <div className="bg-white p-8 rounded-xl shadow-xl border-4 border-amber-200">
                    <h1 className="text-3xl font-bold text-amber-900 mb-8 border-b-4 border-amber-100 pb-4">
                        Settings
                    </h1>

                    {message && (
                        <div className={`p-4 mb-6 rounded-lg border-2 font-bold ${message.type === 'success'
                            ? 'bg-green-100 border-green-500 text-green-800'
                            : 'bg-red-100 border-red-500 text-red-800'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="text"
                                value={email}
                                disabled
                                className="w-full p-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed currently.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 outline-none transition-colors text-black"
                                placeholder="Enter your cowboy name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Preferred Language
                            </label>
                            <select
                                value={preferredLanguage}
                                onChange={(e) => setPreferredLanguage(e.target.value)}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 outline-none transition-colors bg-white text-black"
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                            </select>
                        </div>

                        <button
                            onClick={handleUpdateProfile}
                            disabled={updating}
                            className="w-full py-4 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-1 hover:shadow-none transition-all border-b-4 border-amber-800 active:border-b-0"
                        >
                            <Save className="w-5 h-5" />
                            {updating ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
