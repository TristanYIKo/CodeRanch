'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Settings, LogOut, User } from 'lucide-react'

interface UserNavProps {
    user: any
    profile: any
}

export default function UserNav({ user, profile }: UserNavProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const supabase = createClient()

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
        setIsOpen(false)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const displayName = profile?.username || user.email?.split('@')[0] || 'Cowboy'

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="px-6 py-2 bg-green-600 text-white font-bold rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black uppercase flex items-center gap-2 hover:translate-y-1 hover:shadow-none transition-all"
            >
                <span>Howdy, {displayName}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden">
                    <div className="py-1">
                        <Link
                            href="/settings"
                            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-900 font-bold border-b-2 border-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings className="w-4 h-4" />
                            Settings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
